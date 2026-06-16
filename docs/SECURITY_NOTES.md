# Security Notes

Author: Beck Sarbassov  
Date created: 2026-06-16  
Last updated: 2026-06-16  
Copyright: © Beck Sarbassov. All rights reserved.

## Static App

The project has no backend, no database, no analytics, no tracking scripts, no external API calls, and no account system.

## Local Input

User-entered data stays in the browser. Tools process text locally and write results to textarea or text-only containers.

## LocalStorage

LocalStorage stores the selected language and saved generated results. It is local to the user's browser but is not encrypted. Users should not store API keys, tokens, real passwords, private bank details, or confidential customer data.

## Escaping and Safe Rendering

The app includes `security.js` helpers and avoids rendering raw user input as HTML. Meta preview and saved results use `textContent`.

## Limitations

- The password generator is a browser helper, not a certified password manager.
- Calculators are estimation helpers, not financial advice.
- HTML and CSS minifiers are simple helpers, not professional build tools.
