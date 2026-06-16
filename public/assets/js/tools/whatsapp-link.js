/**
 * Project: Freelancer Web Toolbox
 * File: whatsapp-link.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Generates wa.me links from sanitized example phone numbers and messages.
 * RU: Генерирует wa.me ссылки из очищенных примерных номеров и сообщений.
 */
(function () {
  "use strict";

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.whatsappLink = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field"><label for="wa-phone">${app.t("labels.phone")}</label><input id="wa-phone" type="text" value="77000000000"></div>
          <div class="field"><label for="wa-message">${app.t("labels.message")}</label><input id="wa-message" type="text" value="Hello, I would like to discuss a project."></div>
          <div class="field full"><label for="wa-output">${app.t("labels.output")}</label><textarea id="wa-output" readonly></textarea></div>
        </div>
        <div class="tool-actions">
          <button class="tool-button primary" id="wa-generate" type="button">${app.t("actions.generate")}</button>
          <button class="tool-button secondary" id="wa-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="wa-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="wa-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <p class="tool-status" id="wa-status" aria-live="polite"></p>
      `;
      const status = container.querySelector("#wa-status");
      const output = container.querySelector("#wa-output");
      container.querySelector("#wa-generate").addEventListener("click", () => {
        const phone = container.querySelector("#wa-phone").value.replace(/\D/g, "");
        const message = container.querySelector("#wa-message").value.trim();
        if (!phone) {
          app.setStatus(status, app.t("messages.required"), "error");
          return;
        }
        output.value = `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
        app.setStatus(status, app.t("messages.generated"), "success");
      });
      container.querySelector("#wa-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#wa-save").addEventListener("click", () => app.saveResult("whatsapp", output.value, status));
      container.querySelector("#wa-clear").addEventListener("click", () => app.clearInputs(container));
    }
  };
})();
