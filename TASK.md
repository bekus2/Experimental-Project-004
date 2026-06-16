# TASK

Author: Beck Sarbassov  
Date created: 2026-06-16  
Last updated: 2026-06-16  
Copyright: © Beck Sarbassov. All rights reserved.

## Project Goal

Create and maintain a complete public GitHub project named Freelancer Web Toolbox: a lightweight offline browser toolbox for freelancers, web developers, CRM integrators, marketers, SMM specialists, small business automation consultants, and indie makers.

## Current Version

v0.1.0

## Required Functionality

- Static browser app in `public/index.html`.
- EN/RU/KK UI language support.
- Language persistence via LocalStorage.
- Searchable and filterable tool dashboard.
- Active tool workspace.
- Copyable generated output.
- Saved results panel backed by LocalStorage.
- GitHub Pages compatibility.
- Documentation and validation script.

## Pages and Modules

- Root redirect page: `index.html`.
- Main app page: `public/index.html`.
- Core JavaScript modules: translations, i18n, storage, security, app.
- Tool modules under `public/assets/js/tools/`.
- Documentation under `docs/`.
- AI context under `ai/`.
- Runnable examples under `examples/`.

## User Roles

No user roles are implemented. The app is public and local-only.

## Admin Panel Requirements

No admin panel is included. Do not add admin credentials, login logic, or server-side authentication unless the project scope changes.

## UI Requirements

- Clean responsive layout.
- Accessible labels.
- Keyboard-friendly controls.
- Visible focus states.
- Mobile layout without horizontal overflow.
- Search and category filtering.
- Clear validation messages.

## Backend Requirements

No backend. Do not add a server dependency for the current project scope.

## API Requirements

No external API calls. Do not add API keys or network integrations without documenting the change.

## Data Storage Requirements

Use LocalStorage only for language and saved generated results. Do not store secrets.

## Form Handling Requirements

All forms are local browser controls. Validate input in JavaScript and show clear messages.

## Email and Notification Requirements

No email sending or notifications are implemented.

## SEO Requirements

- Semantic HTML.
- Useful title and meta description.
- Open Graph metadata.
- `robots.txt`.
- `sitemap.xml`.

## Performance Requirements

- No external dependencies.
- No build step.
- Small static assets.
- Direct file opening through `file://`.

## Security Requirements

- Escape or safely render user-entered data.
- Avoid raw user input in `innerHTML`.
- No analytics or tracking.
- No secrets in repository.
- LocalStorage warning visible in app and docs.

## Deployment Requirements

Support GitHub Pages and generic static hosting. Root `index.html` should redirect to `public/index.html`.

## Acceptance Criteria

- `README.md` contains English and Russian documentation in one file.
- EN/RU/KK language switcher works and persists.
- `public/index.html` opens directly in a browser.
- Static server mode works.
- All 17 tools are implemented.
- Copy, search, filters, and saved results work.
- Required docs, AI files, examples, metadata, and validation script exist.
- `node scripts/validate.mjs` passes.
