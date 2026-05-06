# Research 06: Multi-Language Architecture — Vanilla JS vs Static Site Generators

## The Question

The site currently has no build step — plain HTML, vanilla JS, and a single CSS file served directly via GitHub Pages. Plan 04 proposed implementing Russian + English via a JS-based locale switcher (localStorage + re-render). Before implementing that, it's worth stepping back and asking: **is the current no-build approach the right foundation for a multilingual site going forward, or should the project migrate to a static site generator (SSG)?**

---

## What the Current Architecture Actually Is

```
dotnet-learning-resources/
├── index.html          ← page shell + <template> elements
├── questions.html      ← page shell + <template> elements
├── styles/main.css     ← 10k-line Bootstrap CSS
├── js/
│   ├── topics-data.js       ← all content as JS arrays
│   ├── questions-data.js    ← all content as JS arrays
│   ├── topics-renderer.js   ← DOM builder from templates
│   └── questions-renderer.js
└── assets/favicon.ico
```

**Key characteristics:**
- Zero build tooling. GitHub Pages serves files as-is.
- All content lives in JS arrays rendered at runtime by `topics-renderer.js` / `questions-renderer.js`
- Two HTML pages total
- No dependency manifest (no `package.json`)
- Content is not in Markdown — it's embedded in JS object literals

---

## Option 1: Stay with Vanilla JS (extend Plan 04)

As described in Plan 04: wrap data arrays in locale-keyed objects, add `i18n.js`, re-render on toggle, persist to `localStorage`.

### How it works at runtime

```
Page loads
  → i18n.js reads localStorage / browser lang
  → topics-data.js loaded (contains BOTH ru and en arrays)
  → renderer called with active locale
  → all content rendered in that language

User clicks language toggle
  → localStorage updated
  → DOM cleared
  → renderer called again with new locale
  → content re-rendered
```

### Pros

- **Zero new tooling.** No build step to learn, configure, or maintain. No CI pipeline changes needed. Deploy is still just `git push`.
- **Familiar codebase.** No migration risk. All existing knowledge of the code stays valid.
- **Instant language switch** without page reload.
- **Works fine at this scale.** The entire site is 2 pages and ~60 questions. Loading both locales costs roughly 100–150KB of JS total — imperceptible on modern connections.

### Cons

- **Both languages always loaded.** As content grows (more topics, more questions, English translations), the initial JS payload grows. At the current scale this is fine; at 10× the current content it could become 400–500KB of JS.
- **Not SEO-indexable in both languages.** Google and other crawlers see only the default locale's content. If discoverability in English matters, the English content will not be indexed. For an educational resource targeted at Russian developers, this may not matter — but it's a real limitation if English speakers should be able to find the site via search.
- **`lang` attribute is static in the HTML file**, declared as `lang="ru"`. The JS switcher can update `document.documentElement.lang` at runtime, but the HTML file on disk always says `ru`. This is technically incorrect for SEO crawlers that read the raw HTML, and for correct hreflang signaling.
- **Content management becomes a parallel-maintenance problem.** Every new topic or question must be added in both languages simultaneously in the same JS file. The file grows large and the Russian/English entries are easy to desync.
- **No content-type separation.** Content, structure, and language logic are all tangled in JS files. There's no clear boundary between "content" and "code".

### Verdict on Option 1

**Good enough for the short term.** If the primary goal is adding English as a courtesy for non-Russian readers and SEO is not a concern, the vanilla JS approach works and keeps things simple. If the project is expected to stay small (2 pages, ~11 topics, ~60 questions), this is a reasonable choice.

---

## Option 2: Static Site Generator

An SSG takes content (Markdown, JSON, YAML, or JS modules) and templates, and at build time produces static HTML files — one per page per locale. The result is deployed as static files, same as today.

### What changes conceptually

```
Before (runtime rendering):
  HTML shell + JS data → browser renders content

After (build-time rendering):
  Content files + Templates → BUILD STEP → Pre-rendered HTML files → browser displays
```

With an SSG:
- `topics-data.js` → becomes content files (JSON, YAML, or Markdown front matter)
- `topics-renderer.js` → becomes a template (Nunjucks, Astro components, etc.)
- Each language gets its own pre-rendered HTML files with correct `lang` attribute
- No JS is needed at runtime for rendering (content is already in the HTML)

### Candidate SSGs

#### Astro ⭐ (Recommended if switching)

Astro is a modern SSG (released stable 2022, v5 in 2025) designed specifically for content-heavy sites. It has first-class i18n routing built in since v3.

**Fit for this project:**

```
src/
  content/
    topics/
      ru/env-setup.md       ← Russian content in Markdown
      en/env-setup.md       ← English content in Markdown
    questions/
      ru/csharp.md
      en/csharp.md
  pages/
    [lang]/index.astro      ← generates /ru/ and /en/ routes
    [lang]/questions.astro
  layouts/
    Layout.astro            ← shared nav, head, etc.
```

Built-in i18n routing generates:
- `/ru/` → Russian index page (with `<html lang="ru">`)
- `/en/` → English index page (with `<html lang="en">`)
- Automatic `hreflang` alternate links for SEO
- Locale detection and redirect from `/`

**Pros:**
- First-class i18n: routing, `lang` attributes, `hreflang` tags, locale detection — all built-in
- Each page is a static HTML file — fully crawlable in both languages
- Content in Markdown files (cleaner than embedded JS) with type-safe frontmatter
- Ships zero JavaScript by default — only adds JS when you opt-in (great for Lighthouse)
- GitHub Pages deployment is one GitHub Actions workflow (official template exists)
- TypeScript support for content schemas
- Growing ecosystem; well-maintained by Netlify team in 2025

**Cons:**
- Learning curve: Astro component syntax (`.astro` files), content collections API
- Adds `node_modules` and a build step to the project
- Local development requires `npm run dev` instead of just opening the HTML file
- Migration effort: all existing content must be moved from JS arrays to Markdown/JSON files

**Migration complexity for this project: Medium.** The JS data arrays are structured and could be converted to Markdown files or JSON with a one-time script. The renderers would be replaced by Astro components. Estimated migration: 4–8 hours.

---

#### Eleventy (11ty)

A simpler, highly flexible SSG. Works with many template languages (Nunjucks, Liquid, Markdown). Excellent i18n via plugins.

**Fit for this project:** Good, but i18n is not built-in — you'd add the `@11ty/eleventy-plugin-i18n` plugin. The flexibility is both a strength (keep vanilla JS, use plain HTML templates) and a weakness (more manual configuration).

**Why it's second choice vs Astro:** Astro's built-in i18n is more polished. 11ty is a great choice if you want to stay closer to plain HTML and avoid any component syntax.

---

#### Hugo

Built in Go. Fastest build times. Excellent built-in multilingual support — arguably the most mature i18n system of any SSG.

**Fit for this project:** Hugo has very opinionated content organization and Go template syntax. For a developer already comfortable with C# and not Go, the template language is an additional unfamiliar thing. Hugo is an excellent choice for larger documentation sites but may be heavier than needed here.

**Not recommended** for this specific project unless the author already knows Hugo.

---

#### Jekyll

GitHub Pages' native SSG. No build step needed when using the standard Jekyll themes — GitHub Pages builds it automatically. Has i18n plugins.

**Why not recommended:** Jekyll is the oldest option and has been largely superseded. Its Ruby dependency and slower ecosystem make it a weaker choice for new projects in 2025. Astro and 11ty are both better investments of learning time.

---

#### Next.js / Nuxt / SvelteKit

Full-featured meta-frameworks with excellent i18n. Overkill for a static educational site with 2 pages. They add React/Vue/Svelte as dependencies, bring server-side complexity, and are designed for apps, not content sites.

**Not recommended** for this project.

---

## Side-by-Side Comparison

| Criterion | Vanilla JS (Plan 04) | Astro | 11ty |
|-----------|---------------------|-------|------|
| Build step required | No | Yes (npm) | Yes (npm) |
| New tooling to learn | None | Astro components, content collections | Nunjucks templates, 11ty config |
| Migration effort | Low | Medium (4–8h) | Medium (3–6h) |
| SEO (both languages) | ❌ JS-rendered, not crawlable | ✅ Pre-rendered HTML per locale | ✅ Pre-rendered HTML per locale |
| Correct `lang` attribute per page | Partial (set by JS at runtime) | ✅ Built into route | ✅ Built into route |
| `hreflang` alternate links | ❌ Manual | ✅ Automatic | Partial (manual or plugin) |
| i18n routing (`/ru/`, `/en/`) | ❌ Not possible without build | ✅ Built-in | ✅ Via plugin |
| Language switch without reload | ✅ Yes | ❌ Full page navigation | ❌ Full page navigation |
| Content separation from code | ❌ Mixed in JS files | ✅ Markdown/JSON content files | ✅ Markdown/JSON content files |
| Parallel content maintenance | Hard (one big JS file) | Easy (separate locale files) | Easy (separate locale files) |
| Deploy complexity | Git push | GitHub Actions workflow | GitHub Actions workflow |
| Lighthouse performance | Medium (big CSS, FA JS) | High (zero-JS by default) | High |
| Suitable for current scale | ✅ Yes | ✅ Yes | ✅ Yes |
| Suitable if content 10× grows | ⚠️ Payload concern | ✅ Yes | ✅ Yes |

---

## Recommendation

### If SEO in English is not important → Stay with Vanilla JS

The current approach with Plan 04's JS i18n is fine. The site is small, the audience is primarily Russian-speaking developers, and the added complexity of an SSG migration may not be worth it. The vanilla JS approach can be shipped faster and keeps the project dependency-free.

**Suggested improvement even without SSG:** move content out of JavaScript and into JSON files. This separates content from rendering logic without requiring an SSG:

```
js/data/
  topics.ru.json
  topics.en.json
  questions.ru.json
  questions.en.json
```

Then `i18n.js` fetches the appropriate JSON file on load (`fetch('./js/data/topics.ru.json')`). This gives clean content/code separation without any build step, and makes it easy for contributors to edit content without touching JS logic.

### If SEO and clean URL routing matter → Migrate to Astro

Astro is the right choice. It handles i18n routing, correct `lang` attributes, `hreflang` tags, and generates fully crawlable static HTML. The GitHub Pages deployment via GitHub Actions is well-documented. The migration from JS data arrays to Astro content collections (JSON or Markdown) is a one-time investment.

**Suggested migration path:**
1. Scaffold `astro create` with the minimal template
2. Convert `topics-data.js` arrays to JSON files (one per locale)
3. Build `[lang]/index.astro` and `[lang]/questions.astro` pages using Astro's content collections
4. Replicate current CSS in Astro (or take the opportunity to implement Plan 02's redesign at the same time)
5. Set up GitHub Actions for deployment

### Decision trigger

| If... | Then... |
|-------|---------|
| Primary audience is Russian developers, English is a bonus | Stay vanilla JS + Plan 04 |
| You want English speakers to find the site via Google search | Migrate to Astro |
| You plan to add many more topics/questions over time | Migrate to Astro (content management scales better) |
| You want to keep the project simple and low-maintenance | Stay vanilla JS + Plan 04 |
| You're comfortable with npm-based tooling | Migrate to Astro |
| You prefer zero build step | Stay vanilla JS + Plan 04 |

---

## What Doesn't Change Either Way

Both approaches still need the same content work:
- Translating all topic titles, descriptions, and resource titles into English
- Finding English-language resource alternatives for Russian-only links
- Writing UI strings in both languages

The architecture decision is separate from the translation work. Either path requires the same translation effort.

---

## Files That Would Be Created/Modified (Astro migration only)

```
astro.config.mjs           ← new: Astro config with i18n routing
package.json               ← new: node dependencies
src/
  content/
    config.ts              ← new: content collection schemas
    topics/ru/*.json       ← moved from topics-data.js
    topics/en/*.json       ← new English translations
    questions/ru/*.json    ← moved from questions-data.js
    questions/en/*.json    ← new English translations
  pages/
    index.astro            ← redirect to default locale
    [lang]/
      index.astro          ← topics page
      questions.astro      ← questions page
  layouts/
    Layout.astro           ← shared nav, head, lang toggle
  components/
    TopicSection.astro     ← replaces topics-renderer.js
    QuestionGroup.astro    ← replaces questions-renderer.js
    LanguageToggle.astro   ← language switcher
.github/
  workflows/
    deploy.yml             ← GitHub Actions for Pages deployment
```

Files that would be **deleted**: `js/topics-renderer.js`, `js/questions-renderer.js`, `js/topics-data.js`, `js/questions-data.js`, `index.html`, `questions.html` (replaced by Astro pages).

`styles/main.css` would be kept or replaced depending on whether Plan 02 (theme redesign) is done in parallel.
