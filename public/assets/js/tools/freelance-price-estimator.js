/**
 * Project: Freelancer Web Toolbox
 * File: freelance-price-estimator.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Estimates freelance project pricing from hours, rate, complexity, buffer, and fees.
 * RU: Оценивает стоимость фриланс-проекта по часам, ставке, сложности, буферу и комиссиям.
 */
(function () {
  "use strict";

  function money(value, currency) {
    return `${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${currency}`;
  }

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.freelancePriceEstimator = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field"><label for="price-rate">${app.t("labels.hourlyRate")}</label><input id="price-rate" type="number" step="0.01" value="15000"></div>
          <div class="field"><label for="price-hours">${app.t("labels.estimatedHours")}</label><input id="price-hours" type="number" step="0.25" value="24"></div>
          <div class="field"><label for="price-complexity">${app.t("labels.complexity")}</label><input id="price-complexity" type="number" step="0.1" value="1.2"></div>
          <div class="field"><label for="price-buffer">${app.t("labels.revisionBuffer")}</label><input id="price-buffer" type="number" step="0.1" value="15"></div>
          <div class="field"><label for="price-tax">${app.t("labels.taxPercent")}</label><input id="price-tax" type="number" step="0.1" value="5"></div>
          <div class="field"><label for="price-currency">${app.t("labels.currency")}</label><select id="price-currency"><option>KZT</option><option>USD</option><option>EUR</option></select></div>
        </div>
        <p class="note">${app.t("messages.financialNote")}</p>
        <div class="tool-actions">
          <button class="tool-button primary" id="price-calculate" type="button">${app.t("actions.calculate")}</button>
          <button class="tool-button secondary" id="price-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="price-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="price-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <div class="result-summary" id="price-output"></div>
        <p class="tool-status" id="price-status" aria-live="polite"></p>
      `;
      const output = container.querySelector("#price-output");
      const status = container.querySelector("#price-status");
      let latest = "";
      container.querySelector("#price-calculate").addEventListener("click", () => {
        const rate = app.toNumber(container.querySelector("#price-rate").value);
        const hours = app.toNumber(container.querySelector("#price-hours").value);
        const complexity = Math.max(0.1, app.toNumber(container.querySelector("#price-complexity").value, 1));
        const bufferPercent = app.toNumber(container.querySelector("#price-buffer").value);
        const taxPercent = app.toNumber(container.querySelector("#price-tax").value);
        const currency = container.querySelector("#price-currency").value;
        const base = rate * hours * complexity;
        const buffer = base * bufferPercent / 100;
        const tax = (base + buffer) * taxPercent / 100;
        const final = base + buffer + tax;
        latest = [
          `Base price: ${money(base, currency)}`,
          `Revision buffer: ${money(buffer, currency)}`,
          `Tax/commission: ${money(tax, currency)}`,
          `Recommended final price: ${money(final, currency)}`,
          "Explanation: rate x hours x complexity, then buffer and tax/commission are added."
        ].join("\n");
        output.textContent = latest;
        app.setStatus(status, app.t("messages.generated"), "success");
      });
      container.querySelector("#price-copy").addEventListener("click", () => app.copyText(latest, status));
      container.querySelector("#price-save").addEventListener("click", () => app.saveResult("price", latest, status));
      container.querySelector("#price-clear").addEventListener("click", () => {
        app.clearInputs(container);
        output.textContent = "";
        latest = "";
      });
    }
  };
})();
