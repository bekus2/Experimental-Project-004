# HANDOFF

Author: Beck Sarbassov  
Date created: 2026-06-16  
Last updated: 2026-06-16  
Copyright: © Beck Sarbassov. All rights reserved.

## Project Summary

Freelancer Web Toolbox is a dependency-free static browser application for freelance, web, CRM, marketing, SEO, text, business, and security utility tasks. The main app runs from `public/index.html` and also works through a local static server.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage
- SVG
- Node.js built-in modules for validation only

## Structure

- `public/index.html` — main app interface.
- `public/assets/css/app.css` — responsive visual design.
- `public/assets/js/app.js` — dashboard, filtering, workspace, copy, and saved result logic.
- `public/assets/js/translations.js` — EN/RU/KK translation dictionary.
- `public/assets/js/tools/` — one module per tool.
- `docs/` — human documentation.
- `ai/` — AI agent context and reusable prompts.
- `examples/` — small runnable examples.
- `scripts/validate.mjs` — repository validation script.

## Install and Run

No install step is required.

Open directly:

```text
public/index.html
```

Or run:

```bash
python -m http.server 8000 -d public
```

## Deploy

Deploy the repository to GitHub Pages or any static hosting. The root `index.html` redirects to `public/index.html`, so publishing from the repository root works.

## Configuration

The app requires no secrets or environment variables. `.env.example` exists only as a portability reference for local tooling.

## Do Not Change Without Understanding

- The script order in `public/index.html`.
- The `window.FWT_TRANSLATIONS`, `window.FWT_TOOLS`, `window.FWT_I18N`, `window.FWT_STORAGE`, and `window.FWT_APP` browser globals.
- The LocalStorage key prefix in `storage.js`.
- Safe rendering rules in `security.js` and the tool modules.

## Remaining Work

The initial release is functional. Future work can add export/import for saved results, more tools, screenshot assets, and optional PWA behavior.

## Useful Next Improvements

- Add Markdown export for saved results.
- Add unit-like smoke checks for each tool.
- Capture screenshots for `docs/SCREENSHOTS.md`.
- Add optional service worker only after reviewing cache behavior carefully.
