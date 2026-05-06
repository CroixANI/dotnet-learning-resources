# Plan 04: Multi-Language Support (Russian + English)

## Goal

Add English as a second language alongside Russian. Users can switch languages via a toggle button; preference is persisted. The site remains a static GitHub Pages site — no server required.

---

## Constraints

- **Static site** — No server-side rendering. No build step (currently). Everything must work with plain HTML/JS/CSS.
- **GitHub Pages** — No `.htaccess` redirects or server config available unless using a custom domain with Cloudflare or similar. Subdirectory routing (`/ru/`, `/en/`) is possible but requires duplicating HTML files.
- **All content is in JS data files** — `topics-data.js` and `questions-data.js` contain all Russian text. These must be refactored to support multiple locales.

---

## Approach Options

### Option A: Separate HTML files per language (simplest)

```
/index.html          → Russian (default)
/en/index.html       → English
/questions.html      → Russian
/en/questions.html   → English
```

**Pros:** Simple, predictable URLs, no JS complexity, correct `lang` attribute per page.  
**Cons:** Content duplication, maintaining two copies of HTML forever, no smooth in-page switching experience.

**Verdict: Not recommended.** Too much maintenance burden.

### Option B: Separate data files, single HTML, JS switcher (recommended)

Keep single `index.html` and `questions.html`. Refactor data files into locale-keyed structures. Add a language switcher that swaps the active locale and re-renders content.

```
js/
  topics-data.js        → locale object with 'ru' and 'en' keys
  questions-data.js     → locale object with 'ru' and 'en' keys
  topics-renderer.js    → unchanged rendering logic
  questions-renderer.js → unchanged rendering logic
  i18n.js               → locale switching, localStorage, lang attribute management
```

**Pros:** Single source of HTML, clean URLs, no duplication, smooth switch without page reload.  
**Cons:** Both languages are loaded in JS (doubles data file size), initial translation effort.

**Verdict: Recommended.**

### Option C: URL parameter (`?lang=en`) — not recommended

Requires reading URL params on load, fragile sharing/bookmarking, doesn't work well with anchor links (the nav scrolls to sections by ID).

---

## Recommended Implementation (Option B)

### Data file restructure

**Current `topics-data.js` structure:**
```js
var TOPICS = [
  {
    id: 'env_setup',
    title: 'Настройка среды разработки на компьютере',
    description: '...',
    resources: [
      { title: '...', url: '...', descriptionTemplate: '...' }
    ]
  }
]
```

**New structure — locale-keyed:**
```js
var TOPICS = {
  ru: [
    {
      id: 'env_setup',
      title: 'Настройка среды разработки на компьютере',
      description: '...',
      resources: [
        { title: '...', url: '...', descriptionTemplate: '...' }
      ]
    }
    // ...
  ],
  en: [
    {
      id: 'env_setup',
      title: 'Setting Up Your Development Environment',
      description: '...',
      resources: [
        { title: '...', url: '...', descriptionTemplate: '...' }
      ]
    }
    // ...
  ]
};

function getTopics(locale) {
  return TOPICS[locale] || TOPICS.ru;
}

window.data = window.data || {};
window.data.getTopics = getTopics;
```

Same restructuring applies to `questions-data.js`.

### UI strings (non-data text)

The HTML pages contain some UI strings in Russian that also need translation:
- `index.html:25` — "Главная" (nav link)
- `index.html:34` — "Ресурсы для изучения .NET" (heading)
- `index.html:35–39` — intro paragraphs
- `topics-renderer.js:34` — "Примеры вопросов" (nav link to questions page)
- `questions.html:33–36` — heading and intro paragraphs

**Approach:** Extract these into a UI strings locale object in `i18n.js`:

```js
var UI_STRINGS = {
  ru: {
    'nav.home': 'Главная',
    'nav.questions': 'Примеры вопросов',
    'page.topics.title': 'Ресурсы для изучения .NET',
    'page.topics.intro1': 'Слева находятся темы для изучения...',
    'page.topics.intro2': 'В каждой теме представлены ссылки...',
    'page.topics.intro3': 'Цель данного сайта — предоставить ресурсы для самоподготовки.',
    'page.topics.intro4': 'Записаться на курсы или найти ментора...',
    'page.questions.title': 'Примеры вопросов по .NET',
    'page.questions.intro1': 'Слева находятся группы вопросов...',
    'page.questions.intro2': 'В каждой группе вопросов представлены вопросы...',
  },
  en: {
    'nav.home': 'Home',
    'nav.questions': 'Interview Questions',
    'page.topics.title': '.NET Learning Resources',
    'page.topics.intro1': 'The sidebar contains topics to study in order.',
    'page.topics.intro2': 'Each topic includes links to resources: articles, videos, and courses.',
    'page.topics.intro3': 'The goal of this site is to provide self-study resources.',
    'page.topics.intro4': 'You can join courses or find a mentor through ByChange.',
    'page.questions.title': 'Sample .NET Interview Questions',
    'page.questions.intro1': 'Use the sidebar to navigate between question groups.',
    'page.questions.intro2': 'Each group contains questions with links to resources.',
  }
};
```

Then in HTML, add `data-i18n` attributes to elements that need translation:

```html
<h3><span class="text-primary" data-i18n="page.topics.title">Ресурсы для изучения .NET</span></h3>
<p class="subheading mb-4" data-i18n="page.topics.intro1">Слева находятся темы...</p>
```

The `i18n.js` module queries `[data-i18n]` elements and updates their text.

### `js/i18n.js` — new file

```js
(function () {
  var SUPPORTED_LOCALES = ['ru', 'en'];
  var DEFAULT_LOCALE = 'ru';
  var STORAGE_KEY = 'dotnet-resources-locale';

  function getStoredLocale() {
    var stored = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LOCALES.includes(stored) ? stored : null;
  }

  function getBrowserLocale() {
    var lang = (navigator.language || '').toLowerCase();
    if (lang.startsWith('ru')) return 'ru';
    return 'en'; // default to English for all non-Russian browsers
  }

  function getActiveLocale() {
    return getStoredLocale() || getBrowserLocale() || DEFAULT_LOCALE;
  }

  function setLocale(locale) {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    applyUIStrings(locale);
    // Trigger re-render of dynamic content
    if (window.topics) window.topics.renderTopics(locale);
    if (window.questions) window.questions.renderQuestionsGroups(locale);
    updateToggleButton(locale);
  }

  function applyUIStrings(locale) {
    var strings = UI_STRINGS[locale] || UI_STRINGS[DEFAULT_LOCALE];
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (strings[key]) el.textContent = strings[key];
    });
  }

  function updateToggleButton(locale) {
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = locale === 'ru' ? 'EN' : 'RU';
  }

  function init() {
    var locale = getActiveLocale();
    document.documentElement.lang = locale;
    applyUIStrings(locale);

    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var current = getActiveLocale();
        setLocale(current === 'ru' ? 'en' : 'ru');
      });
    }
  }

  window.i18n = { init: init, getActiveLocale: getActiveLocale };
})();
```

### Renderer changes

`renderTopics()` and `renderQuestionsGroups()` need to accept a `locale` parameter:

```js
// topics-renderer.js
function renderTopics(locale) {
  // Clear existing content first (for re-render on locale switch)
  topicsContainerElement.innerHTML = '';
  topicsNavigationElement.innerHTML = '';

  var topics = window.data.getTopics(locale || window.i18n.getActiveLocale());
  // ... rest of render logic unchanged
}
```

### Language toggle button UI

Add to both HTML pages, inside the sidebar nav:

```html
<div class="lang-switcher">
  <button id="lang-toggle" aria-label="Переключить язык / Switch language">
    EN
  </button>
</div>
```

Style: small pill button in sidebar footer, showing the OTHER language (i.e., shows "EN" when current is Russian, "RU" when current is English).

### Load order in HTML

```html
<!-- i18n must load before renderers use locale -->
<script src="js/topics-data.js"></script>
<script src="js/i18n.js"></script>
<script src="js/topics-renderer.js"></script>
<script>
  window.i18n.init();
  window.topics.renderTopics(window.i18n.getActiveLocale());
</script>
```

---

## Content Translation Scope

### Priority 1 — Translate (high value for English speakers)

- Topic titles and section descriptions (all 11 topics in `topics-data.js`)
- Question titles (all ~60 questions in `questions-data.js`)
- UI strings (headings, nav labels, intro paragraphs)
- Resource titles (to make links scannable in English)

### Priority 2 — Keep Russian (or add English alternatives)

- `descriptionTemplate` content — many of these reference Russian-language resources. For English, add a note: "Note: this resource is in Russian. For English, see: [alternative link]" or find English-language alternatives.
- Resource URLs — most URLs point to Russian articles/videos. For the English locale, provide English-language resource alternatives where possible.

### Notes on English content

Many current resources are Russian-language only (Habr, TProger, Russian YouTube channels). For the English locale:

- Keep the same URL if the resource has an English version (Microsoft Docs, MDN, official docs)
- Replace with English equivalents for Habr articles (find equivalent dev.to, Medium, or official docs)
- For Russian YouTube channels — no direct equivalent; note that English Microsoft Learn and official docs cover the same ground
- Microsoft Learn links already have `/en-us/` variants alongside `/ru-ru/`

---

## File Changes Summary

| File | Action | Notes |
|------|--------|-------|
| `js/topics-data.js` | Refactor | Wrap array in `{ ru: [...], en: [...] }` object |
| `js/questions-data.js` | Refactor | Same structure change |
| `js/i18n.js` | Create | ~60 lines, locale management |
| `js/topics-renderer.js` | Modify | Accept `locale` param, support re-render |
| `js/questions-renderer.js` | Modify | Accept `locale` param, support re-render |
| `index.html` | Modify | Add `data-i18n` attrs, lang toggle button, updated script order |
| `questions.html` | Modify | Same as index.html |

---

## Edge Cases

1. **Anchor navigation** — Section IDs (`#env_setup`, `#git_basics`, etc.) must remain the same across languages. Do not localize IDs.
2. **Re-render on switch** — When locale changes, the renderer clears and re-renders all content. Navigation scroll position resets to top. This is acceptable.
3. **SEO** — Single-page multilingual JS approach is not SEO-friendly (search engines may not index the English version). If SEO matters, add `<link rel="alternate" hreflang="ru" href="/index.html">` and `<link rel="alternate" hreflang="en" href="/?lang=en">` as hints. For a GitHub Pages educational site, this is low priority.
4. **Questions page navigation** — The `topics-renderer.js` adds a link to `questions.html` at the bottom of the nav. This link text ("Примеры вопросов") also needs translation.

---

## Estimated Effort

Large — the code changes are small (~100 lines of new/modified JS), but translating all content into English is the major effort. Approximately:

- Code changes: 2–3 hours
- Translating topic titles + descriptions: 1 hour
- Translating all question titles: 2 hours
- Finding English resource alternatives for Russian-only links: 4–6 hours

Total: 9–12 hours, mostly content work.

**Recommendation:** Implement the code infrastructure first with partial English translation (UI strings + topic titles). Leave resource-level translation as incremental follow-up.
