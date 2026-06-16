/**
 * Project: Freelancer Web Toolbox
 * File: base64-tools.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Encodes and decodes UTF-8 text to and from Base64 in the browser.
 * RU: Кодирует и декодирует UTF-8 текст в Base64 и обратно в браузере.
 */
(function () {
  "use strict";

  function encodeUtf8(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }

  function decodeUtf8(value) {
    const binary = atob(value.trim());
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.base64Tools = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field full">
            <label for="base64-input">${app.t("labels.textInput")}</label>
            <textarea id="base64-input">Freelancer Web Toolbox</textarea>
          </div>
          <div class="field full">
            <label for="base64-output">${app.t("labels.output")}</label>
            <textarea id="base64-output" readonly></textarea>
          </div>
        </div>
        <div class="tool-actions">
          <button class="tool-button primary" id="base64-encode" type="button">${app.t("actions.encode")}</button>
          <button class="tool-button secondary" id="base64-decode" type="button">${app.t("actions.decode")}</button>
          <button class="tool-button secondary" id="base64-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="base64-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="base64-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <p class="tool-status" id="base64-status" aria-live="polite"></p>
      `;
      const input = container.querySelector("#base64-input");
      const output = container.querySelector("#base64-output");
      const status = container.querySelector("#base64-status");
      container.querySelector("#base64-encode").addEventListener("click", () => {
        output.value = encodeUtf8(input.value);
        app.setStatus(status, app.t("messages.generated"), "success");
      });
      container.querySelector("#base64-decode").addEventListener("click", () => {
        try {
          output.value = decodeUtf8(input.value);
          app.setStatus(status, app.t("messages.generated"), "success");
        } catch (error) {
          app.setStatus(status, app.t("messages.invalidBase64"), "error");
        }
      });
      container.querySelector("#base64-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#base64-save").addEventListener("click", () => app.saveResult("base64", output.value, status));
      container.querySelector("#base64-clear").addEventListener("click", () => {
        input.value = "";
        output.value = "";
        app.setStatus(status, "");
      });
    }
  };
})();
