/**
 * Project: Freelancer Web Toolbox
 * File: html-minifier.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Provides a simple browser-only HTML whitespace helper.
 * RU: Предоставляет простой браузерный помощник для очистки пробелов в HTML.
 */
(function () {
  "use strict";

  function minifyHtml(value) {
    return value
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/>\s+</g, "><")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.htmlMinifier = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field full"><label for="html-input">${app.t("labels.input")}</label><textarea id="html-input"><section>\n  <h1>Example</h1>\n  <p>Useful content.</p>\n</section></textarea></div>
          <div class="field full"><label for="html-output">${app.t("labels.output")}</label><textarea id="html-output" readonly></textarea></div>
        </div>
        <p class="note">${app.t("messages.minifierNote")}</p>
        <div class="tool-actions">
          <button class="tool-button primary" id="html-minify" type="button">${app.t("actions.minify")}</button>
          <button class="tool-button secondary" id="html-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="html-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="html-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <p class="tool-status" id="html-status" aria-live="polite"></p>
      `;
      const input = container.querySelector("#html-input");
      const output = container.querySelector("#html-output");
      const status = container.querySelector("#html-status");
      container.querySelector("#html-minify").addEventListener("click", () => {
        output.value = minifyHtml(input.value);
        app.setStatus(status, app.t("messages.generated"), "success");
      });
      container.querySelector("#html-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#html-save").addEventListener("click", () => app.saveResult("html", output.value, status));
      container.querySelector("#html-clear").addEventListener("click", () => app.clearInputs(container));
    }
  };
})();
