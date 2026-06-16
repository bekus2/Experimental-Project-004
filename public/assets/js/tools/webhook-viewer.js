/**
 * Project: Freelancer Web Toolbox
 * File: webhook-viewer.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Formats JSON webhook payloads and detects common top-level fields.
 * RU: Форматирует JSON payload вебхуков и определяет частые поля верхнего уровня.
 */
(function () {
  "use strict";

  const common = ["id", "name", "email", "phone", "status", "created_at", "updated_at"];

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.webhookViewer = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field full"><label for="webhook-input">${app.t("labels.jsonInput")}</label><textarea id="webhook-input">{"id":101,"name":"Example Client","email":"client@example.com","status":"new","created_at":"2026-06-16"}</textarea></div>
          <div class="field full"><label for="webhook-output">${app.t("labels.output")}</label><textarea id="webhook-output" readonly></textarea></div>
        </div>
        <div class="tool-actions">
          <button class="tool-button primary" id="webhook-generate" type="button">${app.t("actions.validate")}</button>
          <button class="tool-button secondary" id="webhook-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="webhook-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="webhook-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <div class="result-summary" id="webhook-summary"></div>
        <p class="tool-status" id="webhook-status" aria-live="polite"></p>
      `;
      const input = container.querySelector("#webhook-input");
      const output = container.querySelector("#webhook-output");
      const summary = container.querySelector("#webhook-summary");
      const status = container.querySelector("#webhook-status");
      container.querySelector("#webhook-generate").addEventListener("click", () => {
        try {
          const data = JSON.parse(input.value);
          output.value = JSON.stringify(data, null, 2);
          const keys = data && typeof data === "object" && !Array.isArray(data) ? Object.keys(data) : [];
          const detected = common.filter((key) => Object.prototype.hasOwnProperty.call(data, key));
          summary.textContent = `Top-level keys: ${keys.join(", ") || "none"}\nDetected common fields: ${detected.join(", ") || "none"}`;
          app.setStatus(status, app.t("messages.validJson"), "success");
        } catch (error) {
          summary.textContent = "";
          app.setStatus(status, `${app.t("messages.invalidJson")} ${error.message}`, "error");
        }
      });
      container.querySelector("#webhook-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#webhook-save").addEventListener("click", () => app.saveResult("webhook", output.value, status));
      container.querySelector("#webhook-clear").addEventListener("click", () => {
        input.value = "";
        output.value = "";
        summary.textContent = "";
        app.setStatus(status, "");
      });
    }
  };
})();
