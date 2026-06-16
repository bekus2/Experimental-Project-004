# Security Policy

Author: Beck Sarbassov  
Date created: 2026-06-16  
Last updated: 2026-06-16  
Copyright: © Beck Sarbassov. All rights reserved.

## Privacy-First Scope

Freelancer Web Toolbox is a static frontend project. It has no backend, no database, no login system, no analytics, no tracking scripts, and no external API calls.

## Reporting Security Issues

If you find a security issue, open a private report through GitHub security advisories when available, or contact the maintainer with a clear description, reproduction steps, affected files, and suggested fix.

## LocalStorage Warning

Saved results are stored in the browser's LocalStorage on the user's device. LocalStorage is convenient, but it is not an encrypted vault. Users should not paste or save API keys, tokens, passwords, private payment details, or confidential customer data.

## Static Frontend Limitations

This app can help format, generate, and estimate data locally, but it is not a substitute for professional security, legal, financial, accounting, or SEO advice.

## Repository Rules

- Do not commit secrets.
- Do not include real personal bank details.
- Do not add production SMTP passwords or API keys.
- Do not add analytics or tracking scripts.
- Keep user input rendering safe.
