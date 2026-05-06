# Plan 05: Update to .NET 10 / ASP.NET Core Terminology and Add New Topics

## Goal

Modernize the learning path to reflect .NET 10 (or .NET 8 LTS), current ASP.NET Core patterns, and introduce Docker and .NET Aspire topics. Fix outdated version references, incorrect/mixed terminology, and add new sections covering technologies that are now mainstream in the .NET ecosystem.

---

## Terminology Cheat Sheet

Before making changes, these are the canonical names to use consistently:

| Old / Wrong | Correct Current Term | Notes |
|-------------|---------------------|-------|
| `.NET Core` | `.NET` | Since .NET 5 (2020), "Core" is dropped. Use `.NET 8` or `.NET 10` for specific versions. |
| `.NET Framework` | `.NET Framework` | Still valid — refers specifically to the Windows-only legacy platform |
| `ASP.NET MVC Core` | `ASP.NET Core MVC` | Word order matters |
| `ASP.NET MVC / MVC Core` | `ASP.NET Core` (general) or `ASP.NET Core MVC` (specific) | |
| `Visual Studio 2019` | `Visual Studio 2022` | Current version |
| `HttpFilter, HttpHandler` | Action Filters, Middleware | These are classic ASP.NET (System.Web), not ASP.NET Core |
| `GAC` | GAC is mostly obsolete in .NET — rarely relevant | Can be kept as historical context |
| `dotnet-core` (in URLs) | `dotnet` | Microsoft updated their download URLs |

---

## Section-by-Section Changes in `js/topics-data.js`

### Topic: `env_setup` — Environment Setup (lines 6–39)

**Current problems:**
- Recommends `.NET Core 3.1` (End of Life since Dec 2022)
- Links to `https://dotnet.microsoft.com/download/dotnet-core` (now `dotnet-core` path is archived)
- Instructs to find `SDK 3.1.402` and `ASP.NET Core Runtime 3.1.8`
- Recommends `Visual Studio 2019`

**Changes:**

1. Replace `.NET Core 3.1` resource:
   - New URL: `https://dotnet.microsoft.com/download`
   - New description: Direct users to download **.NET 8** (LTS, supported until November 2026) or **.NET 10** (if it's released and stable). Mention that the download page highlights the LTS version automatically.
   - Remove specific SDK/Runtime version numbers — they change with every patch release

2. Replace `Visual Studio 2019` resource:
   - New URL: `https://visualstudio.microsoft.com/downloads/`
   - Updated description: Community version is still free. Recommend the **ASP.NET and web development** workload during installation.
   - Find a current VS 2022 installation video

3. Add `Visual Studio Code` as an alternative:
   - Many .NET developers now use VS Code. Add it as an alternative to VS 2022 with the C# Dev Kit extension.
   - URL: `https://code.visualstudio.com/` + `https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit`

4. Update topic description from `"Установка Git, .NET Core, Visual Studio 2019 или Visual Studio Code"` to `"Установка Git, .NET 8/10, Visual Studio 2022 или Visual Studio Code"`

---

### Topic: `introduction` — Introduction to C# (lines 44–69)

**Current problems:**
- Microsoft Learn URL is for Russian locale, likely still valid but worth verifying
- All 3 video courses are from ~2018–2020; some may be outdated for modern C# syntax (C# 12 / 13 features)

**Changes:**

1. Verify the Microsoft Learn URL `https://docs.microsoft.com/ru-ru/learn/paths/csharp-first-steps/` still works and links to current content. Microsoft Learn restructured their paths — the updated URL is likely `https://learn.microsoft.com/ru-ru/training/paths/get-started-c-sharp-part-1/`

2. Add a new resource for C# 12/13 features if any of the existing courses are outdated:
   - "Что нового в C# 12" — https://learn.microsoft.com/ru-ru/dotnet/csharp/whats-new/csharp-12
   - "Что нового в C# 13" — https://learn.microsoft.com/ru-ru/dotnet/csharp/whats-new/csharp-13

3. Add a resource for **.NET Interactive / Polyglot Notebooks** as a beginner-friendly way to experiment with C# without setting up a project.

---

### Topic: `web_and_asp_net` — Web and ASP.NET Core (lines 119–150)

**Current problems:**
- Eugene Popov's ASP.NET Core course is older and may not cover Minimal APIs, Razor Pages modern patterns
- No mention of Minimal APIs (introduced in .NET 6, now mainstream in .NET 8+)

**Changes:**

1. Update topic description to mention Minimal APIs alongside MVC:
   - Current: `"Как работает веб, что такое сервер и ASP.NET Core"`
   - New: `"Как работает веб, что такое сервер и ASP.NET Core (Minimal API, MVC)"`

2. Add a resource about **Minimal APIs** — the modern, lightweight approach to building HTTP APIs in ASP.NET Core, preferred for new greenfield APIs:
   - https://learn.microsoft.com/ru-ru/aspnet/core/fundamentals/minimal-apis/overview

3. Consider adding a resource about **Razor Pages** vs MVC for beginners — Razor Pages is often simpler to learn first.

---

### Topic: `db_and_ef` — Databases, SQL, EF Core (lines 154–190)

**Current problems:**
- EF Core overview URL is old: `https://docs.microsoft.com/ru-ru/ef/core/` — should migrate to `learn.microsoft.com`
- "Get started with EF Core" URL points to `?tabs=netcore-cli` — the CLI is now just `dotnet` not `dotnet-core`

**Changes:**

1. Update EF Core links to current `learn.microsoft.com` equivalents
2. Add a resource on **EF Core Migrations** — this is a critical skill that the current resources don't cover in depth
3. Add a note about EF Core 8 improvements (JSON columns, complex types, bulk updates via `ExecuteUpdate`/`ExecuteDelete`)

---

### Topic: `architecture_patterns` — Architecture and Design Patterns (lines 194–239)

**Current problems:**
- Yandex Zen link for N-Layered architecture (line 221) is dead
- No mention of **Vertical Slice Architecture** or **Clean Architecture** — both widely discussed in .NET community

**Changes:**

1. Replace the dead Yandex Zen link with a working alternative about N-Layered architecture. Options:
   - Microsoft's own "Common web application architectures" page: `https://learn.microsoft.com/ru-ru/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures`
   - A Habr article on N-Layered / multi-tier

2. Add a resource about **Clean Architecture** — the evolution of N-Layered that's now dominant in enterprise .NET:
   - Jason Taylor's Clean Architecture template is the de-facto reference: https://github.com/jasontaylordev/CleanArchitecture

3. Add brief mention of **CQRS** (Command Query Responsibility Segregation) — commonly mentioned in .NET job interviews alongside patterns like Repository.

---

### Topic: `asp_net_advanced` — Building an ASP.NET Core Application (lines 244–271)

**Current problems:**
- Loftblog video course may be outdated (check if it covers ASP.NET Core 6+ patterns)
- No guidance on using the **`dotnet new` CLI** to scaffold projects
- The project ideas list is good but links to `devchallenges.io` — verify these links are still live

**Changes:**

1. Add a resource about scaffolding with `dotnet new`:
   - Show learners how to create a project from the CLI: `dotnet new webapi`, `dotnet new mvc`
   - Link to: `https://learn.microsoft.com/ru-ru/dotnet/core/tools/dotnet-new`

2. Verify devchallenges.io links are still live and point to the correct challenges.

3. If Loftblog course is outdated, find a current ASP.NET Core MVC course alternative.

---

### Topic: `devops` — DevOps Introduction (lines 348–379)

**Current problems:**
- Ansible quick-start resource has a copy-paste URL pointing to the Jenkins playlist (confirmed bug — both point to `https://www.youtube.com/watch?v=QvlWcxECzE8&list=RDCMUCemtVTjKhD_GcEOQ_rNOrRw`)
- No mention of **GitHub Actions** — now the dominant CI/CD tool for GitHub-hosted projects
- Jenkins is still used in enterprises but is less relevant for a beginner's first CI/CD experience
- No mention of **Docker Compose** — essential for local multi-service development

**Changes:**

1. Fix Ansible URL — find correct link for "Ansible: быстрый старт"

2. Add **GitHub Actions** resource — the most practical first CI/CD experience for GitHub projects:
   - Description: Запуск автоматической сборки и тестов при каждом push в репозиторий
   - URL: `https://docs.github.com/ru/actions/quickstart`
   - Add a .NET-specific workflow example resource

3. Add **Docker Compose** resource alongside the existing Docker resource:
   - Docker Compose allows running multiple containers (app + database) with a single `docker-compose up`
   - Critical for .NET + SQL Server local development
   - URL: `https://docs.docker.com/compose/`

4. Update topic description to mention GitHub Actions:
   - Current: `"Непрерывная интеграция и доставка (CI/CD), развертывание и упревление конфигурацией (Ansible), контейнеризация (Docker)"`
   - New: `"Непрерывная интеграция и доставка (CI/CD, GitHub Actions), контейнеризация (Docker, Docker Compose)"`

---

## New Topics to Add

### New Topic: `docker_dotnet` — Docker для .NET разработчика

Insert after `asp_net_advanced` (before `tests`).

```js
{
  id: 'docker_dotnet',
  title: 'Docker для .NET разработчика',
  description: 'Контейнеризация .NET приложений: Dockerfile, docker-compose, работа с базами данных в контейнере',
  resources: [
    {
      title: 'Официальная документация - Containerize a .NET app',
      url: 'https://learn.microsoft.com/en-us/dotnet/core/docker/build-container',
      descriptionTemplate: 'Пошаговое руководство по созданию Docker-образа для .NET приложения'
    },
    {
      title: 'Видео - Docker для .NET разработчика',
      url: '...',  // find a good Russian-language resource
      descriptionTemplate: 'Практическое введение в Docker для разработчиков на .NET'
    },
    {
      title: 'Docker Hub - официальные образы .NET',
      url: 'https://hub.docker.com/_/microsoft-dotnet',
      descriptionTemplate: 'Официальные Microsoft образы для запуска .NET приложений в контейнерах'
    },
    {
      title: 'Docker Compose + ASP.NET Core + SQL Server',
      url: '...',  // find a good tutorial
      descriptionTemplate: 'Настройка локального окружения с ASP.NET Core и SQL Server через docker-compose'
    },
    {
      title: 'Multi-stage builds для .NET',
      url: 'https://learn.microsoft.com/en-us/dotnet/architecture/microservices/docker-application-development-process/docker-app-development-workflow',
      descriptionTemplate: 'Многоэтапная сборка позволяет создать легкий production-образ отдельно от образа для сборки'
    }
  ]
}
```

### New Topic: `aspire` — .NET Aspire

Insert after `docker_dotnet`.

.NET Aspire was introduced in .NET 8 and became stable in .NET 9. It's Microsoft's opinionated stack for building cloud-native, observable, production-ready distributed .NET applications. It's rapidly becoming the standard for new .NET microservice projects.

```js
{
  id: 'aspire',
  title: '.NET Aspire',
  description: 'Облачно-нативная разработка на .NET: оркестрация сервисов, встроенная наблюдаемость, ServiceDefaults',
  resources: [
    {
      title: 'Официальная документация - .NET Aspire overview',
      url: 'https://learn.microsoft.com/ru-ru/dotnet/aspire/get-started/aspire-overview',
      descriptionTemplate: 'Обзор .NET Aspire: что это, для чего нужен и когда применять'
    },
    {
      title: 'Quickstart - Build your first .NET Aspire app',
      url: 'https://learn.microsoft.com/ru-ru/dotnet/aspire/get-started/build-your-first-aspire-app',
      descriptionTemplate: 'Практическое руководство: создание первого приложения с .NET Aspire за 15 минут'
    },
    {
      title: 'Видео - .NET Aspire введение',
      url: '...',  // find Russian or well-subtitled EN resource
      descriptionTemplate: 'Видео-введение в .NET Aspire для разработчиков знакомых с ASP.NET Core'
    },
    {
      title: '.NET Aspire Dashboard',
      url: 'https://learn.microsoft.com/ru-ru/dotnet/aspire/fundamentals/dashboard/overview',
      descriptionTemplate: 'Встроенный дашборд Aspire для мониторинга запросов, логов и трассировок в процессе разработки'
    }
  ]
}
```

### New Topic: Minimal APIs (extend `web_and_asp_net` or separate topic)

Rather than a separate topic, add 2–3 resources to the existing `web_and_asp_net` topic about Minimal APIs. They're a key modern pattern.

---

## Changes in `js/questions-data.js`

### Section: `dot_net` — Questions about .NET (lines 96–158)

**Changes:**

1. Rename section title from `"Вопросы по .NET"` to distinguish .NET (modern) from .NET Framework (legacy). Could add a note in the section intro.

2. Question "Что такое .Net Framework?" — add a clarifying note that .NET Framework is the legacy Windows-only platform, distinct from modern .NET (.NET 5+). Update the link to include a comparison article.

3. Question "Из чего состоит .Net Framework (IL, CIL, MSIL, CLI и JIT)?" — The concepts (IL, CLR, JIT) apply to modern .NET too. Rename to `"Из чего состоит .NET (IL, CIL, MSIL, CLI и JIT)?"` and add a link to the modern CLR documentation.

4. Add new question: **"Чем .NET отличается от .NET Framework?"** — This is a common beginner confusion and interview topic.
   - Link: https://learn.microsoft.com/ru-ru/dotnet/standard/choosing-core-framework-server

### Section: `asp_net_mvc` — ASP.NET Core questions (lines 387–472)

**Changes:**

1. Rename section from `"Вопросы по ASP.NET MVC / MVC Core"` to `"Вопросы по ASP.NET Core"`

2. Question `"Что такое HttpFilter, HttpHanlder? Как они используются?"` (line 449) — has two issues:
   - Typo: `HttpHanlder` → `HttpHandler`
   - These are classic ASP.NET (System.Web) concepts, not ASP.NET Core
   - **Fix:** Reframe as: `"Что такое Action Filters и Middleware в ASP.NET Core? Чем они отличаются от HttpFilter и HttpHandler в классическом ASP.NET?"`
   - Add links to ASP.NET Core Middleware docs and Action Filters docs

3. Fill in empty draft questions with links:
   - `"Что такое ModelBinder?"` → https://learn.microsoft.com/ru-ru/aspnet/core/mvc/models/model-binding
   - `"Как работают маршруты (route) в ASP.NET MVC?"` → https://learn.microsoft.com/ru-ru/aspnet/core/mvc/controllers/routing
   - `"Что такое Middleware в ASP.NET MVC Core?"` → https://learn.microsoft.com/ru-ru/aspnet/core/fundamentals/middleware/

4. Add new question: **"Что такое Minimal API в ASP.NET Core?"**
   - Link: https://learn.microsoft.com/ru-ru/aspnet/core/fundamentals/minimal-apis/overview

### Section: `databases` — SQL and DB questions (lines 581–639)

All 9 questions are marked `draft: true` with empty links. Fill in links:

| Question | Resource |
|----------|---------|
| Типы БД (реляционные/нереляционные) | https://habr.com/ru/articles/480278/ |
| SQL vs NoSQL vs NewSQL | https://habr.com/ru/articles/441950/ |
| Объекты в БД, триггеры | https://metanit.com/sql/sqlserver/10.1.php |
| Индексы | https://habr.com/ru/articles/247373/ |
| Первичный/внешний ключи | https://metanit.com/sql/sqlserver/4.5.php |
| Хранимые процедуры vs функции | https://metanit.com/sql/sqlserver/10.2.php |
| План оптимизации | https://habr.com/ru/articles/203064/ |
| JOIN типы | https://metanit.com/sql/sqlserver/4.2.php |
| View в SQL | https://metanit.com/sql/sqlserver/10.3.php |

Remove `draft: true` from all entries after links are added.

### New questions to add

**For .NET section:**
- "Что такое .NET Aspire?"
- "Чем отличается .NET 8 LTS от .NET 10?"

**For ASP.NET Core section:**
- "Что такое Minimal API? Чем отличается от Controller-based подхода?"
- "Что такое gRPC и как использовать в .NET?"

**For Advanced section:**
- "Что такое CQRS?"
- "Что такое MediatR и для чего используется?"

---

## Files to Modify

| File | Changes |
|------|---------|
| `js/topics-data.js` | Update env_setup, introduction, web_and_asp_net, db_and_ef, architecture_patterns, devops topics; Add docker_dotnet and aspire topics |
| `js/questions-data.js` | Update dot_net and asp_net_mvc sections; Fill all draft questions with links; Add new questions |

---

## Resources to Find Before Implementation

Before writing code, research and validate the following (some URLs need to be found):

1. Current Russian-language Docker for .NET video course
2. Current .NET Aspire Russian-language intro video or well-subtitled English video
3. Current ASP.NET Core MVC video course (replacement for potentially outdated Loftblog)
4. Correct Ansible "быстрый старт" video URL (the current one is a copy-paste error)
5. Verify all existing Stepik course URLs are still active
6. Verify `devchallenges.io` project challenge URLs are still live

---

## Estimated Effort

Medium-Large — content changes across two large data files. New topic content (Docker for .NET, .NET Aspire) requires writing original Russian descriptions and finding appropriate resources.

- Terminology fixes and URL updates: 2 hours
- Adding Docker topic: 1 hour (+ research time for Russian video links)
- Adding .NET Aspire topic: 1 hour (+ research time)
- Filling in draft SQL questions: 1 hour
- Adding new interview questions: 1 hour

Total: 6–8 hours, heavily weighted toward research/finding good resources.
