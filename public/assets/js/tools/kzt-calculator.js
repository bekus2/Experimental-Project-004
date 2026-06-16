/**
 * Project: Freelancer Web Toolbox
 * File: kzt-calculator.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Calculates commission, fixed fee, tax, bonus, and net amount in KZT.
 * RU: Рассчитывает комиссию, фиксированный сбор, налог, бонус и чистую сумму в KZT.
 */
(function () {
  "use strict";

  function money(value) {
    return `${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })} ₸`;
  }

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.kztCalculator = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field"><label for="kzt-amount">${app.t("labels.amountKzt")}</label><input id="kzt-amount" type="number" step="0.01" value="250000"></div>
          <div class="field"><label for="kzt-commission">${app.t("labels.commissionPercent")}</label><input id="kzt-commission" type="number" step="0.01" value="5"></div>
          <div class="field"><label for="kzt-fee">${app.t("labels.fixedFee")}</label><input id="kzt-fee" type="number" step="0.01" value="1000"></div>
          <div class="field"><label for="kzt-tax">${app.t("labels.taxPercent")}</label><input id="kzt-tax" type="number" step="0.01" value="3"></div>
          <div class="field"><label for="kzt-bonus">${app.t("labels.bonusPercent")}</label><input id="kzt-bonus" type="number" step="0.01" value="0"></div>
        </div>
        <p class="note">${app.t("messages.financialNote")}</p>
        <div class="tool-actions">
          <button class="tool-button primary" id="kzt-calculate" type="button">${app.t("actions.calculate")}</button>
          <button class="tool-button secondary" id="kzt-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="kzt-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="kzt-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <div class="result-summary" id="kzt-output"></div>
        <p class="tool-status" id="kzt-status" aria-live="polite"></p>
      `;
      const output = container.querySelector("#kzt-output");
      const status = container.querySelector("#kzt-status");
      let latest = "";
      container.querySelector("#kzt-calculate").addEventListener("click", () => {
        const amount = app.toNumber(container.querySelector("#kzt-amount").value);
        const commission = amount * app.toNumber(container.querySelector("#kzt-commission").value) / 100;
        const fixed = app.toNumber(container.querySelector("#kzt-fee").value);
        const tax = amount * app.toNumber(container.querySelector("#kzt-tax").value) / 100;
        const bonus = amount * app.toNumber(container.querySelector("#kzt-bonus").value) / 100;
        const net = amount - commission - fixed - tax + bonus;
        latest = [
          `Commission: ${money(commission)}`,
          `Fixed fee: ${money(fixed)}`,
          `Tax: ${money(tax)}`,
          `Bonus: ${money(bonus)}`,
          `Net amount: ${money(net)}`
        ].join("\n");
        output.textContent = latest;
        app.setStatus(status, app.t("messages.generated"), "success");
      });
      container.querySelector("#kzt-copy").addEventListener("click", () => app.copyText(latest, status));
      container.querySelector("#kzt-save").addEventListener("click", () => app.saveResult("kzt", latest, status));
      container.querySelector("#kzt-clear").addEventListener("click", () => {
        app.clearInputs(container);
        output.textContent = "";
        latest = "";
      });
    }
  };
})();
