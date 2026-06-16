/**
 * Project: Freelancer Web Toolbox
 * File: meta-preview.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Builds a safe search-style preview for meta title and description text.
 * RU: Создаёт безопасное превью title и description в стиле поисковой выдачи.
 */
(function () {
  "use strict";

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.metaPreview = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field"><label for="meta-title">${app.t("labels.pageTitle")}</label><input id="meta-title" type="text" value="Freelancer Web Toolbox"></div>
          <div class="field"><label for="meta-url">${app.t("labels.url")}</label><input id="meta-url" type="url" value="https://example.com"></div>
          <div class="field full"><label for="meta-description">${app.t("labels.metaDescription")}</label><textarea id="meta-description">Offline web toolbox for freelancers, developers, CRM integrators and small business automation.</textarea></div>
        </div>
        <div class="tool-actions">
          <button class="tool-button primary" id="meta-generate" type="button">${app.t("actions.generate")}</button>
          <button class="tool-button secondary" id="meta-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="meta-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="meta-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <div class="preview-box" id="meta-preview" aria-live="polite"></div>
        <p class="tool-status" id="meta-status" aria-live="polite"></p>
      `;
      const preview = container.querySelector("#meta-preview");
      const status = container.querySelector("#meta-status");
      let latest = "";

      function renderPreview() {
        const title = container.querySelector("#meta-title").value.trim();
        const url = container.querySelector("#meta-url").value.trim();
        const description = container.querySelector("#meta-description").value.trim();
        preview.textContent = "";
        const titleEl = document.createElement("div");
        titleEl.className = "search-preview-title";
        titleEl.textContent = title || "Untitled page";
        const urlEl = document.createElement("div");
        urlEl.className = "search-preview-url";
        urlEl.textContent = url || "https://example.com";
        const descEl = document.createElement("p");
        descEl.className = "search-preview-desc";
        descEl.textContent = description || "No description provided.";
        const advice = document.createElement("p");
        const titleAdvice = title.length <= 60 ? app.t("messages.titleGood") : app.t("messages.titleLong");
        const descAdvice = description.length <= 160 ? app.t("messages.descGood") : app.t("messages.descLong");
        advice.textContent = `${title.length} title chars. ${description.length} description chars. ${titleAdvice} ${descAdvice}`;
        preview.append(titleEl, urlEl, descEl, advice);
        latest = `${title}\n${url}\n${description}\n\n${advice.textContent}`;
        app.setStatus(status, app.t("messages.generated"), "success");
      }

      container.querySelector("#meta-generate").addEventListener("click", renderPreview);
      container.querySelector("#meta-copy").addEventListener("click", () => app.copyText(latest, status));
      container.querySelector("#meta-save").addEventListener("click", () => app.saveResult("meta", latest, status));
      container.querySelector("#meta-clear").addEventListener("click", () => {
        app.clearInputs(container);
        preview.textContent = "";
        latest = "";
      });
    }
  };
})();
