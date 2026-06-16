/**
 * Project: Freelancer Web Toolbox
 * File: url-tools.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Encodes and decodes URL components with graceful error handling.
 * RU: Кодирует и декодирует компоненты URL с аккуратной обработкой ошибок.
 */
(function () {
  "use strict";

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.urlTools = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field full">
            <label for="url-input">${app.t("labels.input")}</label>
            <textarea id="url-input">crm automation Алматы</textarea>
          </div>
          <div class="field full">
            <label for="url-output">${app.t("labels.output")}</label>
            <textarea id="url-output" readonly></textarea>
          </div>
        </div>
        <div class="tool-actions">
          <button class="tool-button primary" id="url-encode" type="button">${app.t("actions.encode")}</button>
          <button class="tool-button secondary" id="url-decode" type="button">${app.t("actions.decode")}</button>
          <button class="tool-button secondary" id="url-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="url-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="url-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <p class="tool-status" id="url-status" aria-live="polite"></p>
      `;
      const input = container.querySelector("#url-input");
      const output = container.querySelector("#url-output");
      const status = container.querySelector("#url-status");
      container.querySelector("#url-encode").addEventListener("click", () => {
        output.value = encodeURIComponent(input.value);
        app.setStatus(status, app.t("messages.generated"), "success");
      });
      container.querySelector("#url-decode").addEventListener("click", () => {
        try {
          output.value = decodeURIComponent(input.value);
          app.setStatus(status, app.t("messages.generated"), "success");
        } catch (error) {
          app.setStatus(status, app.t("messages.invalidEncoded"), "error");
        }
      });
      container.querySelector("#url-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#url-save").addEventListener("click", () => app.saveResult("url", output.value, status));
      container.querySelector("#url-clear").addEventListener("click", () => {
        input.value = "";
        output.value = "";
        app.setStatus(status, "");
      });
    }
  };
})();
