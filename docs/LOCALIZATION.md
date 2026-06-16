# Localization

Author: Beck Sarbassov  
Date created: 2026-06-16  
Last updated: 2026-06-16  
Copyright: © Beck Sarbassov. All rights reserved.

## Supported Languages

- English
- Русский
- Қазақша

## How It Works

Translations live in `public/assets/js/translations.js`:

```js
window.FWT_TRANSLATIONS = {
  en: {},
  ru: {},
  kk: {}
};
```

`i18n.js` reads the selected language from LocalStorage, defaults to English, applies text to elements with `data-i18n`, and updates placeholders with `data-i18n-placeholder`.

## Tool Text

Tool modules use `app.t("key.path")` so active tool labels are rendered in the current language.

## Adding a Translation

1. Add the English key first.
2. Add Russian and Kazakh values with the same key.
3. Update any related documentation.
4. Run `node scripts/validate.mjs`.

## Important Rule

Do not fetch translation files with `fetch()`. The app must keep working through direct `file://` opening.
