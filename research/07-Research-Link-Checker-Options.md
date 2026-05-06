# Research: Link Checker Options

**Date:** 2026-05-06  
**Status:** Decision made — Option 1 selected

---

## Problem

The repository contains ~194 unique external HTTPS links across 19 markdown content files (Russian-language .NET learning resources). Over time, links break (404), get redirected (301/308), or become stale — the destination page no longer corresponds to the link label. There is no existing mechanism to detect this.

---

## Repository Context

- **Stack:** Node.js v20, npm, Eleventy v2.0.1 (static site generator)
- **Content:** 19 markdown files in `src/ru/topics/` and `src/ru/questions/`
- **Link format:** Standard markdown `[title](url)` syntax
- **CI:** GitHub Actions deploying to GitHub Pages on push to `master`
- **Existing link checker:** None

---

## Options Evaluated

### Option 1 — Custom Node.js script ✅ Selected

A custom `scripts/check-links.mjs` script using Node 20 built-in `fetch`.

**How it works:**
- Walks `src/` recursively to find all `.md` files
- Extracts `[title](url)` pairs via regex
- Makes HEAD requests (falls back to GET for 405) to each unique URL with a concurrency limit
- Follows redirects manually to capture the full chain
- Optionally fetches page HTML to compare link title against `<title>` tag (semantic mismatch)
- Outputs grouped results: BROKEN / REDIRECT / MISMATCH / OK

**Pros:**
- Fits existing Node.js stack perfectly — no new runtime
- Full control over concurrency, timeouts, output format
- Can be extended (e.g., ignore lists, custom headers)
- Easy to add to GitHub Actions

**Cons:**
- Requires writing and maintaining the script
- Some hosts (YouTube, GitHub) block HEAD requests — needs GET fallback handling

---

### Option 2 — Deno script

A self-contained `scripts/check-links.ts` TypeScript file run with `deno run --allow-net --allow-read`.

**Pros:** Zero `node_modules`, portable single file, TypeScript native  
**Cons:** Adds Deno as a second runtime not currently used in the project

---

### Option 3 — `markdown-link-check` npm package

Use the battle-tested [`markdown-link-check`](https://github.com/tcort/markdown-link-check) CLI:  
`npx markdown-link-check 'src/**/*.md'`

Configurable via `.mlc_config.json`, with an official GitHub Action available.

**Pros:** Zero code to write, proven tool, easy CI integration  
**Cons:** No semantic title-vs-URL mismatch detection, less control over redirect semantics

---

## Decision

**Option 1** chosen for:
1. No new runtime dependency
2. Semantic mismatch detection included (compares link text vs destination `<title>`)
3. Full control over output and CI behavior

### Configuration

- Semantic mismatch detection: **enabled** (with ignore list for YouTube, GitHub, Habr, VC)
- GitHub Actions workflow: **enabled** on monthly cron (`0 9 1 * *`) + manual trigger
- CI uses `--no-semantic` flag (faster; title fetching unreliable in CI)
