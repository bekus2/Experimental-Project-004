/**
 * Project: Freelancer Web Toolbox
 * File: json-tools.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Validates, formats, and minifies JSON without rendering raw input as HTML.
 * RU: Проверяет, форматирует и минифицирует JSON без вывода сырого ввода как HTML.
 */
(function () {
  "use strict";

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.jsonTools = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field full">
            <label for="json-input">${app.t("labels.jsonInput")}</label>
            <textarea id="json-input" spellcheck="false">{"project":"Freelancer Web Toolbox","offline":true}</textarea>
          </div>
          <div class="field full">
            <label for="json-output">${app.t("labels.output")}</label>
            <textarea id="json-output" readonly spellcheck="false"></textarea>
          </div>
        </div>
        <div class="tool-actions">
          <button class="tool-button primary" id="json-format" type="button">${app.t("actions.format")}</button>
          <button class="tool-button secondary" id="json-minify" type="button">${app.t("actions.minify")}</button>
          <button class="tool-button secondary" id="json-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="json-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="json-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <p class="tool-status" id="json-status" aria-live="polite"></p>
      `;

      const input = container.querySelector("#json-input");
      const output = container.querySelector("#json-output");
      const status = container.querySelector("#json-status");

      function parse() {
        return JSON.parse(input.value);
      }

      container.querySelector("#json-format").addEventListener("click", () => {
        try {
          output.value = JSON.stringify(parse(), null, 2);
          app.setStatus(status, app.t("messages.validJson"), "success");
        } catch (error) {
          app.setStatus(status, `${app.t("messages.invalidJson")} ${error.message}`, "error");
        }
      });
      container.querySelector("#json-minify").addEventListener("click", () => {
        try {
          output.value = JSON.stringify(parse());
          app.setStatus(status, app.t("messages.validJson"), "success");
        } catch (error) {
          app.setStatus(status, `${app.t("messages.invalidJson")} ${error.message}`, "error");
        }
      });
      container.querySelector("#json-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#json-save").addEventListener("click", () => app.saveResult("json", output.value, status));
      container.querySelector("#json-clear").addEventListener("click", () => {
        input.value = "";
        output.value = "";
        app.setStatus(status, "");
      });
    }
  };
})();
