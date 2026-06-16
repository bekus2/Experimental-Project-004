/**
 * Project: Freelancer Web Toolbox
 * File: robots-generator.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Generates starter robots.txt content for static and small business sites.
 * RU: Генерирует стартовый robots.txt для статических сайтов и малого бизнеса.
 */
(function () {
  "use strict";

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.robotsGenerator = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field"><label for="robots-mode">${app.t("labels.mode")}</label><select id="robots-mode"><option value="allow">${app.t("labels.allowAll")}</option><option value="disallow">${app.t("labels.disallowAll")}</option></select></div>
          <div class="field"><label for="robots-sitemap">${app.t("labels.sitemapUrl")}</label><input id="robots-sitemap" type="url" value="https://example.com/sitemap.xml"></div>
          <div class="field full"><label for="robots-path">${app.t("labels.disallowPath")}</label><input id="robots-path" type="text" value="/admin/"></div>
          <div class="field full"><label for="robots-output">${app.t("labels.output")}</label><textarea id="robots-output" readonly></textarea></div>
        </div>
        <div class="tool-actions">
          <button class="tool-button primary" id="robots-generate" type="button">${app.t("actions.generate")}</button>
          <button class="tool-button secondary" id="robots-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="robots-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="robots-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <p class="tool-status" id="robots-status" aria-live="polite"></p>
      `;
      const status = container.querySelector("#robots-status");
      const output = container.querySelector("#robots-output");
      container.querySelector("#robots-generate").addEventListener("click", () => {
        const mode = container.querySelector("#robots-mode").value;
        const sitemap = container.querySelector("#robots-sitemap").value.trim();
        const path = container.querySelector("#robots-path").value.trim();
        const lines = ["User-agent: *"];
        lines.push(mode === "allow" ? "Allow: /" : "Disallow: /");
        if (mode === "allow" && path) {
          lines.push(`Disallow: ${path.startsWith("/") ? path : `/${path}`}`);
        }
        if (sitemap) {
          lines.push(`Sitemap: ${sitemap}`);
        }
        output.value = lines.join("\n");
        app.setStatus(status, app.t("messages.generated"), "success");
      });
      container.querySelector("#robots-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#robots-save").addEventListener("click", () => app.saveResult("robots", output.value, status));
      container.querySelector("#robots-clear").addEventListener("click", () => app.clearInputs(container));
    }
  };
})();
