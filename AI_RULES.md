# AI_RULES

Author: Beck Sarbassov  
Date created: 2026-06-16  
Last updated: 2026-06-16  
Copyright: © Beck Sarbassov. All rights reserved.

## Files to Read Before Changes

Before editing code or docs, read:

- `README.md`
- `HANDOFF.md`
- `PROJECT_CONTEXT.md`
- `Codex_History.md`
- `TASK.md`
- `AI_RULES.md`

For tool work, also read:

- `public/assets/js/app.js`
- `public/assets/js/translations.js`
- the relevant file in `public/assets/js/tools/`

## Architecture Rules

- Keep the app static and dependency-free.
- Keep `public/index.html` runnable through `file://`.
- Keep relative paths.
- Register tools through `window.FWT_TOOLS`.
- Keep translations in `window.FWT_TRANSLATIONS`.
- Do not fetch translation JSON files.
- Preserve EN/RU/KK support.

## Coding Style Rules

- Use clear names, `const`, and `let`.
- Keep modules focused.
- Add short EN/RU comments only for important logic.
- Do not minify source files.
- Keep source code headers current.

## Security Rules

- Do not add secrets, tokens, API keys, private credentials, or payment details.
- Do not render raw user input as HTML.
- Use textarea, `textContent`, or escaping helpers for untrusted data.
- Keep LocalStorage warnings accurate.
- Avoid analytics, tracking scripts, external APIs, and CDNs.

## Documentation Rules

Update affected documentation when behavior changes:

- `README.md`
- `HANDOFF.md`
- `PROJECT_CONTEXT.md`
- `Codex_History.md`
- `TASK.md`
- `AI_RULES.md`
- relevant files in `docs/` and `ai/`

## Prohibited Actions

- Do not rewrite the entire project without a clear reason.
- Do not remove working tools without documenting why.
- Do not add unnecessary frameworks.
- Do not break direct browser opening.
- Do not expose real credentials.

## Git and GitHub Rules

- Work in a feature branch for significant changes.
- Keep commits focused.
- Run validation before publishing.
- Update docs with code changes.

## Testing and Validation

Run:

```bash
node scripts/validate.mjs
```

Also open the app locally or through:

```bash
python -m http.server 8000 -d public
```

## Final Report Format

Final reports should include:

1. What changed
2. Changed files
3. How to run and validate
4. Security notes
5. Documentation updated
6. Remaining improvements
7. Risks or limitations
