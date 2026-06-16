/**
 * Project: Freelancer Web Toolbox
 * File: invoice-text-generator.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Generates professional invoice request text in English, Russian, or Kazakh.
 * RU: Генерирует профессиональный текст запроса оплаты на английском, русском или казахском.
 */
(function () {
  "use strict";

  function invoiceText(language, data) {
    if (language === "ru") {
      return `Здравствуйте, ${data.client}.\n\nНаправляю запрос на оплату услуги: ${data.service}.\nСумма: ${data.amount} ${data.currency}.\nСрок оплаты: ${data.dueDate}.\n\nПримечание: ${data.note || "используйте согласованные безопасные реквизиты из договора или счёта."}\n\nСпасибо.`;
    }
    if (language === "kk") {
      return `Сәлеметсіз бе, ${data.client}.\n\nКелесі қызмет бойынша төлем сұрауын жіберемін: ${data.service}.\nСома: ${data.amount} ${data.currency}.\nТөлеу мерзімі: ${data.dueDate}.\n\nЕскертпе: ${data.note || "келісімшарттағы немесе шоттағы қауіпсіз деректерді қолданыңыз."}\n\nРақмет.`;
    }
    return `Hello ${data.client},\n\nPlease find the payment request for the following service: ${data.service}.\nAmount: ${data.amount} ${data.currency}.\nDue date: ${data.dueDate}.\n\nPayment note: ${data.note || "use the agreed secure payment details from the contract or invoice."}\n\nThank you.`;
  }

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.invoiceTextGenerator = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field"><label for="invoice-client">${app.t("labels.clientName")}</label><input id="invoice-client" type="text" value="Example Client"></div>
          <div class="field"><label for="invoice-service">${app.t("labels.serviceName")}</label><input id="invoice-service" type="text" value="Website setup and CRM integration"></div>
          <div class="field"><label for="invoice-amount">${app.t("labels.amount")}</label><input id="invoice-amount" type="number" step="0.01" value="250000"></div>
          <div class="field"><label for="invoice-currency">${app.t("labels.currency")}</label><select id="invoice-currency"><option>KZT</option><option>USD</option><option>EUR</option></select></div>
          <div class="field"><label for="invoice-due">${app.t("labels.dueDate")}</label><input id="invoice-due" type="date"></div>
          <div class="field"><label for="invoice-lang">${app.t("labels.invoiceLanguage")}</label><select id="invoice-lang"><option value="en">English</option><option value="ru">Русский</option><option value="kk">Қазақша</option></select></div>
          <div class="field full"><label for="invoice-note">${app.t("labels.paymentNote")}</label><textarea id="invoice-note">Generic payment details are provided in the signed invoice.</textarea></div>
          <div class="field full"><label for="invoice-output">${app.t("labels.output")}</label><textarea id="invoice-output" readonly></textarea></div>
        </div>
        <div class="tool-actions">
          <button class="tool-button primary" id="invoice-generate" type="button">${app.t("actions.generate")}</button>
          <button class="tool-button secondary" id="invoice-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="invoice-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="invoice-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <p class="tool-status" id="invoice-status" aria-live="polite"></p>
      `;
      const output = container.querySelector("#invoice-output");
      const status = container.querySelector("#invoice-status");
      container.querySelector("#invoice-generate").addEventListener("click", () => {
        const data = {
          client: container.querySelector("#invoice-client").value.trim() || "Client",
          service: container.querySelector("#invoice-service").value.trim() || "Service",
          amount: container.querySelector("#invoice-amount").value.trim() || "0",
          currency: container.querySelector("#invoice-currency").value,
          dueDate: container.querySelector("#invoice-due").value || "agreed due date",
          note: container.querySelector("#invoice-note").value.trim()
        };
        output.value = invoiceText(container.querySelector("#invoice-lang").value, data);
        app.setStatus(status, app.t("messages.generated"), "success");
      });
      container.querySelector("#invoice-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#invoice-save").addEventListener("click", () => app.saveResult("invoice", output.value, status));
      container.querySelector("#invoice-clear").addEventListener("click", () => app.clearInputs(container));
    }
  };
})();
