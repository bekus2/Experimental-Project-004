/**
 * Project: Freelancer Web Toolbox
 * File: security.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Security-oriented helpers for escaping, URL checks, and input normalization.
 * RU: Помощники безопасности для экранирования, проверки URL и нормализации ввода.
 */
(function () {
  "use strict";

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function setText(element, value) {
    if (element) {
      element.textContent = String(value ?? "");
    }
  }

  function normalizeText(value) {
    return String(value ?? "").trim();
  }

  function isHttpUrl(value) {
    try {
      const url = new URL(String(value));
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (error) {
      return false;
    }
  }

  function toNumber(value, fallbackValue = 0) {
    const number = Number(String(value).replace(",", "."));
    return Number.isFinite(number) ? number : fallbackValue;
  }

  window.FWT_SECURITY = {
    escapeHTML,
    setText,
    normalizeText,
    isHttpUrl,
    toNumber
  };
})();
