/**
 * Project: Freelancer Web Toolbox
 * File: app.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Initializes the app, renders the dashboard, handles filtering, copying, and saved results.
 * RU: Инициализирует приложение, выводит панель, управляет фильтрацией, копированием и сохранениями.
 */
(function () {
  "use strict";

  const githubDescription = "Offline web toolbox for freelancers, developers, CRM integrators and small business automation.";
  const toolDefinitions = [
    { key: "json", category: "developer", module: "jsonTools" },
    { key: "base64", category: "developer", module: "base64Tools" },
    { key: "url", category: "developer", module: "urlTools" },
    { key: "utm", category: "marketing", module: "utmBuilder" },
    { key: "whatsapp", category: "crm", module: "whatsappLink" },
    { key: "telegram", category: "crm", module: "telegramLink" },
    { key: "password", category: "security", module: "passwordGenerator" },
    { key: "slug", category: "text", module: "slugGenerator" },
    { key: "meta", category: "seo", module: "metaPreview" },
    { key: "robots", category: "seo", module: "robotsGenerator" },
    { key: "sitemap", category: "seo", module: "sitemapGenerator" },
    { key: "webhook", category: "crm", module: "webhookViewer" },
    { key: "kzt", category: "business", module: "kztCalculator" },
    { key: "price", category: "business", module: "freelancePriceEstimator" },
    { key: "invoice", category: "business", module: "invoiceTextGenerator" },
    { key: "html", category: "developer", module: "htmlMinifier" },
    { key: "css", category: "developer", module: "cssMinifier" }
  ];
  const categories = ["all", "developer", "marketing", "crm", "business", "seo", "text", "security"];
  let activeCategory = "all";
  let activeToolKey = "";

  function t(path, fallback) {
    return window.FWT_I18N.t(path, fallback);
  }

  function createToolShell(toolKey) {
    const tool = getTool(toolKey);
    const categoryLabel = t(`categories.${tool.category}`);
    return `
      <div class="tool-panel-header">
        <div>
          <span class="category-chip">${categoryLabel}</span>
          <h2>${t(`tools.${tool.key}.name`)}</h2>
          <p>${t(`tools.${tool.key}.description`)}</p>
        </div>
      </div>
      <div class="tool-body"></div>
    `;
  }

  function getTool(key) {
    return toolDefinitions.find((tool) => tool.key === key);
  }

  function getToolSearchText(tool) {
    return [
      t(`tools.${tool.key}.name`),
      t(`tools.${tool.key}.description`),
      t(`categories.${tool.category}`)
    ].join(" ").toLowerCase();
  }

  function renderCategories() {
    const nav = document.getElementById("category-tabs");
    nav.textContent = "";
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "category-tab";
      button.textContent = category === "all" ? t("tools.all") : t(`categories.${category}`);
      button.setAttribute("aria-pressed", String(category === activeCategory));
      button.addEventListener("click", () => {
        activeCategory = category;
        renderCategories();
        renderDashboard();
      });
      nav.appendChild(button);
    });
  }

  function renderDashboard() {
    const dashboard = document.getElementById("tools-dashboard");
    const search = document.getElementById("tool-search");
    const query = (search.value || "").trim().toLowerCase();
    dashboard.textContent = "";
    const filtered = toolDefinitions.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const matchesQuery = !query || getToolSearchText(tool).includes(query);
      return matchesCategory && matchesQuery;
    });

    if (!filtered.length) {
      const empty = document.createElement("p");
      empty.className = "empty-card";
      empty.textContent = t("tools.noResults");
      dashboard.appendChild(empty);
      return;
    }

    filtered.forEach((tool) => {
      const card = document.createElement("article");
      card.className = "tool-card";
      const content = document.createElement("div");
      const chip = document.createElement("span");
      chip.className = "category-chip";
      chip.textContent = t(`categories.${tool.category}`);
      const title = document.createElement("h3");
      title.textContent = t(`tools.${tool.key}.name`);
      const description = document.createElement("p");
      description.textContent = t(`tools.${tool.key}.description`);
      content.append(chip, title, description);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tool-button primary";
      button.textContent = t("actions.open");
      button.addEventListener("click", () => openTool(tool.key));
      card.append(content, button);
      dashboard.appendChild(card);
    });
  }

  function openTool(toolKey) {
    const tool = getTool(toolKey);
    const module = window.FWT_TOOLS && window.FWT_TOOLS[tool.module];
    const workspace = document.getElementById("tool-workspace");
    if (!tool || !module || typeof module.render !== "function") {
      return;
    }
    activeToolKey = toolKey;
    workspace.innerHTML = createToolShell(toolKey);
    const body = workspace.querySelector(".tool-body");
    module.render(body, helpers);
    workspace.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function copyText(value, statusElement) {
    const text = String(value || "");
    if (!text.trim()) {
      setStatus(statusElement, t("messages.nothingToCopy"), "error");
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setStatus(statusElement, t("messages.copied"), "success");
      return true;
    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "readonly");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      textarea.remove();
      setStatus(statusElement, ok ? t("messages.copied") : t("messages.nothingToCopy"), ok ? "success" : "error");
      return ok;
    }
  }

  function saveResult(toolKey, value, statusElement) {
    if (!String(value || "").trim()) {
      setStatus(statusElement, t("messages.noOutput"), "error");
      return;
    }
    const ok = window.FWT_STORAGE.saveResult({
      toolKey,
      title: t(`tools.${toolKey}.name`),
      value
    });
    renderSavedResults();
    setStatus(statusElement, ok ? t("messages.saved") : t("messages.noOutput"), ok ? "success" : "error");
  }

  function setStatus(element, message, type = "") {
    if (!element) {
      return;
    }
    element.textContent = message;
    element.className = `tool-status ${type}`.trim();
  }

  function renderSavedResults() {
    const list = document.getElementById("saved-results-list");
    const results = window.FWT_STORAGE.getSavedResults();
    list.textContent = "";
    if (!results.length) {
      const empty = document.createElement("p");
      empty.textContent = t("saved.empty");
      list.appendChild(empty);
      return;
    }
    results.forEach((result) => {
      const item = document.createElement("article");
      item.className = "saved-item";
      const title = document.createElement("strong");
      title.textContent = result.title;
      const time = document.createElement("time");
      time.dateTime = result.createdAt;
      time.textContent = new Date(result.createdAt).toLocaleString();
      const value = document.createElement("div");
      value.className = "saved-value";
      value.textContent = result.value;
      const actions = document.createElement("div");
      actions.className = "button-row";
      const copy = document.createElement("button");
      copy.type = "button";
      copy.className = "tool-button secondary";
      copy.textContent = t("actions.copy");
      copy.addEventListener("click", () => copyText(result.value));
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "tool-button ghost";
      remove.textContent = t("actions.delete");
      remove.addEventListener("click", () => {
        window.FWT_STORAGE.deleteResult(result.id);
        renderSavedResults();
      });
      actions.append(copy, remove);
      item.append(title, time, value, actions);
      list.appendChild(item);
    });
  }

  function clearInputs(container) {
    container.querySelectorAll("input[type='text'], input[type='url'], input[type='number'], input[type='date'], textarea").forEach((input) => {
      input.value = "";
    });
    container.querySelectorAll(".tool-status").forEach((status) => setStatus(status, ""));
  }

  function renderToolAgain() {
    if (activeToolKey) {
      openTool(activeToolKey);
    }
  }

  function init() {
    window.FWT_I18N.init();
    renderCategories();
    renderDashboard();
    renderSavedResults();

    const search = document.getElementById("tool-search");
    search.addEventListener("input", renderDashboard);

    document.getElementById("copy-description").addEventListener("click", (event) => {
      copyText(githubDescription);
      event.currentTarget.textContent = t("actions.copied");
      window.setTimeout(() => {
        event.currentTarget.textContent = t("actions.copyGithubDescription");
      }, 1400);
    });

    document.getElementById("clear-saved-results").addEventListener("click", () => {
      window.FWT_STORAGE.clearSavedResults();
      renderSavedResults();
    });

    window.addEventListener("fwt:languageChanged", () => {
      renderCategories();
      renderDashboard();
      renderSavedResults();
      renderToolAgain();
    });
  }

  const helpers = {
    t,
    copyText,
    saveResult,
    setStatus,
    clearInputs,
    toNumber: window.FWT_SECURITY.toNumber
  };

  window.FWT_APP = helpers;
  document.addEventListener("DOMContentLoaded", init);
})();
