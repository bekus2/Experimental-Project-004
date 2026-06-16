# Project Structure

Author: Beck Sarbassov  
Date created: 2026-06-16  
Last updated: 2026-06-16  
Copyright: © Beck Sarbassov. All rights reserved.

## Root

- `README.md` — bilingual project overview.
- `HANDOFF.md` — developer handoff notes.
- `PROJECT_CONTEXT.md` — business and technical context.
- `Codex_History.md` — notable Codex changes.
- `TASK.md` — technical specification and acceptance criteria.
- `AI_RULES.md` — rules for AI coding agents.
- `LICENSE` — MIT license.
- `CHANGELOG.md` — release history.
- `CONTRIBUTING.md` — contribution guide.
- `SECURITY.md` — security policy.
- `index.html` — root redirect to the public app.

## public/

Contains the deployable static application. `public/index.html` is the main entry point.

## public/assets/css/

`app.css` defines the responsive layout, colors, typography, focus states, cards, forms, workspace, and saved results panel.

## public/assets/js/

- `translations.js` — translation dictionary.
- `i18n.js` — language selection and text replacement.
- `storage.js` — LocalStorage wrapper.
- `security.js` — escaping and validation helpers.
- `app.js` — app shell, dashboard, filtering, copying, and saved results.
- `tools/` — independent tool modules.

## docs/

User and developer documentation.

## examples/

Small standalone examples that run by opening their local `index.html`.

## ai/

AI agent rules, context, templates, and prompts for future work.

## scripts/

`validate.mjs` checks required files and structure without external packages.
