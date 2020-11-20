(function () {
    var QUESTIONS_GROUPS = [
        // *************************
        // ======= General
        // *************************
        {
            id: 'general',
            title: 'Общие вопросы',
            questions: [
                {
                    title: 'Что такое ООП?',
                    links: [
                        {
                            title: 'Статья - Хабр - ООП с примерами (часть 2)',
                            url: 'https://habr.com/ru/post/87205/',
                        }
                    ]
                },
                {
                    title: 'Опиши своими словами работу интернет запроса от браузера до сервера',
                    links: [
                        {
                            title: 'Статья - Html Academy - Что на самом деле происходит, когда пользователь вбивает в браузер адрес google.com',
                            url: 'https://htmlacademy.ru/blog/education/all/brauzer-google',
                        },
                        {
                            title: 'Статья - MDN - Клиент - сервер',
                            url: 'https://developer.mozilla.org/ru/docs/Learn/Server-side/First_steps/Client-Server_overview'
                        },
                        {
                            title: 'Статья - VC - Что происходит, когда пользователь набирает в браузере адрес сайта',
                            url: 'https://vc.ru/selectel/76371-chto-proishodit-kogda-polzovatel-nabiraet-v-brauzere-adres-sayta'
                        }
                    ]
                },
                {
                    title: 'Чем отличаются компилируемые языки программирования от интерпретируемых?',
                    links: [
                        {
                            title: 'Статья - TProger - Основные принципы программирования: компилируемые и интерпретируемые языки',
                            url: 'https://tproger.ru/translations/programming-concepts-compilation-vs-interpretation/',
                        }
                    ]
                },
                {
                    title: 'Что такое рекурсия или напишите функцию вычисляющую числа Фиббоначчи с использование рекурсии?',
                    links: [
                        {
                            title: 'Статья - Metanit - C# Рекурсивные функции',
                            url: 'https://metanit.com/sharp/tutorial/2.11.php',
                        }
                    ]
                },
                {
                    title: 'Напишите решение задачи FizzBuzz',
                    links: [
                        {
                            title: 'Видео - Soer - FizzBuzz четыре варианта решения на JS',
                            url: 'https://www.youtube.com/watch?v=TWmmfDvcYO0',
                        }
                    ]
                }
            ]
        },
        // *************************
        // ======= Git
        // *************************
        {
            id: 'git',
            title: 'Вопросы по Git',
            questions: [
                {
                    title: 'Что такое система контроля версий?',
                    links: [
                        {
                            title: 'Статья - TProger - Git и GitHub: что это такое и в чём разница',
                            url: 'https://tproger.ru/translations/difference-between-git-and-github/',
                        }
                    ]
                },
                {
                    title: 'Что такое GitFlow?',
                    links: [
                        {
                            title: 'Статья - Bitworks - Модель ветвления Gitflow',
                            url: 'https://bitworks.software/2019-03-12-gitflow-workflow.html',
                        }
                    ]
                }
                
            ]
        },
        // *************************
        // ======= .NET
        // *************************
        {
            id: 'dot_net',
            title: 'Вопросы по .NET',
            questions: [
                {
                    title: 'Что такое .Net Framework?',
                    links: [
                        {
                            title: 'Видео - Все о Net Framework - Что такое .Net Framework?',
                            url: 'https://www.youtube.com/watch?v=WMu5hDA7MTE',
                        },
                    ]
                },
                {
                    title: 'Из чего состоит .Net Framework (IL, CIL, MSIL, CLI и JIT)?',
                    links: [
                        {
                            title: 'Статья - Best - Базовые понятия в .NET',
                            url: 'https://www.bestprog.net/ru/2016/12/20/%D0%B1%D0%B0%D0%B7%D0%BE%D0%B2%D1%8B%D0%B5-%D0%BF%D0%BE%D0%BD%D1%8F%D1%82%D0%B8%D1%8F-%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D0%B8-net-framework/',
                        }
                    ]
                },
                {
                    title: 'Что такое сборка (assembly)?',
                    links: [
                        {
                            title: 'Статья - Metanit - Роль сборок в приложениях .NET',
                            url: 'https://metanit.com/sharp/tutorial/10.1.php',
                        }
                    ]
                },
                {
                    title: 'Какие бывают сборки по типу развертывания (local, GAC)?',
                    links: [

                    ],
                    draft: true
                },
                {
                    title: 'Что такое домен приложения и процесс в среде .NET?',
                    links: [
                        {
                            title: 'Статья - Professor Web - Домены приложений .NET',
                            url: 'https://professorweb.ru/my/csharp/assembly/level3/3_4.php',
                        },
                        {
                            title: 'Статья - Metanit - C# Процессы и домены приложения',
                            url: 'https://metanit.com/sharp/tutorial/18.1.php'
                        }
                    ]
                },
                {
                    title: 'Чем отличается управляемым и неуправляемым код и что это?',
                    links: [
                        {
                            title: 'Статья - Microsoft Docs - Что такое управляемый код',
                            url: 'https://docs.microsoft.com/ru-ru/dotnet/standard/managed-code',
                        }
                    ]
                },
                
            ]
        },
        // *************************
        // ======= C#
        // *************************
        {
            id: 'csharp',
            title: 'Вопросы по языку C#',
            questions: [
                {
                    title: 'Что такое Heap и Stack?',
                    links: [
                        {
                            title: 'Статья - TProger - Основные принципы программирования: стек и куча',
                            url: 'https://tproger.ru/translations/programming-concepts-stack-and-heap/',
                        },
                        {
                            title: 'Статья - ITVDN - Stack / Heap структуры данных в .NET',
                            url: 'https://itvdn.com/ru/blog/article/stack-and-heap'
                        }
                    ]
                },
                {
                    title: 'Какие отличие между значимыми и ссылочными типами?',
                    links: [
                        {
                            title: 'Статья - Metanit - Типы значений и ссылочные типы',
                            url: 'https://metanit.com/sharp/tutorial/2.16.php',
                        }
                    ]
                },
                {
                    title: 'Расскажи, что такое boxing и unboxing в C#',
                    links: [
                        {
                            title: 'Статья - Хабр - Интересные моменты в C# (boxing unboxing)',
                            url: 'https://habr.com/ru/post/239219/',
                        }
                    ]
                },
                {
                    title: 'Расскажи о garbage collector-е',
                    links: [
                        {
                            title: 'Статья - Metanit - Сборка мусора, управление памятью и указатели',
                            url: 'https://metanit.com/sharp/tutorial/8.1.php',
                        }
                    ]
                },
                {
                    title: 'Как и зачем использовать конструкцию using?',
                    links: [
                        {
                            title: 'Как и зачем использовать конструкцию using?',
                            url: 'http://www.quizful.net/interview/csharp/using-keyword#:~:text=%D0%9A%D0%B0%D0%BA%20%D0%B8%20%D0%B7%D0%B0%D1%87%D0%B5%D0%BC%20%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BA%D0%BE%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D0%B8%D1%8E,%D0%BE%D1%81%D0%B2%D0%BE%D0%B1%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%80%D0%B5%D1%81%D1%83%D1%80%D1%81%D0%BE%D0%B2%2C%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%B5%20%D0%B7%D0%B0%D1%85%D0%B2%D0%B0%D1%82%D0%B8%D0%BB%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82.',
                        }
                    ]
                },
                {
                    title: 'В чем отличие использования Finalize и Dispose?',
                    links: [
                        {
                            title: 'Статья - Metanit - Финализируемые объекты',
                            url: 'https://metanit.com/sharp/tutorial/8.2.php',
                        },
                        {
                            title: 'Ответ - Stackoverflow - тут',
                            url: 'https://ru.stackoverflow.com/questions/500438/%D0%A0%D0%B0%D0%B7%D0%BB%D0%B8%D1%87%D0%B8%D0%B5-dispose-finalize-%D0%94%D0%B5%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%B8-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%B0-gc#:~:text=%D0%A0%D0%B0%D0%B7%D0%BD%D0%B8%D1%86%D0%B0%20%D0%B2%20%D1%82%D0%BE%D0%BC%2C%20%D1%87%D1%82%D0%BE%20%D0%B2%D1%80%D0%B5%D0%BC%D1%8F,Finalize%20%D0%B2%D1%8B%D0%BF%D0%BE%D0%BB%D0%BD%D1%8F%D0%B5%D1%82%D1%81%D1%8F%20%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%20%D1%83%D0%BD%D0%B8%D1%87%D1%82%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%B0.'
                        }
                    ]
                },
                {
                    title: 'В чем отличие между классом и объектом?',
                    links: [
                        {
                            title: 'Статья - Metanit - C# Классы и объекты',
                            url: 'https://metanit.com/sharp/tutorial/3.1.php',
                        }
                    ]
                },
                {
                    title: 'Чем отличается readonly, static и const?',
                    links: [
                        {
                            title: 'Статья - Dev Nuances - Разница между константами и полями только для чтения в C#',
                            url: 'http://devnuances.com/c_sharp/raznitsa-mezhdu-konstantami-i-polyami-tolko-dlya-chteniya-v-c_sharp/',
                        }
                    ]
                },
                {
                    title: 'Чем отличается interface от abstract class?',
                    links: [
                        {
                            title: 'Статья - Metanit - Интерфейсы или абстрактные классы',
                            url: 'https://metanit.com/sharp/patterns/1.3.php',
                        },
                        {
                            title: 'Видео - ExtremeCode - C# — Абстрактный класс vs Интерфейс',
                            url: 'https://www.youtube.com/watch?v=Y7V4bK0eHaA'
                        }
                    ]
                },
                {
                    title: 'Можно ли указать модификатор доступа к методам и свойствам интерфейса?',
                    links: [

                    ],
                    draft: true
                },
                {
                    title: 'Расскажите, как работает try, catch, finally? Когда вызывается каждый?',
                    links: [
                        {
                            title: 'Статья - Вопросы на собеседовании C#',
                            url: 'https://bool.dev/blog/detail/voprosy-na-sobesedovanii-po-c',
                        }
                    ]
                },
                {
                    title: 'Что такое LINQ?',
                    links: [
                        {
                            title: 'Статья - Metanit - Основы LINQ',
                            url: 'https://metanit.com/sharp/tutorial/15.1.php',
                        }
                    ]
                },
                {
                    title: 'Чем отличается IEnumerable и IQueryable? (LINQ)',
                    links: [
                        {
                            title: 'Статья - Metanit - IEnumerable и IQueryable в Entity Framework',
                            url: 'https://metanit.com/sharp/entityframework/1.4.php',
                        }
                    ]
                },
                {
                    title: 'Что такое делегат и что такое события и связаны ли они?',
                    links: [
                        {
                            title: 'Статья - Metanit - Делегаты',
                            url: 'https://metanit.com/sharp/tutorial/3.13.php',
                        },
                        {
                            title: 'Статья - Metanit - События',
                            url: 'https://metanit.com/sharp/tutorial/3.14.php'
                        },
                        {
                            title: 'Статья - Вопросы на собеседовании C#',
                            url: 'https://bool.dev/blog/detail/voprosy-na-sobesedovanii-po-c'
                        }
                    ]
                },
                {
                    title: 'Чем отличается поток и процесс?',
                    links: [
                        {
                            title: 'Статья - TProger - В чем разница между потоком и процессом?',
                            url: 'https://tproger.ru/problems/what-is-the-difference-between-threads-and-processes/',
                        }
                    ]
                },
                {
                    title: 'Чем многопоточное программирование отличается от асинхронного?',
                    links: [
                        {
                            title: 'Статья - Хабр - Параллелизм против многопоточности против асинхронного программирования: разъяснение',
                            url: 'https://habr.com/ru/post/337528/',
                        },
                        {
                            title: 'Статья - В чем разница между асинхронным программированием и многопоточностью?',
                            url: 'https://overcoder.net/q/21072/%D0%B2-%D1%87%D0%B5%D0%BC-%D1%80%D0%B0%D0%B7%D0%BD%D0%B8%D1%86%D0%B0-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-%D0%B0%D1%81%D0%B8%D0%BD%D1%85%D1%80%D0%BE%D0%BD%D0%BD%D1%8B%D0%BC-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%D0%BC-%D0%B8-%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE%D0%BF%D0%BE%D1%82%D0%BE%D1%87%D0%BD%D0%BE%D1%81%D1%82%D1%8C%D1%8E'
                        },
                        {
                            title: 'Видео - Диджитализируй! - Многопроцессность, многопоточность, асинхронность в Python и не только. Что это и как работает?',
                            url: 'https://www.youtube.com/watch?v=JIp14T9bvvc'
                        }
                    ]
                },
                {
                    title: 'Что такое async и await?',
                    links: [
                        {
                            title: 'Статья - Metanit - Асинхронные методы, async, await',
                            url: 'https://metanit.com/sharp/questions/3.1.php',
                        }
                    ]
                },
                {
                    title: 'Что такое методы расширения и для чего они нужны?',
                    links: [
                        {
                            title: '',
                            url: '',
                        }
                    ]
                },
                {
                    title: 'Когда вызывается статический конструктор объекта?',
                    links: [
                        {
                            title: '',
                            url: '',
                        }
                    ]
                },
                {
                    title: 'В чем отличие класса string от класса StringBuilder?',
                    links: [
                        {
                            title: '',
                            url: '',
                        }
                    ]
                },
                {
                    title: 'Возможно ли множественное наследование в C#?',
                    links: [
                        {
                            title: '',
                            url: '',
                        }
                    ]
                }
            ]
        },
        
        // *************************
        // ======= ASP.NET MVC / MVC Core
        // *************************
        {
            id: 'asp_net_mvc',
            title: 'Вопросы по ASP.NET MVC / MVC Core',
            questions: [
                {
                    title: 'Опишите жизненный цикл запроса в ASP.NET MVC',
                    links: [
                        {
                            title: 'Статья - D2FunLife - ASP.NET MVC жизненный цикл запроса',
                            url: 'https://d2funlife.com/asp-net-mvc-request-life-cycle',
                        }
                    ]
                },
                {
                    title: 'Что в ASP.NET MVC можно использовать для хранения/передачи информации и их отличия? (cookie, session и т.п.)',
                    links: [
                        {
                            title: 'Статья - Metanit - Передача данных в представление',
                            url: 'https://metanit.com/sharp/aspnet5/7.3.php',
                        },
                        {
                            title: 'Статья - DotNetTrick - Data Passing Techniques in ASP.NET Core',
                            url: 'https://www.dotnettricks.com/learn/aspnetcore/viewdata-vs-viewbag-vs-tempdata-vs-session-vs-cookies'
                        }
                    ]
                },
                {
                    title: 'Что такое SOAP?',
                    links: [
                        {
                            title: 'Статья - Хибр - Различия REST и SOAP',
                            url: 'https://habr.com/ru/post/483204/',
                        },
                        {
                            title: 'Статья - Intervolga - Рельсы веб-интеграции. REST и SOAP',
                            url: 'https://www.intervolga.ru/blog/projects/relsy-veb-integratsii-rest-i-soap/'
                        }
                    ]
                },
                {
                    title: 'Что такое REST?',
                    links: [
                        {
                            title: 'Статья - Medium - REST: простым языком',
                            url: 'https://medium.com/@andr.ivas12/rest-%D0%BF%D1%80%D0%BE%D1%81%D1%82%D1%8B%D0%BC-%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%BC-90a0bca0bc78',
                        },
                        {
                            title: 'Статья - Хабр - Введение в REST API — RESTful веб-сервисы',
                            url: 'https://habr.com/ru/post/483202/'
                        }
                    ]
                },
                {
                    title: 'Что такое идемпотентность и как связано с REST?',
                    links: [
                        {
                            title: 'Статья - MDN - Идемпотентный метод',
                            url: 'https://developer.mozilla.org/ru/docs/%D0%A1%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/Idempotent',
                        }
                    ]
                },
                {
                    title: 'Что такое HttpFilter, HttpHanlder? Как они используются? Когда отрабатывают?',
                    links: [
                    ],
                    draft: true
                },
                {
                    title: 'Что такое ModelBinder? Как он работает? Можно ли переопределить его поведение?',
                    links: [
                    ],
                    draft: true
                },
                {
                    title: 'Как работают маршруты (route) в ASP.NET MVC?',
                    links: [
                    ],
                    draft: true
                },
                {
                    title: 'Что такое Middleware в ASP.NET MVC Core?',
                    links: [
                    ],
                    draft: true
                }
            ]
        },
        // *************************
        // ======= JavaScript
        // *************************
        {
            id: 'javascript',
            title: 'Вопросы по JavaScript',
            questions: [
                {
                    title: 'JavaScript однопоточный язык?',
                    links: [
                        {
                            title: 'Форум - Почему javascript не многопоточный?',
                            url: 'https://forum.vingrad.ru/forum/topic-250616/0.html',
                        }
                    ],
                    hint: `JavaScript сам по себе не является ни однопоточным, ни много поточным.
                    Все зависит от реализации.
                    Браузерная реализация JavaScript, действительно, является однопоточной.
                    Но, например, реализация, на платформе Mozilla Rhino позволяет создавать многопоточность, использую стандартную работу с потоками в JVM.`
                },
                {
                    title: 'Что значит hoisting?',
                    links: [
                        {
                            title: 'Статья - MDN - Поднятие',
                            url: 'https://developer.mozilla.org/ru/docs/%D0%A1%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%9F%D0%BE%D0%B4%D0%BD%D1%8F%D1%82%D0%B8%D0%B5',
                        },
                        {
                            title: 'Статья - Frontend Stuff - Поднятие или hoisting в JavaScript',
                            url: 'https://frontend-stuff.com/blog/hoisting/'
                        },
                        {
                            title: 'Статья - Medium - Разбираемся с “поднятием” (hoisting) в JavaScript',
                            url: 'https://medium.com/@stasonmars/%D1%80%D0%B0%D0%B7%D0%B1%D0%B8%D1%80%D0%B0%D0%B5%D0%BC%D1%81%D1%8F-%D1%81-%D0%BF%D0%BE%D0%B4%D0%BD%D1%8F%D1%82%D0%B8%D0%B5%D0%BC-hoisting-%D0%B2-javascript-7d2d27bc51f1#:~:text=%D0%9F%D0%BE%D0%B4%D0%BD%D1%8F%D1%82%D0%B8%D0%B5%20%D0%B8%D0%BB%D0%B8%20hoisting%20%E2%80%94%20%D1%8D%D1%82%D0%BE%20%D0%BC%D0%B5%D1%85%D0%B0%D0%BD%D0%B8%D0%B7%D0%BC,%D1%82%D0%B5%D0%BC%2C%20%D0%BA%D0%B0%D0%BA%20%D0%BA%D0%BE%D0%B4%20%D0%B1%D1%83%D0%B4%D0%B5%D1%82%20%D0%B2%D1%8B%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD.&text=%D0%A1%D1%82%D0%BE%D0%B8%D1%82%20%D0%BE%D1%82%D0%BC%D0%B5%D1%82%D0%B8%D1%82%D1%8C%20%D1%82%D0%BE%2C%20%D1%87%D1%82%D0%BE%20%D0%BC%D0%B5%D1%85%D0%B0%D0%BD%D0%B8%D0%B7%D0%BC,%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%BC%20%D0%BE%D1%81%D1%82%D0%B0%D1%8E%D1%82%D1%81%D1%8F%20%D0%BD%D0%B0%20%D1%81%D0%B2%D0%BE%D0%B8%D1%85%20%D0%BC%D0%B5%D1%81%D1%82%D0%B0%D1%85.'
                        }
                    ]
                },
                {
                    title: 'Что такое замыкание?',
                    links: [
                        {
                            title: 'Статья - Fontend Stuff - Введение в замыкание',
                            url: 'https://frontend-stuff.com/blog/closures/',
                        },
                        {
                            title: 'Статья - MDN - Замыкания',
                            url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures'
                        },
                        {
                            title: 'Статья - Medium - Осваиваем замыкания',
                            url: 'https://medium.com/@sshambir/%D0%BE%D1%81%D0%B2%D0%B0%D0%B8%D0%B2%D0%B0%D0%B5%D0%BC-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-5b83267ef7d1#:~:text=%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5%20%D1%81%20MDN%3A-,%D0%97%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F%20%E2%80%94%20%D1%8D%D1%82%D0%BE%20%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8%2C%20%D1%81%D1%81%D1%8B%D0%BB%D0%B0%D1%8E%D1%89%D0%B8%D0%B5%D1%81%D1%8F%20%D0%BD%D0%B0%20%D0%BD%D0%B5%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D1%8B%D0%B5%20(%D1%81%D0%B2%D0%BE%D0%B1%D0%BE%D0%B4%D0%BD%D1%8B%D0%B5)%20%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5,%D0%9F%D0%BE%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B8%D0%BC%20%D0%BD%D0%B0%20%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80.'
                        }
                    ]
                },
                {
                    title: 'Что такое this?',
                    links: [
                        {
                            title: 'Статья - Хабр - Ключевое слово this в JavaScript для начинающих',
                            url: 'https://habr.com/ru/company/ruvds/blog/419371/#:~:text=This%20%E2%80%94%20%D1%8D%D1%82%D0%BE%20%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B2%D0%BE%D0%B5%20%D1%81%D0%BB%D0%BE%D0%B2%D0%BE%2C%20%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B5%D0%BC%D0%BE%D0%B5,%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%B0%20%D0%B2%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BE%D0%BC%20%D0%BE%D0%BD%D0%BE%20%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D0%BD%D1%8F%D0%B5%D1%82%D1%81%D1%8F.&text=%D0%9F%D0%BE%20%D0%B5%D0%B3%D0%BE%20%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D0%BC%2C%20%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BA%D1%81%D1%82%20%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0,%D0%BA%D0%BE%D0%B4%D0%BE%D0%BC%2C%20%D0%B2%D1%8B%D0%BF%D0%BE%D0%BB%D0%BD%D1%8F%D0%B5%D0%BC%D1%8B%D0%BC%20%D0%B2%20%D1%82%D0%B5%D0%BA%D1%83%D1%89%D0%B8%D0%B9%20%D0%BC%D0%BE%D0%BC%D0%B5%D0%BD%D1%82.',
                        }
                    ]
                },
                {
                    title: 'Что такое прототип?',
                    links: [
                        {
                            title: 'Статья - MDN - Прототипы объектов',
                            url: 'https://developer.mozilla.org/ru/docs/Learn/JavaScript/%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B/Object_prototypes#:~:text=JavaScript%20%D1%87%D0%B0%D1%81%D1%82%D0%BE%20%D0%BE%D0%BF%D0%B8%D1%81%D1%8B%D0%B2%D0%B0%D1%8E%D1%82%20%D0%BA%D0%B0%D0%BA%20%D1%8F%D0%B7%D1%8B%D0%BA,%D0%B8%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D1%8B%20%D0%B8%20%D1%82%D0%B0%D0%BA%20%D0%B4%D0%B0%D0%BB%D0%B5%D0%B5.',
                        },
                        {
                            title: 'Видео - Владилен Минин - Что такое прототип?',
                            url: 'https://www.youtube.com/watch?v=aQkgUUmUJy4'
                        },
                        {
                            title: 'Видео - IT-KAMASUTRA - prototype и __proto__ / JavaScript для собеседований',
                            url: 'https://www.youtube.com/watch?v=b55hiUlhAzI'
                        }
                    ]
                },
                {
                    title: 'JavaScript объектно ориентированный язык?',
                    links: [
                        {
                            title: 'Статья - TProger - Фундаментальные принципы объектно-ориентированного программирования на JavaScript',
                            url: 'https://tproger.ru/translations/oop-js-fundamentals/',
                        },
                        {
                            title: 'Статья - MDN - Вступление в Объектно-ориентированный JavaScript',
                            url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript'
                        }
                    ]
                },
                {
                    title: 'Что такое Immediately Invoked Function?',
                    links: [
                        {
                            title: 'Статья - MDN - IIFE',
                            url: 'https://developer.mozilla.org/ru/docs/%D0%A1%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/IIFE',
                        }
                    ]
                }
            ]
        },
        // *************************
        // ======= Database and SQL
        // *************************
        {
            id: 'databases',
            title: 'Вопросы по SQL и БД',
            questions: [
                {
                    title: 'Типы БД (обычно реляционные/нереляционные, различия между ними)',
                    links: [
                    ],
                    draft: true
                },
                {
                    title: 'SQL vs NoSql vs NewSql',
                    links: [
                    ],
                    draft: true
                },
                {
                    title: 'Какие бывают объекты в БД? Что такое триггер?',
                    links: [
                    ],
                    draft: true
                },
                {
                    title: 'Что такое индексы? Зачем нужны индексы?',
                    links: [
                    ],
                    draft: true
                },
                {
                    title: 'Что такое первичный/внешний ключи? Зачем нужны?',
                    links: [
                    ],
                    draft: true
                },
                {
                    title: 'Хранимые процедуры/функции в чём разница?',
                    links: [
                    ],
                    draft: true
                },
                {
                    title: 'Что такое план оптимизации?',
                    links: [
                    ],
                    draft: true
                },
                {
                    title: 'Что такое Join, зачем нужен, какие типы бывают и в чём разница между ними?',
                    links: [
                    ],
                    draft: true
                },
                {
                    title: 'Что такое view в SQL БД? Зачем нужны, чем отличаются от таблиц?',
                    links: [
                    ],
                    draft: true
                }
            ]
        },
        // *************************
        // ======= Advanced
        // *************************
        {
            id: 'advanced',
            title: 'Вопросы паттернам и архитектуре',
            questions: [
                {
                    title: 'Что такое IoC(Inversion of Control/инверсия управления) и для чего она нужна?',
                    links: [
                        {
                            title: 'Статья - Medium - DI (inversion) vs DI(injection) vs IOC vs DI/IOC containers',
                            url: 'https://medium.com/@pkolmakov/di-inversoin-vs-di-injection-vs-ioc-vs-di-ioc-containers-83e925515ec',
                        },
                        {
                            title: 'Статья - Shwanoff - Инверсия управления и Внедрение зависимостей (IoС & DI)',
                            url: 'https://shwanoff.ru/ioc-and-di/'
                        },
                        {
                            title: 'Статья - Хабр - IoC, DI, IoC-контейнер — Просто о простом',
                            url: 'https://habr.com/ru/post/131993/'
                        },
                        {
                            title: 'Статья - Sergey Teplyakov -  DI vs. DIP vs. IoC',
                            url: 'http://sergeyteplyakov.blogspot.com/2014/11/di-vs-dip-vs-ioc.html'
                        },
                        {
                            title: 'Статья - Alex Kosarev - Инверсия управления: внедрение и поиск зависимостей',
                            url: 'https://alexkosarev.name/2019/06/20/ioc-di-and-dl/'
                        }
                    ]
                },
                {
                    title: 'Что такое DI(Dependency Injection)?',
                    links: [
                        {
                            title: 'Видео - DevShacht - Dependency Injection простыми словами (не C#)',
                            url: 'https://www.youtube.com/watch?v=u6gAVCEJjQ4',
                        }
                    ]
                },
                {
                    title: 'Какие паттерны знаешь и какие применял?',
                    links: [
                        {
                            title: 'Русский сайт по паттернам проектирования с примерами',
                            url: 'https://refactoring.guru/ru/design-patterns',
                        }
                    ]
                },
                {
                    title: 'Что вы знаете о SOLID?',
                    links: [
                        {
                            title: 'Видео - Sergey Nemchinskiy - SOLID',
                            url: 'https://www.youtube.com/watch?v=O4uhPCEDzSo&list=PLmqFxxywkatQNWLG1IZYUhKoQrnuZHqaK',
                        },
                        {
                            title: 'Видео - webDev - Просто о SOLID',
                            url: 'https://www.youtube.com/watch?v=A6wEkG4B38E'
                        },
                        {
                            title: 'Книга с задачами по SOLID',
                            url: 'https://ota-solid.now.sh/'
                        },
                        {
                            title: 'Статья - Sergey Teplyakov - Цикл статей о SOLID принципах',
                            url: 'http://sergeyteplyakov.blogspot.com/2014/09/the-dependency-inversion-principle.html'
                        }
                    ]
                },
                {
                    title: 'Что знаете про паттерн - Выбор лидера?',
                    links: [
                        {
                            title: 'Шаблон выбора лидера',
                            url: 'https://docs.microsoft.com/ru-ru/azure/architecture/patterns/leader-election',
                        }
                    ]
                },
                {
                    title: 'Что знаете про Service Mesh',
                    links: [
                    ],
                    draft: true
                }
            ]
        },
    ];

    function getQuestionsGroups() {
        return QUESTIONS_GROUPS;
    }

    window.data = window.data || {};
    window.data.getQuestionsGroups = getQuestionsGroups;
})();