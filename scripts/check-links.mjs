#!/usr/bin/env node
/**
 * Link checker for markdown files.
 * Usage: node scripts/check-links.mjs [--no-semantic] [--only-broken] [--concurrency N]
 */

import { readdir, readFile } from 'fs/promises';
import { join, relative } from 'path';

// ── CLI flags ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const SEMANTIC = !args.includes('--no-semantic');
const ONLY_BROKEN = args.includes('--only-broken');
const concurrencyArg = args.indexOf('--concurrency');
const CONCURRENCY = concurrencyArg !== -1 ? parseInt(args[concurrencyArg + 1], 10) : 5;
const TIMEOUT_MS = 15_000;

// Domains where title matching is meaningless
const SEMANTIC_IGNORE = [
  'youtube.com', 'youtu.be',
  'github.com',
  'habr.com', 'vc.ru',
  'soundcloud.com',
  't.me',
];

// ── File discovery ─────────────────────────────────────────────────────────

async function findMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findMarkdownFiles(full));
    } else if (entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

// ── Link extraction ────────────────────────────────────────────────────────

const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

function extractLinks(content, filePath) {
  const links = [];
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    let m;
    LINK_RE.lastIndex = 0;
    while ((m = LINK_RE.exec(line)) !== null) {
      links.push({ text: m[1].trim(), url: m[2].trim(), file: filePath, line: i + 1 });
    }
  });
  return links;
}

// ── HTTP helpers ───────────────────────────────────────────────────────────

function makeController() {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  return { signal: ctrl.signal, cancel: () => clearTimeout(timer) };
}

const USER_AGENT = 'Mozilla/5.0 (compatible; link-checker/1.0)';

async function headOrGet(url) {
  // Try HEAD first; fall back to GET on 405 or network quirks
  for (const method of ['HEAD', 'GET']) {
    const { signal, cancel } = makeController();
    try {
      const res = await fetch(url, {
        method,
        redirect: 'manual',
        signal,
        headers: { 'User-Agent': USER_AGENT },
      });
      cancel();
      return res;
    } catch (err) {
      cancel();
      if (method === 'GET') throw err;
      // HEAD failed — try GET
    }
  }
}

async function followRedirects(originalUrl, maxHops = 8) {
  let url = originalUrl;
  const chain = [url];
  for (let i = 0; i < maxHops; i++) {
    const { signal, cancel } = makeController();
    let res;
    try {
      res = await fetch(url, {
        method: 'HEAD',
        redirect: 'manual',
        signal,
        headers: { 'User-Agent': USER_AGENT },
      });
    } catch {
      // GET fallback
      try {
        const ctrl2 = makeController();
        res = await fetch(url, {
          method: 'GET',
          redirect: 'manual',
          signal: ctrl2.signal,
          headers: { 'User-Agent': USER_AGENT },
        });
        ctrl2.cancel();
      } catch (err) {
        cancel();
        return { finalUrl: url, chain, status: 0, error: err.message };
      }
    }
    cancel();

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (!location) return { finalUrl: url, chain, status: res.status };
      url = new URL(location, url).href;
      chain.push(url);
    } else {
      return { finalUrl: url, chain, status: res.status };
    }
  }
  return { finalUrl: url, chain, status: -1, error: 'Too many redirects' };
}

// ── Page title fetch ───────────────────────────────────────────────────────

async function fetchPageTitle(url) {
  const { signal, cancel } = makeController();
  try {
    const res = await fetch(url, {
      method: 'GET',
      signal,
      headers: { 'User-Agent': USER_AGENT },
    });
    cancel();
    if (!res.ok) return null;
    const html = await res.text();
    const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return m ? m[1].trim() : null;
  } catch {
    cancel();
    return null;
  }
}

// ── Semantic comparison ────────────────────────────────────────────────────

function normalizeWords(str) {
  return str
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);
}

function isBareUrl(text) {
  return /^https?:\/\//i.test(text);
}

function shouldSkipSemantic(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return SEMANTIC_IGNORE.some(d => host === d || host.endsWith('.' + d));
  } catch {
    return true;
  }
}

function semanticScore(linkText, pageTitle) {
  if (isBareUrl(linkText) || !pageTitle) return 1; // skip
  const textWords = new Set(normalizeWords(linkText));
  const titleWords = new Set(normalizeWords(pageTitle));
  if (textWords.size === 0) return 1;
  let overlap = 0;
  for (const w of textWords) if (titleWords.has(w)) overlap++;
  return overlap / textWords.size;
}

// ── Concurrency pool ───────────────────────────────────────────────────────

async function pool(tasks, limit) {
  const results = new Array(tasks.length);
  let idx = 0;
  async function worker() {
    while (idx < tasks.length) {
      const i = idx++;
      results[i] = await tasks[i]();
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

// ── Main ───────────────────────────────────────────────────────────────────

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');

const files = await findMarkdownFiles(SRC);

// Gather all link occurrences
const allLinks = [];
for (const f of files) {
  const content = await readFile(f, 'utf8');
  allLinks.push(...extractLinks(content, relative(ROOT, f)));
}

// Deduplicate URLs, tracking all occurrences
const urlMap = new Map(); // url → [{ text, file, line }]
for (const { text, url, file, line } of allLinks) {
  if (!urlMap.has(url)) urlMap.set(url, []);
  urlMap.get(url).push({ text, file, line });
}

const uniqueUrls = [...urlMap.keys()];
console.log(`\nChecking ${uniqueUrls.length} unique URLs across ${files.length} markdown files…\n`);

// Check each URL
const tasks = uniqueUrls.map(url => async () => {
  const occurrences = urlMap.get(url);
  let status, finalUrl, error, pageTitle, score;

  try {
    const result = await followRedirects(url);
    status = result.status;
    finalUrl = result.finalUrl;
    error = result.error;

    const isRedirected = finalUrl !== url && !error;
    const isOk = status >= 200 && status < 300;
    const isBroken = status >= 400 || status === 0;

    if (SEMANTIC && isOk && !shouldSkipSemantic(finalUrl)) {
      pageTitle = await fetchPageTitle(finalUrl);
      // Check each occurrence's text for mismatch
      const texts = occurrences.map(o => o.text);
      const scores = texts.map(t => semanticScore(t, pageTitle));
      score = Math.max(...scores); // best match wins
    }

    return { url, finalUrl, status, isRedirected, isBroken, error, pageTitle, score, occurrences };
  } catch (err) {
    return { url, finalUrl: url, status: 0, isRedirected: false, isBroken: true, error: err.message, occurrences };
  }
});

const results = await pool(tasks, CONCURRENCY);

// ── Report ─────────────────────────────────────────────────────────────────

const broken = results.filter(r => r.isBroken || r.error);
const redirected = results.filter(r => !r.isBroken && !r.error && r.isRedirected);
const mismatched = results.filter(r => !r.isBroken && !r.error && !r.isRedirected && r.score !== undefined && r.score < 0.15);
const ok = results.filter(r => !r.isBroken && !r.error && !r.isRedirected && (r.score === undefined || r.score >= 0.15));

function printGroup(label, color, items, detail) {
  if (items.length === 0) return;
  console.log(`\x1b[${color}m── ${label} (${items.length}) ──\x1b[0m`);
  for (const r of items) {
    for (const { text, file, line } of r.occurrences) {
      console.log(`  ${file}:${line}`);
      console.log(`    [${text}](${r.url})`);
      console.log(`    ${detail(r)}`);
    }
  }
  console.log();
}

printGroup('BROKEN', 31, broken, r =>
  r.error ? `ERROR: ${r.error}` : `HTTP ${r.status}`
);

if (!ONLY_BROKEN) {
  printGroup('REDIRECT', 33, redirected, r =>
    `HTTP ${r.status} → ${r.finalUrl}`
  );

  printGroup('MISMATCH', 35, mismatched, r =>
    `score=${r.score?.toFixed(2)} | page title: "${r.pageTitle}"`
  );
}

console.log(`\x1b[${broken.length ? 31 : 32}m` +
  `Checked ${uniqueUrls.length} links: ` +
  `${broken.length} broken, ${redirected.length} redirected, ` +
  `${mismatched.length} mismatched, ${ok.length} ok` +
  `\x1b[0m\n`
);

if (broken.length > 0) process.exit(1);
