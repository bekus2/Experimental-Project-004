/**
 * Project: Freelancer Web Toolbox
 * File: css-minifier.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Provides a simple browser-only CSS whitespace helper.
 * RU: Предоставляет простой браузерный помощник для очистки пробелов в CSS.
 */
(function () {
  "use strict";

  function minifyCss(value) {
    return value
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{}:;,>])\s*/g, "$1")
      .replace(/;}/g, "}")
      .trim();
  }

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.cssMinifier = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field full"><label for="css-input">${app.t("labels.input")}</label><textarea id="css-input">.card {\n  color: #17211f;\n  padding: 16px;\n}</textarea></div>
          <div class="field full"><label for="css-output">${app.t("labels.output")}</label><textarea id="css-output" readonly></textarea></div>
        </div>
        <p class="note">${app.t("messages.minifierNote")}</p>
        <div class="tool-actions">
          <button class="tool-button primary" id="css-minify" type="button">${app.t("actions.minify")}</button>
          <button class="tool-button secondary" id="css-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="css-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="css-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <p class="tool-status" id="css-status" aria-live="polite"></p>
      `;
      const input = container.querySelector("#css-input");
      const output = container.querySelector("#css-output");
      const status = container.querySelector("#css-status");
      container.querySelector("#css-minify").addEventListener("click", () => {
        output.value = minifyCss(input.value);
        app.setStatus(status, app.t("messages.generated"), "success");
      });
      container.querySelector("#css-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#css-save").addEventListener("click", () => app.saveResult("css", output.value, status));
      container.querySelector("#css-clear").addEventListener("click", () => app.clearInputs(container));
    }
  };
})();
