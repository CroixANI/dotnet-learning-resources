# Plan 01: Review — Typos, Grammar, and Technical Errors

## Goal

Audit all Russian-language text in the project for spelling mistakes, grammar errors, beginner-unfriendly phrasing, and technical inaccuracies. Fix them in-place in the source files. No structural changes — content only.

---

## Files in Scope

| File | Lines | Content type |
|------|-------|--------------|
| `index.html` | 77 | Intro text, page title |
| `questions.html` | 67 | Intro text, page title |
| `js/topics-data.js` | 443 | Topic titles, descriptions, resource descriptions |
| `js/questions-data.js` | 736 | Question titles, link titles, hints |

---

## Confirmed Typos and Grammar Errors

### `index.html`

| Line | Current | Fix | Notes |
|------|---------|-----|-------|
| 2 | `lang="en"` | `lang="ru"` | Page is in Russian |
| 15–17 | Two `<body>` tags nested | Remove outer `<body>` on line 15 | Invalid HTML |
| 35 | `само проверки` | `самопроверки` | One compound word |

### `questions.html`

| Line | Current | Fix | Notes |
|------|---------|-----|-------|
| 2 | `lang="en"` | `lang="ru"` | Page is in Russian |
| 15–17 | Two `<body>` tags nested | Remove outer `<body>` on line 15 | Invalid HTML |

### `js/topics-data.js`

| Line | Current | Fix | Notes |
|------|---------|-----|-------|
| 135 | `Lofblog` | `Loftblog` | Channel name misspelled |
| 213 | `В видео авто простыми словами объясняет` | `В видео автор простыми словами объясняет` | Missing "р" |
| 317 | `алрогитмов` | `алгоритмов` | Transposed letters |
| 351 | `упревления` | `управления` | Transposed letters |
| 387 | `подчеркнуть много интересного` | `почерпнуть много интересного` | Wrong verb — `подчеркнуть` means "to underline"; `почерпнуть` means "to glean/pick up" — meaning is inverted |

### `js/questions-data.js`

| Line | Current | Fix | Notes |
|------|---------|-----|-------|
| 47 | `числа Фиббоначчи` | `числа Фибоначчи` | Double "б" is wrong |
| 47 | `с использование рекурсии` | `с использованием рекурсии` | Missing instrumental case ending "-м" |
| 418 | `Хибр` | `Хабр` | Wrong vowel — this is the site habr.com |
| 449 | `HttpHanlder` | `HttpHandler` | Transposed letters |
| 516 | `Fontend Stuff` | `Frontend Stuff` | Missing "r" |

---

## Technical Inaccuracies

### `js/topics-data.js` — `env_setup` topic (lines 6–39)

**Problem:** References `.NET Core 3.1` which reached End of Life on December 13, 2022. Directs users to download `SDK 3.1.402` and `ASP.NET Core Runtime 3.1.8`.

**Fix:**
- Replace `.NET Core 3.1` with `.NET 8` (current LTS, supported until November 2026) or mention both .NET 8 and .NET 10
- Update download URL from `https://dotnet.microsoft.com/download/dotnet-core` to `https://dotnet.microsoft.com/download`
- Update SDK version references to current stable versions
- Remove the specific version numbers from the instructions — they become outdated; instead direct users to download the latest LTS

**Problem:** Recommends `Visual Studio 2019`.

**Fix:** Replace with `Visual Studio 2022` (Community edition, still free). Update the YouTube installation video link.

### `js/topics-data.js` — `devops` topic (lines 348–379)

**Problem:** The Ansible resource link on line 370 points to the same URL as the Jenkins resource on line 365 (`https://www.youtube.com/watch?v=QvlWcxECzE8&list=RDCMUCemtVTjKhD_GcEOQ_rNOrRw`) — copy-paste error.

**Fix:** Find and set the correct Ansible quick-start URL.

### `js/topics-data.js` — `architecture_patterns` topic (lines 194–239)

**Problem:** The Yandex Zen link (line 221, `zen.yandex.ru/...`) about N-Layered architecture is dead. Yandex Zen was shut down for most international users in 2022–2023.

**Fix:** Find a replacement article about N-Layered / multi-tier architecture in Russian.

### `js/questions-data.js` — `.NET` questions group

**Problem:** Questions on lines 99–158 ask about `.NET Framework` (e.g., "Что такое .Net Framework?", "Из чего состоит .Net Framework (IL, CIL, MSIL, CLI и JIT)?"). In 2025 the dominant platform is `.NET` (formerly .NET Core), not `.NET Framework`.

**Fix:** Reframe questions to distinguish classic `.NET Framework` (Windows-only, legacy) from modern `.NET` (cross-platform, current). Add a note to the section intro explaining this distinction.

### `js/questions-data.js` — ASP.NET MVC questions group (line 388)

**Problem:** Section is titled `Вопросы по ASP.NET MVC / MVC Core`. The term "MVC Core" is obsolete — it was used during .NET Core 1.x era. The current correct name is `ASP.NET Core MVC`.

**Problem:** Line 449 — `HttpFilter, HttpHanlder` (also has a typo). `HttpHandler` and `HttpModule` are classic ASP.NET (System.Web) concepts that do not exist in ASP.NET Core. In ASP.NET Core the equivalent is Middleware.

**Fix:** Rename the section to `Вопросы по ASP.NET Core`. Update the HttpFilter/HttpHandler question to reference Middleware and Action Filters in ASP.NET Core context. Add a note clarifying these are classic ASP.NET concepts and what the ASP.NET Core equivalents are.

---

## Beginner-Friendliness Improvements

### `js/topics-data.js` — `algorithms` topic (lines 313–344)

**Current description:** `"Данный видеокурс ... предназначен для разработчиков, которые владеют языком С# на уровне выше среднего"`

**Problem:** The description says the course is for developers with "above average C# knowledge" — this is scary for beginners and inaccurate as a section description.

**Fix:** Rewrite the section description to be welcoming. Keep the course description in the `descriptionTemplate` of that specific resource. Write a new section-level description like: `"Базовые алгоритмы и структуры данных — важная часть подготовки к техническому собеседованию."`

### `index.html` — Intro paragraph (lines 34–39)

**Current:**
```
Слева находятся темы для изучения в порядке их следования. По окончании каждого блока есть вопросы для само проверки.
В каждой теме представлены ссылки на русскоязычные ресурсы: статьи, видео либо курсы на платформах.
Цель данного сайта предоставить ресурсы для самоподготовки.
Записаться на курсы или найти ментора можно с помощью ByChange
```

**Problems:**
- `само проверки` is a typo (already listed above)
- "Цель данного сайта предоставить" is missing a word — should be "Цель данного сайта — предоставить" (dash + infinitive)
- "Записаться на курсы или найти ментора можно с помощью ByChange" — ByChange is mentioned without any context for new visitors; unclear what it is

**Fix:**
- Add dash: `"Цель данного сайта — предоставить ресурсы для самоподготовки."`
- Add brief context about ByChange: `"Записаться на курсы или найти ментора для изучения .NET можно с помощью платформы ByChange"`
- Fix `самопроверки`

### Empty resource descriptions

Several resources have empty `descriptionTemplate: ''`. These are confusing for beginners who expect to understand why they should follow the link. Affected entries:

- `topics-data.js:97` — "Видео-курс - Git - Полный курс" (empty description)
- `topics-data.js:289–291` — "Изучение языка программирования C# - Урок 17 - Модульные тесты" (empty)
- `topics-data.js:325–327` — "Видео-курс - Алгоритмы и Структуры Данных (Java)" (empty — also the Java mention needs a note that C# devs can still learn from it)

**Fix:** Write one-sentence descriptions for each empty entry explaining what the learner will gain.

### Empty question links

Many questions in `questions-data.js` have `links: []` (empty). These are marked `draft: true`. For Plan 01, we should at minimum fill in links for the most common/beginner questions:

- `Вопросы по .NET` — "Какие бывают сборки по типу развертывания (local, GAC)?" — link to Microsoft Docs
- `Вопросы по C#` — "Что такое методы расширения?", "Когда вызывается статический конструктор?", "string vs StringBuilder?", "Возможно ли множественное наследование?" — all have empty links
- `Вопросы по ASP.NET Core` — ModelBinder, Routes, Middleware — all empty
- `Вопросы по SQL и БД` — all 9 questions are draft with empty links
- `Вопросы паттернам и архитектуре` — "Service Mesh" is empty

---

## Implementation Order

1. Fix HTML structural bugs (`lang` attribute, duplicate `<body>` tag) in both HTML files
2. Fix all confirmed typos in `topics-data.js`
3. Fix all confirmed typos in `questions-data.js`
4. Update outdated version references (`.NET Core 3.1`, `VS 2019`) in `topics-data.js`
5. Fix the Ansible copy-paste URL bug in `topics-data.js`
6. Find replacement for dead Yandex Zen link
7. Add missing descriptions for empty entries
8. Fill in links for the most critical draft questions
9. Add dashes and improve intro paragraphs

## Estimated Effort

Medium — mostly text editing in data files. No structural JS or CSS changes. Approximately 2–3 hours of careful editing.
