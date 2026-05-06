# Plan 02: Modernize Theme — Claude Design System

## Goal

Replace the current Start Bootstrap Resume template (Bootstrap 4.5, 10,156-line CSS) with a modern, lightweight custom design inspired by Anthropic's Claude design language. The result should feel clean, professional, and easy on the eyes — appropriate for a developer learning resource.

---

## Current State Analysis

### What exists now

| Asset | Details |
|-------|---------|
| CSS framework | Bootstrap 4.5 custom build — `styles/main.css` (10,156 lines) |
| Template | Start Bootstrap Resume v6.0.1 (MIT) |
| Primary color | `#bd5d38` (burnt orange/rust) |
| Secondary color | `#6c757d` (Bootstrap gray) |
| Fonts | Saira Extra Condensed (headings) + Muli (body) via Google Fonts |
| Icons | Font Awesome v5.13.0 via CDN JS |
| Layout | Fixed left sidebar navigation + scrollable main content |
| Dark mode | None |
| Responsive | Partially — sidebar collapses on mobile but hamburger is broken (no Bootstrap JS) |

### Problems with current approach

1. **10,156-line CSS file** — Almost all of it is Bootstrap's full distribution. The actual custom styles are maybe 200 lines. Loading 10k lines of CSS for a site that uses maybe 5% of Bootstrap is wasteful.
2. **Muli font is deprecated** — Google renamed it to Mulish in 2020. The old CDN still works but is not actively maintained.
3. **No dark mode** — Developers often prefer dark mode; it's 2025.
4. **Bootstrap JS not loaded** — The mobile hamburger uses `data-toggle="collapse"` (Bootstrap JS API) but no Bootstrap JS is included. Mobile navigation is completely broken.
5. **Font Awesome loaded via JS** — The Font Awesome JS bundle (which injects SVGs) is heavier than the CSS approach. Makes icon rendering slow and causes layout shift.
6. **No visual hierarchy beyond color** — The orange headings + gray body makes every section look the same. Hard to scan.
7. **Outdated feel** — Resume template aesthetic doesn't match a modern developer learning resource.

---

## Proposed Design System

### Design principles (Claude-inspired)

- **Clean and minimal** — Ample white space, no visual noise
- **Typography-first** — Content is the hero; UI chrome is invisible
- **Warm neutral palette** — Not cold blue-gray corporate, not loud orange
- **Accessible** — WCAG 2.1 AA contrast ratios everywhere
- **Dark mode native** — `prefers-color-scheme` from day one, with manual toggle
- **No heavy frameworks** — Custom CSS under 500 lines for actual styles

### Color palette

```css
:root {
  /* Brand */
  --color-accent: #d97757;          /* warm terracotta — close to current but refined */
  --color-accent-hover: #c4623d;

  /* Neutrals — light mode */
  --color-bg: #faf9f7;              /* warm off-white, not pure white */
  --color-surface: #f3f1ee;         /* card/section backgrounds */
  --color-border: #e5e2dc;
  --color-text-primary: #1a1917;    /* near-black with warmth */
  --color-text-secondary: #6b6660;  /* muted labels */
  --color-text-muted: #9b9490;

  /* Sidebar */
  --color-sidebar-bg: #2d2926;      /* warm dark, not pure black */
  --color-sidebar-text: #e8e5e0;
  --color-sidebar-active: #d97757;
  --color-sidebar-hover: rgba(255,255,255,0.08);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1a1917;
    --color-surface: #242220;
    --color-border: #3a3733;
    --color-text-primary: #f0ede8;
    --color-text-secondary: #a09c97;
    --color-text-muted: #6b6660;
    /* Sidebar stays the same in dark mode — already dark */
  }
}
```

### Typography

Replace Saira Extra Condensed + Muli with a modern, system-friendly stack:

```css
/* Headings */
--font-display: 'Inter', system-ui, -apple-system, sans-serif;

/* Body */
--font-body: 'Inter', system-ui, -apple-system, sans-serif;

/* Code */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
```

Why Inter: It's the de-facto standard for developer tools and documentation. Free, self-hostable, excellent Cyrillic support, very readable at small sizes. Claude.ai itself uses Inter.

Alternative: Keep Google Fonts but switch to `Mulish` (Muli's successor) + `Inter` or just use system fonts entirely for zero external dependency.

### Layout

Keep the conceptual layout (fixed sidebar + main content) — it works well for this type of content. Modernize the implementation:

```
┌─────────────────┬──────────────────────────────────────────┐
│                 │                                          │
│   Sidebar       │   Main Content                           │
│   280px fixed   │   max-width: 860px, centered             │
│                 │                                          │
│   Logo/Brand    │   Section heading                        │
│   Nav links     │   Section description (lead)             │
│                 │   Resource cards                         │
│   Social icons  │                                          │
│                 │                                          │
└─────────────────┴──────────────────────────────────────────┘

Mobile (< 768px):
- Sidebar becomes a top hamburger nav
- Nav opens as a slide-down drawer
- Main content is full width
```

### Component designs

#### Navigation sidebar
```
- Warm dark background (#2d2926)
- Logo/site name at top with accent color
- Nav links: 14px, 1.1 letter-spacing, uppercase
- Active link: accent color left border + accent text
- Hover: subtle background tint
- Section numbers rendered as muted prefix
- Social icons row at bottom, icon-only with hover tooltip
```

#### Section headings
```
- H3 with accent color — same as current but refined
- Subheading: 13px uppercase tracking-widest muted text
- Dividers: 1px border in --color-border (lighter than current solid black)
```

#### Resource links (topic page)
```
Current: numbered plain anchor + br + div with description

Proposed: card-style resource entry
- Number badge (circular, accent background)
- Link in accent color, underline on hover
- Description text below in secondary color
- Subtle left border on hover
```

#### Question entries (questions page)
```
Current: <details>/<summary> with default browser styling

Proposed: styled <details>/<summary>
- Custom triangle/chevron icon (CSS only, no FA dependency)
- Summary: same weight as nav link
- Expanded content: indented, with link bullets
- Smooth open/close animation via CSS max-height transition
```

#### Dark mode toggle
```
- Small button in sidebar footer
- Sun/moon icon (CSS-drawn or single inline SVG, no FA)
- Persists to localStorage
- Also respects prefers-color-scheme on first visit
```

---

## Implementation Plan

### Step 1: Remove Bootstrap dependency

Delete `styles/main.css` (10,156 lines). Write `styles/main.css` from scratch targeting ~400–600 lines of actual custom styles. Use CSS custom properties (variables) throughout.

Core CSS modules to write:
- `/* Reset */` — minimal normalize (20 lines)
- `/* Variables */` — all design tokens (50 lines)
- `/* Layout */` — sidebar + main content grid (60 lines)
- `/* Navigation */` — sidebar links, mobile drawer (80 lines)
- `/* Typography */` — headings, body, lead, muted (40 lines)
- `/* Components */` — resource cards, question details, social icons, badges (80 lines)
- `/* Utilities */` — spacing, dividers (20 lines)
- `/* Dark mode */` — overrides via `[data-theme="dark"]` + `prefers-color-scheme` (60 lines)
- `/* Responsive */` — mobile breakpoints (80 lines)

### Step 2: Replace Font Awesome with inline SVG icons

Remove `<script src="https://use.fontawesome.com/releases/v5.13.0/js/all.js">`. Use inline SVG for the 3 social icons (Telegram, info, YouTube) directly in the HTML. This eliminates a large external JS dependency and layout shift.

### Step 3: Update fonts

Option A (recommended): Self-host Inter via `@font-face` or use the Google Fonts CSS2 API with `display=swap`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
```

Option B: Drop Google Fonts entirely and use system font stack. Zero external dependency, fastest possible load. Slightly less consistent across devices.

### Step 4: Fix Bootstrap JS dependency

The mobile hamburger currently does nothing because Bootstrap JS isn't loaded. Options:

A. **Write 15 lines of vanilla JS** to toggle a CSS class on the nav element — no Bootstrap needed.
B. **Load Bootstrap Bundle JS** from CDN — heavier but if Bootstrap CSS is being removed, this is irrelevant.

Recommended: Option A. Add a small `<script>` inline in the HTML or a new `js/nav.js` file.

### Step 5: Update HTML templates

The current HTML templates (`<template>` elements) use IDs that get cloned into the DOM many times, creating duplicate IDs. Refactor:
- Replace `id="topic-resource-container"` with `class="topic-resource-container"`
- Replace `id="topic-resource-link"` with `class="topic-resource-link"`
- Same for all other template-internal IDs
- Update renderers to use `querySelector` on the cloned element (already done correctly in some places, but reliant on ID uniqueness which is wrong)

### Step 6: Add dark mode toggle

Add a `<button id="theme-toggle">` to sidebar. Add `js/theme.js`:
- On load: check `localStorage.getItem('theme')`, fall back to `prefers-color-scheme`
- On click: toggle `document.documentElement.dataset.theme` between `'light'` and `'dark'`
- Persist to localStorage

---

## Files to Create/Modify

| File | Action | Notes |
|------|--------|-------|
| `styles/main.css` | Rewrite | ~400–600 lines replacing 10,156 |
| `index.html` | Modify | Remove FA script, add font link, add theme toggle button, fix template IDs |
| `questions.html` | Modify | Same as index.html |
| `js/theme.js` | Create | Dark mode toggle logic (~20 lines) |
| `js/nav.js` | Create | Mobile nav toggle (~15 lines) |
| `js/topics-renderer.js` | Modify | Change ID selectors to class selectors |
| `js/questions-renderer.js` | Modify | Change ID selectors to class selectors |

---

## Before/After Comparison

| Metric | Before | After (target) |
|--------|--------|----------------|
| CSS size | 10,156 lines / ~150KB | ~500 lines / ~8KB |
| External JS | Font Awesome bundle (~130KB) | None |
| External fonts | 2 Google Font families | 1 font family (Inter) |
| Dark mode | No | Yes |
| Mobile nav | Broken | Working |
| Duplicate IDs in DOM | Yes (~30+ duplicates) | No |
| Framework dependency | Bootstrap 4.5 | None |

---

## Estimated Effort

Large — writing clean CSS from scratch with dark mode is the bulk of the work. Approximately 6–10 hours.

The biggest risk is visual regression — the new CSS must handle all existing content patterns (topic sections, resource lists, question accordions, social icons) without breaking. Manual testing on mobile + desktop required before shipping.
