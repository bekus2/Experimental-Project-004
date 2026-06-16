# Deployment

Author: Beck Sarbassov  
Date created: 2026-06-16  
Last updated: 2026-06-16  
Copyright: © Beck Sarbassov. All rights reserved.

## GitHub Pages

1. Push the repository to GitHub.
2. Open Settings > Pages.
3. Select `main` as the branch.
4. Publish from the repository root or configure hosting to serve `public/`.
5. If publishing from root, `index.html` redirects to `public/index.html`.

## Static Hosting

Upload the repository files or the `public/` directory to any static host. Keep relative paths intact.

## Shared Hosting

Copy the files to the public web directory. No PHP, database, or server modules are required for the app itself.

## VPS

Serve the files with nginx, Apache, Caddy, or another static server. Configure caching according to your release process.

## Plesk

Upload the repository or `public/` folder into the domain document root. Confirm that `index.html`, CSS, JS, and SVG files are served with normal static file permissions.

## Netlify-Like Static Hosting

Use a static deployment with no build command. The publish directory can be either the repository root or `public/`.

## Deployment Limitation

This repository does not include an automatic CI/CD deployment workflow.
