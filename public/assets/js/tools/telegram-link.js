/**
 * Project: Freelancer Web Toolbox
 * File: telegram-link.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Creates Telegram profile or channel links from sanitized usernames.
 * RU: Создаёт Telegram-ссылки на профиль или канал из очищенных username.
 */
(function () {
  "use strict";

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.telegramLink = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field"><label for="tg-username">${app.t("labels.username")}</label><input id="tg-username" type="text" value="example_channel"></div>
          <div class="field"><label for="tg-message">${app.t("labels.message")}</label><input id="tg-message" type="text" value="Please contact us on Telegram."></div>
          <div class="field full"><label for="tg-output">${app.t("labels.output")}</label><textarea id="tg-output" readonly></textarea></div>
        </div>
        <div class="tool-actions">
          <button class="tool-button primary" id="tg-generate" type="button">${app.t("actions.generate")}</button>
          <button class="tool-button secondary" id="tg-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="tg-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="tg-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <p class="tool-status" id="tg-status" aria-live="polite"></p>
      `;
      const status = container.querySelector("#tg-status");
      const output = container.querySelector("#tg-output");
      container.querySelector("#tg-generate").addEventListener("click", () => {
        const username = container.querySelector("#tg-username").value.trim().replace(/^@+/, "");
        const message = container.querySelector("#tg-message").value.trim();
        if (!/^[a-zA-Z0-9_]{5,32}$/.test(username)) {
          app.setStatus(status, app.t("messages.invalidUsername"), "error");
          return;
        }
        output.value = `https://t.me/${username}${message ? `\n\n${message}` : ""}`;
        app.setStatus(status, app.t("messages.generated"), "success");
      });
      container.querySelector("#tg-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#tg-save").addEventListener("click", () => app.saveResult("telegram", output.value, status));
      container.querySelector("#tg-clear").addEventListener("click", () => app.clearInputs(container));
    }
  };
})();
