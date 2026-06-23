# Freelancer Web Toolbox

Offline web toolbox for freelancers, developers, CRM integrators and small business automation.

Author: Beck Sarbassov  
Date created: 2026-06-16  
Last updated: 2026-06-23  
Copyright: © Beck Sarbassov. All rights reserved.

## Short Description

Freelancer Web Toolbox is a lightweight browser-based toolkit for everyday freelance, web development, CRM, marketing, SEO, text, business, and security tasks. It runs without backend, database, accounts, API keys, paid services, installation, analytics, or external CDN dependencies.

Open the app directly:

```text
public/index.html
```

Or run it through a local static server:

```bash
python -m http.server 8000 -d public
```

## Why This Project Exists

Freelancers and small teams often need quick utility tools while preparing client work: formatting JSON, creating campaign links, generating WhatsApp or Telegram links, estimating project pricing, drafting invoice text, and preparing SEO metadata. Many online tools require internet access, include tracking, or send user input to a remote service. This project keeps those daily tasks local and transparent.

## Who This Project Is For

- Freelancers and indie makers
- Web developers and frontend developers
- CRM integrators and automation consultants
- Digital marketers and SMM specialists
- Small business owners and technical assistants
- Open-source contributors who want a clean static utility project

## Main Features

- Fully static HTML/CSS/Vanilla JavaScript app.
- Works through `file://` by opening `public/index.html`.
- Works with GitHub Pages and common static hosting.
- Supports English, Russian, and Kazakh UI.
- Saves selected language in LocalStorage.
- Includes searchable tool dashboard and category filters.
- Provides copyable outputs for generated results.
- Includes a LocalStorage saved results panel.
- Uses safe text rendering for user-entered data.

## Included Tools

- JSON Formatter and Validator
- Base64 Encoder / Decoder
- URL Encoder / Decoder
- UTM Link Builder
- WhatsApp Link Generator
- Telegram Link Generator
- Password Generator
- Slug Generator RU/KZ/EN to Latin
- Meta Title and Description Preview
- Robots.txt Generator
- Sitemap.xml Starter Generator
- Webhook Payload Viewer
- KZT Commission Calculator
- Freelance Project Price Estimator
- Invoice Text Generator
- HTML Minifier
- CSS Minifier

## Quick Start

1. Clone the repository.
2. Open `public/index.html` in a browser.
3. Choose a language: English, Русский, or Қазақша.
4. Search or filter a tool.
5. Generate output, copy it, or save it locally in the browser.

## How to Use Locally

Direct file opening:

```text
public/index.html
```

Local server:

```bash
python -m http.server 8000 -d public
```

Then open:

```text
http://localhost:8000
```

Validation:

```bash
node scripts/validate.mjs
```

## How to Deploy on GitHub Pages

1. Push the repository to GitHub.
2. Open repository settings.
3. Go to Pages.
4. Select the `main` branch.
5. Choose `/root` or publish from `/public` depending on your GitHub Pages setup.
6. If publishing from `/root`, the root `index.html` redirects visitors to `public/index.html`.

This repository does not include an automatic deployment workflow.

## Project Structure

```text
Freelancer-Web-Toolbox/
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── .gitignore
├── .env.example
├── index.html
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   └── assets/
│       ├── css/app.css
│       ├── js/
│       │   ├── translations.js
│       │   ├── i18n.js
│       │   ├── storage.js
│       │   ├── security.js
│       │   ├── app.js
│       │   └── tools/
│       └── img/preview.svg
├── docs/
├── examples/
├── ai/
└── scripts/validate.mjs
```

## Multilingual Support

The web app UI supports:

- English
- Русский
- Қазақша

The language switcher saves the selected language in LocalStorage and reloads the saved preference on the next visit. Translations are stored in `public/assets/js/translations.js` as a JavaScript object, not fetched from external files, so the app works through `file://`.

## Security and Privacy Notes

- No backend.
- No database.
- No login or admin panel.
- No analytics.
- No tracking scripts.
- No external API keys.
- No user input is sent anywhere.
- User input is shown through textarea controls or safe text rendering.
- Do not paste or save private secrets, tokens, production passwords, real payment details, or confidential customer data.

There is no admin panel in this project, so default administrator credentials are not used.

## LocalStorage Explanation

LocalStorage is used only for:

- selected UI language;
- saved generated results;
- lightweight local app preferences.

LocalStorage stays in the user's browser. It is not encrypted storage and should not be treated as a secret vault.

## Backend, Frontend, API, and Data Notes

- Backend: none.
- Frontend: static HTML5, CSS3, Vanilla JavaScript.
- API: none.
- Database: none.
- Data storage: browser LocalStorage only.
- Forms and email sending: none.
- Authentication: none.

## Deployment Notes

The project can be deployed to GitHub Pages, static hosting, shared hosting, VPS, Plesk, or any web server that serves static files. Use relative paths only, and keep `public/index.html` as the main app entry.

## Roadmap

- v0.1.0 - Initial offline toolbox
- v0.2.0 - More CRM and marketing tools
- v0.3.0 - Export saved results as Markdown
- v0.4.0 - Optional PWA enhancements
- v0.5.0 - More localization improvements
- v1.0.0 - Stable release

## Contributing

See `CONTRIBUTING.md`. Useful contributions include new tools, translation improvements, documentation updates, accessibility checks, and security reviews.

## License

MIT License. See `LICENSE`.

## Suggested GitHub Repository Description

```text
Offline web toolbox for freelancers, developers, CRM integrators and small business automation.
```

## Suggested GitHub Topics

```text
freelancer-tools
web-toolbox
developer-tools
crm
javascript
html
css
offline-app
pwa
utm-builder
whatsapp-link
slug-generator
json-formatter
kzt
open-source
```

---

# Freelancer Web Toolbox / Веб-инструменты для фрилансера

Офлайн-набор веб-инструментов для фрилансеров, разработчиков, CRM-интеграторов и автоматизации малого бизнеса.

Автор: Beck Sarbassov  
Дата создания: 2026-06-16  
Последнее обновление: 2026-06-23  
Авторские права: © Beck Sarbassov. Все права защищены.

## Краткое описание

Freelancer Web Toolbox — лёгкое браузерное приложение для ежедневных задач фрилансера, веб-разработчика, CRM-интегратора, маркетолога и специалиста по автоматизации. Оно работает без бэкенда, базы данных, аккаунтов, API-ключей, платных сервисов, установки, аналитики и внешних CDN.

Откройте приложение напрямую:

```text
public/index.html
```

Или запустите локальный сервер:

```bash
python -m http.server 8000 -d public
```

## Зачем нужен проект

В работе с клиентами часто нужны быстрые утилиты: форматирование JSON, генерация UTM-ссылок, создание WhatsApp и Telegram ссылок, расчёт стоимости проекта, подготовка текста счёта и SEO-метаданных. Многие онлайн-сервисы требуют интернет, содержат трекинг или отправляют ввод на сервер. Этот проект оставляет данные локально в браузере.

## Для кого проект

- Фрилансеры и indie makers
- Веб-разработчики и frontend-разработчики
- CRM-интеграторы и консультанты по автоматизации
- Digital-маркетологи и SMM-специалисты
- Владельцы малого бизнеса и технические ассистенты
- Контрибьюторы open-source проектов

## Основные возможности

- Полностью статическое приложение на HTML/CSS/Vanilla JavaScript.
- Работает через `file://` при открытии `public/index.html`.
- Совместимо с GitHub Pages и статическим хостингом.
- Интерфейс поддерживает English, Русский и Қазақша.
- Выбранный язык сохраняется в LocalStorage.
- Есть поиск инструментов и фильтр по категориям.
- Все результаты можно копировать.
- Есть панель сохранённых результатов в LocalStorage.
- Пользовательский ввод выводится безопасно.

## Список инструментов

- Форматирование и проверка JSON
- Base64 кодер / декодер
- URL кодер / декодер
- Генератор UTM-ссылок
- Генератор WhatsApp-ссылок
- Генератор Telegram-ссылок
- Генератор паролей
- Генератор slug RU/KZ/EN в латиницу
- Превью meta title и description
- Генератор robots.txt
- Стартовый генератор sitemap.xml
- Просмотр webhook payload
- Калькулятор комиссии KZT
- Оценка стоимости фриланс-проекта
- Генератор текста счёта
- HTML минификатор
- CSS минификатор

## Быстрый запуск

1. Склонируйте репозиторий.
2. Откройте `public/index.html` в браузере.
3. Выберите язык: English, Русский или Қазақша.
4. Найдите инструмент через поиск или категорию.
5. Сгенерируйте результат, скопируйте его или сохраните локально.

## Как использовать локально

Открытие файла напрямую:

```text
public/index.html
```

Локальный сервер:

```bash
python -m http.server 8000 -d public
```

Затем откройте:

```text
http://localhost:8000
```

Проверка структуры:

```bash
node scripts/validate.mjs
```

## Как опубликовать через GitHub Pages

1. Отправьте репозиторий на GitHub.
2. Откройте настройки репозитория.
3. Перейдите в Pages.
4. Выберите ветку `main`.
5. Выберите публикацию из `/root` или `/public` в зависимости от настроек Pages.
6. Если публикация идёт из `/root`, корневой `index.html` перенаправляет на `public/index.html`.

В проекте нет автоматического workflow для деплоя.

## Структура проекта

Структура включает корневую документацию, статическое приложение в `public/`, подробные инструкции в `docs/`, примеры в `examples/`, правила для AI-агентов в `ai/` и валидатор в `scripts/validate.mjs`.

## Мультиязычность

Интерфейс приложения поддерживает:

- English
- Русский
- Қазақша

Переводы хранятся в `public/assets/js/translations.js`. Они загружаются как обычный JavaScript-объект, без `fetch()`, поэтому приложение работает при открытии через `file://`.

## Безопасность и приватность

- Нет бэкенда.
- Нет базы данных.
- Нет входа и панели администратора.
- Нет аналитики.
- Нет трекинга.
- Нет внешних API-ключей.
- Пользовательский ввод никуда не отправляется.
- Данные выводятся через textarea или безопасный `textContent`.
- Не вставляйте и не сохраняйте секреты, токены, производственные пароли, реальные платёжные данные или конфиденциальные данные клиентов.

Панель администратора в проекте отсутствует, поэтому стандартные учётные данные администратора не используются.

## Пояснение про LocalStorage

LocalStorage используется только для:

- выбранного языка интерфейса;
- сохранённых результатов;
- лёгких локальных настроек приложения.

LocalStorage остаётся в браузере пользователя. Это не зашифрованное хранилище и не место для секретов.

## Roadmap

- v0.1.0 - Начальный офлайн-набор инструментов
- v0.2.0 - Больше CRM и marketing инструментов
- v0.3.0 - Экспорт сохранённых результатов в Markdown
- v0.4.0 - Опциональные PWA-улучшения
- v0.5.0 - Улучшения локализации
- v1.0.0 - Стабильный релиз

## Как участвовать

Смотрите `CONTRIBUTING.md`. Полезны новые инструменты, улучшения переводов, документации, доступности и безопасности.

## Лицензия

MIT License. Смотрите `LICENSE`.

## Рекомендуемое описание репозитория

```text
Offline web toolbox for freelancers, developers, CRM integrators and small business automation.
```

## Рекомендуемые GitHub topics

```text
freelancer-tools
web-toolbox
developer-tools
crm
javascript
html
css
offline-app
pwa
utm-builder
whatsapp-link
slug-generator
json-formatter
kzt
open-source
```

Автор: Beck Sarbassov  
Дата создания: 2026-06-16  
Последнее обновление: 2026-06-23  
Авторские права: © Beck Sarbassov. Все права защищены.
