/**
 * Project: Freelancer Web Toolbox
 * File: i18n.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Applies EN/RU/KK translations and persists the selected UI language.
 * RU: Применяет переводы EN/RU/KK и сохраняет выбранный язык интерфейса.
 */
(function () {
  "use strict";

  const supported = ["en", "ru", "kk"];
  let currentLanguage = "en";

  function getValue(path, language = currentLanguage) {
    const dictionary = window.FWT_TRANSLATIONS || {};
    const parts = String(path).split(".");
    let cursor = dictionary[language] || dictionary.en || {};
    for (const part of parts) {
      if (!cursor || typeof cursor !== "object" || !(part in cursor)) {
        cursor = null;
        break;
      }
      cursor = cursor[part];
    }
    if (cursor === null || typeof cursor === "undefined") {
      let fallback = dictionary.en || {};
      for (const part of parts) {
        fallback = fallback && typeof fallback === "object" ? fallback[part] : undefined;
      }
      return typeof fallback === "undefined" ? path : fallback;
    }
    return cursor;
  }

  function apply(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = getValue(element.getAttribute("data-i18n"));
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.setAttribute("placeholder", getValue(element.getAttribute("data-i18n-placeholder")));
    });
    document.documentElement.lang = currentLanguage;
  }

  function setLanguage(language) {
    currentLanguage = supported.includes(language) ? language : "en";
    window.FWT_STORAGE.setLanguage(currentLanguage);
    const select = document.getElementById("language-select");
    if (select) {
      select.value = currentLanguage;
    }
    apply();
    window.dispatchEvent(new CustomEvent("fwt:languageChanged", { detail: { language: currentLanguage } }));
  }

  function init() {
    const saved = window.FWT_STORAGE.getLanguage();
    currentLanguage = supported.includes(saved) ? saved : "en";
    const select = document.getElementById("language-select");
    if (select) {
      select.value = currentLanguage;
      select.addEventListener("change", () => setLanguage(select.value));
    }
    apply();
  }

  window.FWT_I18N = {
    supported,
    init,
    apply,
    setLanguage,
    getLanguage() {
      return currentLanguage;
    },
    t(path, fallback) {
      const value = getValue(path);
      return value === path && typeof fallback !== "undefined" ? fallback : value;
    }
  };
})();
