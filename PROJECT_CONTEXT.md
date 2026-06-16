# PROJECT_CONTEXT

Author: Beck Sarbassov  
Date created: 2026-06-16  
Last updated: 2026-06-16  
Copyright: © Beck Sarbassov. All rights reserved.

## Purpose

Freelancer Web Toolbox gives freelancers and small technical teams a practical local toolbox that works without server infrastructure. It helps users complete everyday web, CRM, marketing, business, SEO, text, and security-adjacent tasks inside a browser.

## Business Logic

The project reduces reliance on remote utility websites for small tasks. Users paste or type data, generate a result locally, copy it, and optionally save it in LocalStorage for later reuse.

## Target Users

- Freelancers
- Web developers
- CRM integrators
- Digital marketers
- SMM specialists
- Small business automation consultants
- Indie makers

## Main Features

- Multilingual UI: EN/RU/KK.
- Searchable tool dashboard.
- Category filtering.
- Active tool workspace.
- Copy-to-clipboard output.
- Saved results panel backed by LocalStorage.
- Static hosting compatibility.

## Architecture Overview

The app uses plain browser globals to avoid a build step:

- `translations.js` defines `window.FWT_TRANSLATIONS`.
- `i18n.js` reads translations and applies selected language.
- `storage.js` wraps LocalStorage safely.
- `security.js` provides escaping, URL validation, and number helpers.
- `app.js` renders dashboard cards and opens tool modules.
- Tool modules register themselves on `window.FWT_TOOLS`.

## Data Flow

1. User opens `public/index.html`.
2. `i18n.js` loads saved language or defaults to English.
3. `app.js` renders category filters, cards, and saved results.
4. User opens a tool.
5. The tool reads input from form controls.
6. The tool writes output to textarea or text-only containers.
7. The user copies or saves output.
8. Saved output is stored only in browser LocalStorage.

## Security Logic

- No backend or external network dependency.
- No user input is sent to a server.
- Tools do not render raw user input as HTML.
- JSON and webhook outputs use textarea/textContent.
- Meta preview uses DOM nodes with textContent.
- Users are warned not to store secrets in LocalStorage.

## Admin Panel Logic

There is no admin panel, authentication system, user account system, or role-based access control in this project.

## API Logic

There is no API integration. The project intentionally avoids external API keys and network calls.

## Data Storage Logic

LocalStorage stores only:

- selected language;
- saved generated results.

No database is used.

## Important Limitations

- LocalStorage is not encrypted.
- Calculators provide estimates only.
- Password generator is a local helper, not a certified password manager.
- HTML/CSS minifiers are simple helpers, not production build tools.

## Future Direction

The project can grow by adding more tool modules, export formats, improved screenshots, optional PWA features, and more refined localization.
