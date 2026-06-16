/**
 * Project: Freelancer Web Toolbox
 * File: utm-builder.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Builds campaign links with UTM parameters while preserving existing query values.
 * RU: Создаёт рекламные ссылки с UTM-параметрами, сохраняя существующие query-значения.
 */
(function () {
  "use strict";

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.utmBuilder = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field full"><label for="utm-base">${app.t("labels.baseUrl")}</label><input id="utm-base" type="url" value="https://example.com/services"></div>
          <div class="field"><label for="utm-source">${app.t("labels.source")}</label><input id="utm-source" type="text" value="newsletter"></div>
          <div class="field"><label for="utm-medium">${app.t("labels.medium")}</label><input id="utm-medium" type="text" value="email"></div>
          <div class="field"><label for="utm-campaign">${app.t("labels.campaign")}</label><input id="utm-campaign" type="text" value="launch"></div>
          <div class="field"><label for="utm-term">${app.t("labels.term")}</label><input id="utm-term" type="text"></div>
          <div class="field"><label for="utm-content">${app.t("labels.content")}</label><input id="utm-content" type="text"></div>
          <div class="field full"><label for="utm-output">${app.t("labels.output")}</label><textarea id="utm-output" readonly></textarea></div>
        </div>
        <div class="tool-actions">
          <button class="tool-button primary" id="utm-generate" type="button">${app.t("actions.generate")}</button>
          <button class="tool-button secondary" id="utm-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="utm-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="utm-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <p class="tool-status" id="utm-status" aria-live="polite"></p>
      `;
      const status = container.querySelector("#utm-status");
      const output = container.querySelector("#utm-output");
      container.querySelector("#utm-generate").addEventListener("click", () => {
        const base = container.querySelector("#utm-base").value.trim();
        if (!window.FWT_SECURITY.isHttpUrl(base)) {
          app.setStatus(status, app.t("messages.invalidUrl"), "error");
          return;
        }
        const url = new URL(base);
        [
          ["utm_source", "#utm-source"],
          ["utm_medium", "#utm-medium"],
          ["utm_campaign", "#utm-campaign"],
          ["utm_term", "#utm-term"],
          ["utm_content", "#utm-content"]
        ].forEach(([param, selector]) => {
          const value = container.querySelector(selector).value.trim();
          if (value) {
            url.searchParams.set(param, value);
          }
        });
        output.value = url.toString();
        app.setStatus(status, app.t("messages.generated"), "success");
      });
      container.querySelector("#utm-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#utm-save").addEventListener("click", () => app.saveResult("utm", output.value, status));
      container.querySelector("#utm-clear").addEventListener("click", () => app.clearInputs(container));
    }
  };
})();
