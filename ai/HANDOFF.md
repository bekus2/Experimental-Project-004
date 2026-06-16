# AI Handoff

Author: Beck Sarbassov  
Date created: 2026-06-16  
Last updated: 2026-06-16  
Copyright: © Beck Sarbassov. All rights reserved.

## Continue From Here

1. Read root documentation.
2. Run `node scripts/validate.mjs`.
3. Open `public/index.html`.
4. Test language switching and several tools.
5. Keep changes focused.

## Important Files

- `public/assets/js/app.js` controls the shell.
- `public/assets/js/translations.js` controls UI text.
- `public/assets/js/tools/*.js` contain tool logic.
- `public/assets/css/app.css` controls responsive layout.

## Safe Development Pattern

For a new tool:

1. Add a module under `public/assets/js/tools/`.
2. Include it in `public/index.html`.
3. Register it in `app.js`.
4. Add translations.
5. Update documentation.
6. Run validation.
