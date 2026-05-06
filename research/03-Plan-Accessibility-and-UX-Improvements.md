# Plan 03: Accessibility and UX Improvements

## Goal

Make the site usable for people who navigate with a keyboard, use screen readers, or are on a mobile device. Achieve WCAG 2.1 AA compliance and improve the Lighthouse accessibility score to 95+. No content changes — structure and semantics only.

---

## Current Accessibility Audit

### Critical issues (blockers for screen reader / keyboard users)

#### 1. `lang` attribute is wrong (`index.html:2`, `questions.html:2`)

```html
<!-- Current -->
<html lang="en">

<!-- Fix -->
<html lang="ru">
```

Screen readers use `lang` to pick the correct language voice/pronunciation rules. Russian text read with English pronunciation rules is incomprehensible.

#### 2. Duplicate `<body>` tag (`index.html:15–17`, `questions.html:15–17`)

```html
<!-- Current (invalid HTML) -->
<body>
  <body id="page-top">
```

The outer `<body>` is an orphaned tag. Browsers handle it silently but it's invalid HTML and may confuse some assistive technologies.

**Fix:** Remove the outer `<body>` on line 15. Keep only `<body id="page-top">`.

#### 3. Mobile navigation is completely broken

The hamburger button (`index.html:20–22`) uses Bootstrap's `data-toggle="collapse"` API:

```html
<button class="navbar-toggler" type="button"
  data-toggle="collapse"
  data-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent"
  aria-expanded="false">
```

Bootstrap JS is never loaded. Clicking the hamburger does nothing. On mobile, navigation is entirely inaccessible.

**Fix:** Add ~15 lines of vanilla JS to toggle the nav open/closed. See Plan 02 for implementation.

#### 4. Social icons have no accessible labels (`index.html:41–45`)

```html
<!-- Current — icon-only, no text -->
<a class="social-icon" href="https://t.me/bychangenews">
  <i class="fab fa-telegram-plane"></i>
</a>
```

Screen readers announce this as "link" with no destination description.

**Fix:** Add `aria-label` to each social link:
```html
<a class="social-icon" href="https://t.me/bychangenews" aria-label="Telegram канал ByChange">
  <i class="fab fa-telegram-plane" aria-hidden="true"></i>
</a>
<a class="social-icon" href="https://bychange.me/" aria-label="Сайт ByChange">
  <i class="fas fa-info-circle" aria-hidden="true"></i>
</a>
<a class="social-icon" href="https://www.youtube.com/..." aria-label="YouTube канал ByChange">
  <i class="fab fa-youtube" aria-hidden="true"></i>
</a>
```

Also add `aria-hidden="true"` to the icons themselves so screen readers don't try to announce the icon name.

#### 5. Duplicate IDs in rendered DOM (`js/topics-renderer.js`, `js/questions-renderer.js`)

Templates use `id` attributes like `id="topic-resource-container"`, `id="topic-resource-link"`, `id="topic-title"`, `id="topic-sub-title"`. When cloned via `cloneNode(true)`, these IDs are duplicated for every topic/resource rendered.

Duplicate IDs break:
- `aria-labelledby` and `aria-describedby` (they find only the first match)
- Browser's built-in "jump to element" via URL fragment
- Any CSS that uses ID selectors for specificity
- `document.getElementById()` (returns only the first match)

**Fix (Plan 02 partially covers this):** Change all template-internal `id=` attributes to `class=` attributes. Update renderers to use `element.querySelector('.class-name')` instead of the current ID-based approach.

---

### Serious issues (significant barriers)

#### 6. No skip navigation link

Users navigating by keyboard must tab through the entire sidebar navigation (11 topics × 1 link = 11 tabs minimum) before reaching main content on every page load.

**Fix:** Add a visually hidden skip link as the first element in `<body>`:

```html
<a href="#main-content" class="skip-link">Перейти к содержимому</a>
```

```css
.skip-link {
  position: absolute;
  transform: translateY(-100%);
  background: var(--color-accent);
  color: white;
  padding: 8px 16px;
  z-index: 9999;
  border-radius: 0 0 4px 4px;
}
.skip-link:focus {
  transform: translateY(0);
}
```

Add `id="main-content"` to the first `<section>` on each page.

#### 7. No ARIA landmarks

The page has no semantic landmark structure that screen reader users can use to jump between regions.

**Current structure:**
```
<nav> (exists but no role attributes)
<div> (just divs, no semantic meaning)
<section> (used for topics — correct!)
```

**Fix:** Add explicit ARIA roles where semantic HTML isn't sufficient:

```html
<!-- Navigation -->
<nav aria-label="Разделы">

<!-- Main content area -->
<main id="main-content">

<!-- Each topic section already uses <section> — good, but add aria-labelledby -->
<section aria-labelledby="topic-title-env_setup" id="env_setup">
  <h3 id="topic-title-env_setup">Настройка среды разработки</h3>
```

The renderer needs to generate unique heading IDs and wire `aria-labelledby` on the section.

#### 8. All external links open in new tab without warning

Many resource links have `target="_blank"` but no indication to the user that they'll open a new tab. Screen reader users and keyboard users find this disorienting.

**Fix option A:** Remove `target="_blank"` — let users control how links open.

**Fix option B:** Keep `target="_blank"` but add:
- `rel="noopener noreferrer"` (security + performance)
- `aria-label` suffix indicating new tab: e.g., `aria-label="${title} (открывается в новой вкладке)"`
- Or a CSS-generated "↗" indicator after external links

Recommended: Option B. Add `rel="noopener noreferrer"` unconditionally to all external links in the renderers. Add the screen-reader hint.

#### 9. `<details>/<summary>` on questions page lacks keyboard affordance styling

The `<details>/<summary>` elements are natively keyboard accessible (Space/Enter to open, `Tab` to navigate). But the current CSS doesn't style the focus ring, so keyboard users can't see which question is focused.

**Fix:** Add visible focus styles:

```css
summary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

---

### Moderate issues (barriers for some users)

#### 10. No focus styles on navigation links and resource links

The CSS resets or overrides the default browser focus ring. Keyboard users lose track of where they are.

**Fix:** Add `:focus-visible` styles to all interactive elements:
```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 2px;
}
```

Use `:focus-visible` (not `:focus`) so mouse users don't see the ring on click.

#### 11. Color contrast — orange on dark sidebar

Current primary color `#bd5d38` on the dark sidebar background `#2b2b2b` (approximate). The contrast ratio may not meet WCAG AA (4.5:1 for normal text, 3:1 for large text).

**Action:** Run the current color pairs through a contrast checker:
- Active nav link: `#bd5d38` on `#2b2b2b`
- Nav link text: sidebar text on sidebar background
- Body text: `#212529` on `#fff` (Bootstrap default — this is fine at ~16:1)

If the orange fails, shift it toward a lighter value only on dark backgrounds while keeping it on light content areas.

#### 12. Meta description missing

Both pages lack `<meta name="description">`. This doesn't affect accessibility directly but affects discoverability and is a Lighthouse SEO warning.

**Fix:**
```html
<!-- index.html -->
<meta name="description" content="Ресурсы для изучения .NET с нуля: структурированные темы и ссылки на русскоязычные курсы, статьи и видео.">

<!-- questions.html -->
<meta name="description" content="Примеры вопросов на собеседование по .NET, C#, ASP.NET Core, SQL и паттернам проектирования.">
```

#### 13. Page titles are identical and not descriptive

Both pages have `<title>.NET Learning Resources</title>`. Screen readers announce the page title on load.

**Fix:**
```html
<!-- index.html -->
<title>Темы для изучения .NET | .NET Learning Resources</title>

<!-- questions.html -->
<title>Примеры вопросов | .NET Learning Resources</title>
```

---

### Minor issues

#### 14. `<h3>` used as page headings without `<h1>` or `<h2>`

The first heading on each page is `<h3>`. This skips heading levels 1 and 2, which confuses screen reader outline navigation.

**Fix:** Change the main section heading to `<h1>`. Topic section headings that are currently `<h3>` should become `<h2>`.

```html
<!-- index.html — main intro heading -->
<h1 class="text-primary">Ресурсы для изучения .NET</h1>

<!-- Each topic section (rendered) -->
<h2 id="topic-title-...">Название темы</h2>
```

#### 15. Navbar brand / logo missing

The `<nav>` has no visible logo, site name, or home link at the top — just the list of topics. On a screen reader, there's no clear landmark for "this is the site identity."

**Fix:** Add a `<a class="navbar-brand" href="index.html">`.NET Learning Resources</a>` (or a small logo) to the nav.

---

## Lighthouse Targets

| Category | Estimated Current | Target |
|----------|-----------------|--------|
| Accessibility | ~60–70 | 95+ |
| Performance | ~75 | 85+ |
| Best Practices | ~70 | 95+ |
| SEO | ~70 | 90+ |

Key Lighthouse checks that will pass after these fixes:
- `[lang]` attribute present and valid ✓
- Buttons have accessible names ✓
- `<html>` element has valid `[lang]` ✓
- Links have discernible text ✓
- Heading elements appear in sequentially-descending order ✓
- `<meta name="description">` present ✓
- `rel="noopener"` on external links ✓

---

## Mobile/Tablet UX

The sidebar navigation is fixed on desktop but collapses on mobile. Issues beyond the broken hamburger:

1. **Touch target sizes** — Nav links need minimum 44×44px touch target (WCAG 2.5.5). Current padding may be insufficient on mobile.
2. **Font size on mobile** — The `subheading` class may render too large on narrow screens, causing horizontal overflow.
3. **Horizontal scroll on mobile** — If any content is wider than the viewport (e.g., a long URL in a description), it causes horizontal scrolling. Add `word-break: break-word` or `overflow-wrap: anywhere` to the main content area.
4. **Questions page on mobile** — The `<details>` elements need comfortable tap targets. The `summary` element needs `min-height: 44px`.

---

## Implementation Order

1. Fix `lang` attribute and duplicate `<body>` tag (quick win)
2. Add skip navigation link
3. Fix social icon `aria-label` attributes
4. Add visible focus styles (`:focus-visible`)
5. Fix duplicate IDs in templates (coordinate with Plan 02)
6. Fix mobile navigation (vanilla JS toggle)
7. Add ARIA landmarks and `aria-labelledby` wiring in renderers
8. Fix heading hierarchy (`h1` → `h2` → `h3`)
9. Add `rel="noopener noreferrer"` to all external links in renderers
10. Add `<meta name="description">` and improve page titles
11. Check and fix color contrast
12. Fix mobile touch targets and overflow issues
13. Run Lighthouse and fix remaining warnings

## Estimated Effort

Medium-Large — the changes span HTML, CSS, and JS renderers. Many are small individual fixes. The heading hierarchy change and ARIA landmark wiring require careful renderer changes. Approximately 4–6 hours.
