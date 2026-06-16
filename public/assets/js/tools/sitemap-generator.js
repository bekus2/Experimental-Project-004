/**
 * Project: Freelancer Web Toolbox
 * File: sitemap-generator.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Generates simple sitemap XML as text from a base URL and page paths.
 * RU: Генерирует простой XML sitemap как текст из базового URL и путей страниц.
 */
(function () {
  "use strict";

  function xmlEscape(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.sitemapGenerator = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field full"><label for="sitemap-base">${app.t("labels.baseUrl")}</label><input id="sitemap-base" type="url" value="https://example.com"></div>
          <div class="field full"><label for="sitemap-paths">${app.t("labels.pagePaths")}</label><textarea id="sitemap-paths">/\n/services\n/contact</textarea></div>
          <label class="field full"><span>${app.t("labels.includeLastmod")}</span><input id="sitemap-lastmod" type="checkbox" checked></label>
          <div class="field full"><label for="sitemap-output">${app.t("labels.output")}</label><textarea id="sitemap-output" readonly></textarea></div>
        </div>
        <div class="tool-actions">
          <button class="tool-button primary" id="sitemap-generate" type="button">${app.t("actions.generate")}</button>
          <button class="tool-button secondary" id="sitemap-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="sitemap-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="sitemap-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <p class="tool-status" id="sitemap-status" aria-live="polite"></p>
      `;
      const status = container.querySelector("#sitemap-status");
      const output = container.querySelector("#sitemap-output");
      container.querySelector("#sitemap-generate").addEventListener("click", () => {
        const base = container.querySelector("#sitemap-base").value.trim();
        if (!window.FWT_SECURITY.isHttpUrl(base)) {
          app.setStatus(status, app.t("messages.invalidUrl"), "error");
          return;
        }
        const includeLastmod = container.querySelector("#sitemap-lastmod").checked;
        const date = new Date().toISOString().slice(0, 10);
        const paths = container.querySelector("#sitemap-paths").value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
        const urls = paths.map((path) => {
          const loc = new URL(path, base).toString();
          const lastmod = includeLastmod ? `\n    <lastmod>${date}</lastmod>` : "";
          return `  <url>\n    <loc>${xmlEscape(loc)}</loc>${lastmod}\n  </url>`;
        });
        output.value = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        app.setStatus(status, app.t("messages.generated"), "success");
      });
      container.querySelector("#sitemap-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#sitemap-save").addEventListener("click", () => app.saveResult("sitemap", output.value, status));
      container.querySelector("#sitemap-clear").addEventListener("click", () => app.clearInputs(container));
    }
  };
})();
