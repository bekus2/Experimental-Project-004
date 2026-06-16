# Contributing

Author: Beck Sarbassov  
Date created: 2026-06-16  
Last updated: 2026-06-16  
Copyright: © Beck Sarbassov. All rights reserved.

Thank you for helping improve Freelancer Web Toolbox.

## Ways to Contribute

- Report bugs with clear reproduction steps.
- Suggest practical tools for freelancers, developers, CRM integrators, marketers, or small business automation consultants.
- Improve English, Russian, or Kazakh translations.
- Improve documentation and examples.
- Review accessibility, security, and mobile usability.
- Submit pull requests with focused changes.

## Development Rules

- Keep the project dependency-free unless there is a strong documented reason.
- Preserve direct browser opening through `public/index.html`.
- Preserve EN/RU/KK localization.
- Avoid external CDNs, analytics, tracking scripts, and API calls.
- Do not add secrets, real payment details, private phone numbers, or credentials.
- Escape or safely render user input.
- Update documentation when behavior changes.

## Pull Request Checklist

- The changed tool works by opening `public/index.html`.
- `node scripts/validate.mjs` passes.
- The UI remains responsive on mobile widths.
- New text has EN/RU/KK translations.
- Documentation reflects the change.
