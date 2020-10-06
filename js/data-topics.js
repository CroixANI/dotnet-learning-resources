(function () {
  var TOPICS = [
    // *************************
    // ======= Env & IDE setup
    // *************************
    {
      id: 'env_setup',
      title: 'Настройка среды разработки на компьютере',
      description: 'Установка Git, .NET Core, Visual Studio 2019 или Visual Studio Code',
      resources: [
        {
          title: 'Скачать Git с официального сайта',
          url: 'https://git-scm.com/downloads',
          descriptionTemplate: `Скачайте Git с официального сайта для вашей платформы и затем установите его`,
        },
        {
          title: 'Скачать .NET Core',
          url: 'https://dotnet.microsoft.com/download/dotnet-core',
          descriptionTemplate: `<div>
            <p>На сайте найдите <b>.NET Core 3.1 (recommended)</b> (будет выделено желтым цветом) и кликните</p>
            <br/>
            <p>В открывшейся странице найдите и скачайте следующие элементы</p>
            <ul>
              <li>SDK 3.1.402 или выше</li>
              <li>ASP.NET Core Runtime 3.1.8 или выше</li>
            </ul>
          </div>`,
        },
        {
          title: 'Скачать Visual Studio 2019',
          url: 'https://visualstudio.microsoft.com/downloads/',
          descriptionTemplate: `Выбрать Community версию (она бесплатная), скачать и затем установить`,
        },
        {
          title: 'Видео - Установка Visual Studio 2019',
          url: 'https://www.youtube.com/watch?v=8vmd9PJ7b-w',
          descriptionTemplate: `Одно из многочисленных видео по установке VS 2019`,
        },
      ]
    },
    // *************************
    // ======= Introduction
    // *************************
    {
      id: 'introduction',
      title: 'Введение',
      description: 'Основы синтаксиса языка и его основные механизмы',
      resources: [
        {
          title: 'Microsoft Learn - Выполните первые шаги с помощью C#',
          url: 'https://docs.microsoft.com/ru-ru/learn/paths/csharp-first-steps/',
          descriptionTemplate: `Интерактивный курс c заданиями (8 модулей)`,
        },
        {
          title: 'Видео-курс - Основы C#',
          url: 'https://www.youtube.com/playlist?list=PLY4rE9dstrJxYPjMqk15Vx5aBmRaHFx_Y',
          descriptionTemplate: `Видео-курс от Loftblog`,
        },
        {
          title: 'Видео-курс по языку программирования C#',
          url: 'https://www.youtube.com/playlist?list=PLL-k0Ff5RfqXGhAooRkUpzMLd6_Fpr13I',
          descriptionTemplate: `Видео-курс от Eugene Popov`,
        },
      ]
    },
    // *************************
    // ======= Git
    // *************************
    {
      id: 'git_basics',
      title: 'Основы системы контроля версий Git',
      description: 'Использование системы контроля версий Git',
      resources: [
        {
          title: 'Tproger - Git и GitHub: что это такое и в чём разница',
          url: 'https://tproger.ru/translations/difference-between-git-and-github/',
          descriptionTemplate: `Статья содержащая вводную по системам контроля версий`,
        },
        {
          title: 'Tproger - Подробное введение в Git',
          url: 'https://tproger.ru/translations/beginner-git-cheatsheet/',
          descriptionTemplate: `Статья по базовой настройке и командам в Git`,
        },
        {
          title: 'Видео-курс - Базовый курс по Git',
          url: 'https://www.youtube.com/playlist?list=PLIU76b8Cjem5B3sufBJ_KFTpKkMEvaTQR',
          descriptionTemplate: `Плейлист с видео уроками по Git`,
        },
        {
          title: 'Git How To на русском',
          url: 'https://githowto.com/ru',
          descriptionTemplate: `Git How To — это интерактивный тур, который познакомит вас с основами Git`,
        },
        {
          title: 'Learn Git Branching [EN]',
          url: 'https://learngitbranching.js.org/',
          descriptionTemplate: `Интерактивный курс по веткам в Git`,
        },
        {
          title: 'Git - учимся работать с правильным workflow',
          url: 'https://monsterlessons.com/project/lessons/git-uchimsya-rabotat-s-pravilnym-workflow',
          descriptionTemplate: `Видео по GitFlow - один из распространенных подходов по веткам используемым в Git при работе в с кодом в компаниях`,
        },
      ]
    },
    // *************************
    // ======= Web and ASP.NET MVC Core
    // *************************
    {
      id: 'web_and_asp_net',
      title: 'Веб, сервер и ASP.NET Core',
      description: 'Как работает веб, что такое сервер и ASP.NET Core',
      resources: [
        {
          title: 'Видео - АйТиБорода - Что такое хостинг, клиент-сервер и где живут сайты',
          url: 'https://www.youtube.com/watch?v=-WR0Cv2mmOg',
          descriptionTemplate: `Вводная о том что такое сервер, клиент и немного больше`,
        },
        {
          title: 'Html Academy - Что на самом деле происходит, когда пользователь вбивает в браузер адрес google.com',
          url: 'https://htmlacademy.ru/blog/education/all/brauzer-google',
          descriptionTemplate: `В статье рассказывается в упрощенной форме, что происходит когда мы вводим URL в браузер и нам отображается страница`,
        },
        {
          title: 'Видео - Lofblog - HTML для начинающих',
          url: 'https://www.youtube.com/playlist?list=PLY4rE9dstrJyeZlPWoKJr1xKVVnG4w-Hc',
          descriptionTemplate: `Видео-курс курс по основам HTML`,
        },
        {
          title: 'Html Academy - Знакомство с HTML и CSS',
          url: 'https://htmlacademy.ru/courses/basic-html-css',
          descriptionTemplate: `Интерактивный курс, часть которого доступна бесплатно`,
        },
        {
          title: 'Видео-курс - Eugene Popov - Курс по ASP.NET Core',
          url: 'https://www.youtube.com/playlist?list=PLL-k0Ff5RfqW8dF5-othi-imF6g48tUj5',
          descriptionTemplate: `Видео-курс по основам в ASP.NET Core. На курсе будет создано приложение с пустого шаблона и автор курса постепенно рассказывает об основных составляющих этого фреймворка`,
        },
      ]
    },
    // *************************
    // ======= Database and Entity Framework Core
    // *************************
    {
      id: 'db_and_ef',
      title: 'Базы данных, SQL и Entity Framework Core (Code First)',
      description: 'Введение с системы управления базами данных, язык SQL и Entity Framework Core (Code First)',
      resources: [
        {
          title: 'Курс - Базы данных',
          url: 'https://stepik.org/course/2614/promo',
          descriptionTemplate: `Интерактивный видео-курс. 22 уроков, 5 часа видео, 100 тестов`,
        },
        {
          title: 'Курс - Введение в базы данных',
          url: 'https://stepik.org/course/1240/promo',
          descriptionTemplate: `Интерактивный видео-курс, затрагивающий ORM. 23 уроков, 7 часа видео, 80 тестов`,
        },
        {
          title: 'Интерактивный тренажер по SQL',
          url: 'https://stepik.org/course/63054/promo',
          descriptionTemplate: `Для закрепления пройденного материала. Интерактивный задачник-тренажер`,
        },
        {
          title: 'Microsoft Docs - Обзор Entity Framework Core',
          url: 'https://docs.microsoft.com/ru-ru/ef/core/',
          descriptionTemplate: `Довольно короткая вводная об Entity Framework, займет 2 минуты на чтение`,
        },
        {
          title: 'Microsoft Docs - Начало работы с EF Core',
          url: 'https://docs.microsoft.com/ru-ru/ef/core/get-started/?tabs=netcore-cli',
          descriptionTemplate: `Две статьи с инструкциями по работе с Entity Framework (руководство и установка), на 10 минут чтения`,
        },
      ]
    },
    // *************************
    // ======= Architecture and Design patterns
    // *************************
    {
      id: 'architecture_patterns',
      title: 'Архитектура и паттерны проектирования',
      description: 'Введение в архитектуру приложения и популярные шаблоны проектирования',
      resources: [
        {
          title: 'Refactoring Guru - Паттерны проектирования',
          url: 'https://refactoring.guru/ru/design-patterns/what-is-pattern',
          descriptionTemplate: `Отличная вводная в шаблоны проектирования. На сайте есть описание каждого шаблона проектирования с примерами кода`,
        },
        {
          title: 'Учебник по SOLID',
          url: 'https://ota-solid.now.sh/',
          descriptionTemplate: `Интерактивная книга по SOLID с задачами для самопроверки`,
        },
        {
          title: 'Microsoft Docs - Общие архитектуры веб-приложений',
          url: 'https://docs.microsoft.com/ru-ru/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures',
          descriptionTemplate: `Введение в архитектуру веб приложений со схемами и структурой кода`,
        },
        {
          title: 'Yandex Zen - Шаблоны архитектуры ПО: Многоуровневая архитектура',
          url: 'https://zen.yandex.ru/media/id/59a3c8f3e86a9e427324fb73/shablony-arhitektury-po-mnogourovnevaia-arhitektura-59e872653dceb74d0aabc0ff',
          descriptionTemplate: `Вводная в N-Layered архитектуру, которая будет применяться для создания тестового ASP.NET MVC Core приложения`,
        },
        {
          title: 'Хабр - IoC, DI, IoC-контейнер — Просто о простом',
          url: 'https://habr.com/ru/post/131993/',
          descriptionTemplate: `Статья дает определение таким терминам как Inversion of Control (IoC), Dependency Injection`,
        },
        {
          title: 'Александр Бындю - Domain-Driven Design: Repository',
          url: 'https://blog.byndyu.ru/2011/01/domain-driven-design-repository.html',
          descriptionTemplate: `Статья дает определение паттерна Repository (который будет использовать в приложении) и автор так же упоминает о проблемах`,
        },
        {
          title: 'Александр Бындю - Проблемный шаблон Repository',
          url: 'https://blog.byndyu.ru/2011/08/repository.html',
          descriptionTemplate: `Чуть больше о проблемах / особенностях паттерна Repository`,
        },
      ]
    },
    // *************************
    // ======= ASP.NET MVC Core Application
    // *************************
    {
      id: 'asp_net_advanced',
      title: 'Создание приложения на ASP.NET Core',
      description: 'На этом этапе предлагаю выбрать тему для приложения и начать ее реализовывать вместе с описанным ниже видео курсом',
      resources: [
        {
          title: '',
          url: '',
          descriptionTemplate: `<div>
            <p>Выберете тему для проекта</p>
            <ul>
              <li>База данных чего-то (фильмов, игр, велосипедов и т.п.)</li>
              <li>Галерея фото / Instagram / Unsplash</li>
              <li>Список заметок / Wiki / Todo список</li>
              <li><a href="https://devchallenges.io/challenges/Bu3G2irnaXmfwQ8sZkw8" target="_blank">Quizz / Опросник</a></li>
              <li>Магазин</li>
              <li>Расписание занятий в комнатах / Бронирование</li>
              <li><a href="https://devchallenges.io/challenges/UgCqszKR7Q7oqb4kRfI0" target="_blank">Чат</a></li>
              <li><a href="https://devchallenges.io/challenges/5ZnOYsSXM24JWnCsNFlt" target="_blank">Portfolio</a></li>
            </ul>
          </div>`,
        },
        {
          title: 'Видео-курс - Loftblog - Веб-приложения на asp.net mvc core',
          url: 'https://www.youtube.com/playlist?list=PLY4rE9dstrJwbcnUjiL7FKd1D4CRLIMCg',
          descriptionTemplate: `Хороший видео-курс на основе которого можно написать свое приложение`,
        },
      ]
    },
    // *************************
    // ======= Tests and code quality
    // *************************
    {
      id: 'tests',
      title: 'Unit-тесты и статические анализаторы кода',
      description: 'Тестирование кода, сканирование кода на соответствие стандартам',
      resources: [
        {
          title: 'TODO',
          url: '#',
          descriptionTemplate: `TODO`,
        },
        {
          title: '',
          url: '',
          descriptionTemplate: ``,
        },
      ]
    },
    // *************************
    // ======= Algorithms
    // *************************
    {
      id: 'algorithms',
      title: 'Алгоритмы и структуры данных',
      description: 'Источники для самостоятельного изучения алрогитмов и структур данных',
      resources: [
        {
          title: 'TODO',
          url: '#',
          descriptionTemplate: `TODO`,
        },
        {
          title: '',
          url: '',
          descriptionTemplate: ``,
        },
      ]
    },
    // *************************
    // ======= Algorithms
    // *************************
    {
      id: 'devops',
      title: '',
      description: '',
      resources: [
        {
          title: '',
          url: '',
          descriptionTemplate: ``,
        },
        {
          title: '',
          url: '',
          descriptionTemplate: ``,
        },
      ]
    },
    // *************************
    // ======= YouTube Channels
    // *************************
    {
      id: 'youtube_channels',
      title: '',
      description: '',
      resources: [
        {
          title: '',
          url: '',
          descriptionTemplate: ``,
        },
        {
          title: '',
          url: '',
          descriptionTemplate: ``,
        },
      ]
    },
  ];

  function getTopics() {
    return TOPICS;
  }

  window.data = window.data || {};
  window.data.getTopics = getTopics;
})();

