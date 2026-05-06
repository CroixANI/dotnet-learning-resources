#!/usr/bin/env node
/**
 * Link checker for markdown files.
 * Usage: node scripts/check-links.mjs [--no-semantic] [--only-broken] [--concurrency N]
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
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

// Query params that servers routinely add on redirect but carry no semantic meaning.
// If stripping these from both URLs makes them equal, the link is treated as OK.
const NOISE_PARAMS = new Set(['cbrd', 'ucbcb']);
const NOISE_PARAM_PREFIXES = [['view', 'aspnetcore']]; // e.g. view=aspnetcore-10.0

function stripNoiseParams(url) {
  try {
    const u = new URL(url);
    for (const key of [...u.searchParams.keys()]) {
      if (NOISE_PARAMS.has(key)) { u.searchParams.delete(key); continue; }
      for (const [param, prefix] of NOISE_PARAM_PREFIXES) {
        if (key === param && (u.searchParams.get(key) ?? '').startsWith(prefix)) {
          u.searchParams.delete(key);
        }
      }
    }
    return u.toString();
  } catch {
    return url;
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

// ── Timestamp ─────────────────────────────────────────────────────────────

function timestamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `-${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}

function formatDateTime(d = new Date()) {
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

// ── Markdown report builder ────────────────────────────────────────────────

function buildReport({ broken, redirected, mismatched, ok, totalUrls, totalFiles, semantic, startedAt }) {
  const lines = [];
  const ts = formatDateTime(startedAt);

  lines.push(`# Link Check Report`);
  lines.push(``);
  lines.push(`**Generated:** ${ts}  `);
  lines.push(`**Checked:** ${totalUrls} unique URLs across ${totalFiles} markdown files  `);
  lines.push(`**Semantic detection:** ${semantic ? 'enabled' : 'disabled'}`);
  lines.push(``);
  lines.push(`## Summary`);
  lines.push(``);
  lines.push(`| Status | Count |`);
  lines.push(`|--------|------:|`);
  lines.push(`| 🔴 Broken | ${broken.length} |`);
  lines.push(`| 🟡 Redirected | ${redirected.length} |`);
  lines.push(`| 🟣 Title mismatch | ${mismatched.length} |`);
  lines.push(`| ✅ OK | ${ok.length} |`);
  lines.push(``);
  lines.push(`---`);

  // ── Broken ──
  lines.push(``);
  lines.push(`## 🔴 Broken (${broken.length})`);
  lines.push(``);
  if (broken.length === 0) {
    lines.push(`_No broken links found._`);
  } else {
    let n = 0;
    for (const r of broken) {
      for (const { text, file, line } of r.occurrences) {
        n++;
        lines.push(`### ${n}. ${text}`);
        lines.push(``);
        lines.push(`| | |`);
        lines.push(`|-|-|`);
        lines.push(`| **File** | \`${file}:${line}\` |`);
        lines.push(`| **URL** | <${r.url}> |`);
        lines.push(`| **Status** | ${r.error ? `ERROR — ${r.error}` : `HTTP ${r.status}`} |`);
        lines.push(``);
        lines.push(`> 💡 _TODO: find 1–3 alternative links to replace this broken resource_`);
        lines.push(``);
      }
    }
  }

  lines.push(`---`);

  // ── Redirected ──
  lines.push(``);
  lines.push(`## 🟡 Redirected (${redirected.length})`);
  lines.push(``);
  if (redirected.length === 0) {
    lines.push(`_No redirected links found._`);
  } else {
    let n = 0;
    for (const r of redirected) {
      for (const { text, file, line } of r.occurrences) {
        n++;
        lines.push(`### ${n}. ${text}`);
        lines.push(``);
        lines.push(`| | |`);
        lines.push(`|-|-|`);
        lines.push(`| **File** | \`${file}:${line}\` |`);
        lines.push(`| **Original URL** | <${r.url}> |`);
        lines.push(`| **Final URL** | <${r.finalUrl}> |`);
        lines.push(`| **Status** | HTTP ${r.status} |`);
        lines.push(``);
      }
    }
  }

  lines.push(`---`);

  // ── Mismatch ──
  lines.push(``);
  lines.push(`## 🟣 Title mismatch (${mismatched.length})`);
  lines.push(``);
  if (mismatched.length === 0) {
    lines.push(`_No title mismatches found._`);
  } else {
    let n = 0;
    for (const r of mismatched) {
      for (const { text, file, line } of r.occurrences) {
        n++;
        lines.push(`### ${n}. ${text}`);
        lines.push(``);
        lines.push(`| | |`);
        lines.push(`|-|-|`);
        lines.push(`| **File** | \`${file}:${line}\` |`);
        lines.push(`| **URL** | <${r.url}> |`);
        lines.push(`| **Link text** | ${text} |`);
        lines.push(`| **Page title** | ${r.pageTitle ?? '_unknown_'} |`);
        lines.push(`| **Match score** | ${r.score?.toFixed(2) ?? '—'} |`);
        lines.push(``);
      }
    }
  }

  lines.push(`---`);

  // ── OK ──
  lines.push(``);
  lines.push(`## ✅ OK (${ok.length})`);
  lines.push(``);
  lines.push(`<details>`);
  lines.push(`<summary>Show all OK links</summary>`);
  lines.push(``);
  lines.push(`| File | Line | Text | URL |`);
  lines.push(`|------|-----:|------|-----|`);
  for (const r of ok) {
    for (const { text, file, line } of r.occurrences) {
      lines.push(`| \`${file}\` | ${line} | ${text} | <${r.url}> |`);
    }
  }
  lines.push(``);
  lines.push(`</details>`);

  return lines.join('\n') + '\n';
}

// ── Main ───────────────────────────────────────────────────────────────────

const startedAt = new Date();
const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');
const REPORTS_DIR = join(ROOT, 'reports');

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

    const isRedirected = stripNoiseParams(finalUrl) !== stripNoiseParams(url) && !error;
    const isOk = status >= 200 && status < 300;
    const isBroken = status >= 400 || status === 0;

    if (SEMANTIC && isOk && !shouldSkipSemantic(finalUrl)) {
      pageTitle = await fetchPageTitle(finalUrl);
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

// ── Classify ───────────────────────────────────────────────────────────────

const broken    = results.filter(r => r.isBroken || r.error);
const redirected = results.filter(r => !r.isBroken && !r.error && r.isRedirected);
const mismatched = results.filter(r => !r.isBroken && !r.error && !r.isRedirected && r.score !== undefined && r.score < 0.15);
const ok         = results.filter(r => !r.isBroken && !r.error && !r.isRedirected && (r.score === undefined || r.score >= 0.15));

// ── Console output ─────────────────────────────────────────────────────────

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

const summaryColor = broken.length ? 31 : 32;
console.log(
  `\x1b[${summaryColor}m` +
  `Checked ${uniqueUrls.length} links: ` +
  `${broken.length} broken, ${redirected.length} redirected, ` +
  `${mismatched.length} mismatched, ${ok.length} ok` +
  `\x1b[0m\n`
);

// ── Write markdown report ──────────────────────────────────────────────────

await mkdir(REPORTS_DIR, { recursive: true });

const reportName = `${timestamp()}-links-check.md`;
const reportPath = join(REPORTS_DIR, reportName);
const reportContent = buildReport({
  broken, redirected, mismatched, ok,
  totalUrls: uniqueUrls.length,
  totalFiles: files.length,
  semantic: SEMANTIC,
  startedAt,
});

await writeFile(reportPath, reportContent, 'utf8');
console.log(`Report saved: reports/${reportName}\n`);

if (broken.length > 0) process.exit(1);
