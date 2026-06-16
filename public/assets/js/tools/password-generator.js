/**
 * Project: Freelancer Web Toolbox
 * File: password-generator.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Generates local browser passwords with crypto.getRandomValues when available.
 * RU: Генерирует локальные браузерные пароли с crypto.getRandomValues, если он доступен.
 */
(function () {
  "use strict";

  const groups = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{};:,.?"
  };

  function randomIndex(max) {
    if (window.crypto && window.crypto.getRandomValues) {
      const values = new Uint32Array(1);
      window.crypto.getRandomValues(values);
      return values[0] % max;
    }
    // EN: Fallback is less secure and only used when Web Crypto is unavailable.
    // RU: Резервный вариант менее безопасен и используется только без Web Crypto.
    return Math.floor(Math.random() * max);
  }

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.passwordGenerator = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field"><label for="pw-length">${app.t("labels.length")}</label><input id="pw-length" type="number" min="8" max="128" value="18"></div>
          <label class="field"><span>${app.t("labels.uppercase")}</span><input id="pw-uppercase" type="checkbox" checked></label>
          <label class="field"><span>${app.t("labels.lowercase")}</span><input id="pw-lowercase" type="checkbox" checked></label>
          <label class="field"><span>${app.t("labels.numbers")}</span><input id="pw-numbers" type="checkbox" checked></label>
          <label class="field"><span>${app.t("labels.symbols")}</span><input id="pw-symbols" type="checkbox" checked></label>
          <div class="field full"><label for="pw-output">${app.t("labels.output")}</label><textarea id="pw-output" readonly></textarea></div>
        </div>
        <p class="note">${app.t("messages.passwordNote")}</p>
        <div class="tool-actions">
          <button class="tool-button primary" id="pw-generate" type="button">${app.t("actions.generate")}</button>
          <button class="tool-button secondary" id="pw-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="pw-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="pw-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <p class="tool-status" id="pw-status" aria-live="polite"></p>
      `;
      const status = container.querySelector("#pw-status");
      const output = container.querySelector("#pw-output");
      container.querySelector("#pw-generate").addEventListener("click", () => {
        const length = Math.min(128, Math.max(8, app.toNumber(container.querySelector("#pw-length").value, 18)));
        const selected = Object.entries(groups)
          .filter(([key]) => container.querySelector(`#pw-${key}`).checked)
          .map(([, value]) => value);
        const pool = selected.join("");
        if (!pool) {
          app.setStatus(status, app.t("messages.required"), "error");
          return;
        }
        let password = "";
        for (let index = 0; index < length; index += 1) {
          password += pool[randomIndex(pool.length)];
        }
        output.value = password;
        const strength = length >= 18 && selected.length >= 3
          ? app.t("messages.strengthStrong")
          : length >= 12
            ? app.t("messages.strengthMedium")
            : app.t("messages.strengthBasic");
        const cryptoNote = window.crypto && window.crypto.getRandomValues ? "" : ` ${app.t("messages.passwordFallback")}`;
        app.setStatus(status, `${strength}.${cryptoNote}`, "success");
      });
      container.querySelector("#pw-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#pw-save").addEventListener("click", () => app.saveResult("password", output.value, status));
      container.querySelector("#pw-clear").addEventListener("click", () => app.clearInputs(container));
    }
  };
})();
