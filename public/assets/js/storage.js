/**
 * Project: Freelancer Web Toolbox
 * File: storage.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Provides safe LocalStorage helpers for language, preferences, and saved tool results.
 * RU: Предоставляет безопасные помощники LocalStorage для языка, настроек и сохранённых результатов.
 */
(function () {
  "use strict";

  const prefix = "fwt:";
  const keys = {
    language: `${prefix}language`,
    savedResults: `${prefix}saved-results`
  };

  function read(key, fallbackValue) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? fallbackValue : JSON.parse(raw);
    } catch (error) {
      return fallbackValue;
    }
  }

  function write(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function remove(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  function getSavedResults() {
    const results = read(keys.savedResults, []);
    return Array.isArray(results) ? results : [];
  }

  function saveResult(result) {
    const safeResult = {
      id: `result-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      toolKey: String(result.toolKey || "tool"),
      title: String(result.title || "Saved result").slice(0, 120),
      value: String(result.value || "").slice(0, 12000),
      createdAt: new Date().toISOString()
    };
    const next = [safeResult, ...getSavedResults()].slice(0, 40);
    return write(keys.savedResults, next);
  }

  function deleteResult(id) {
    const next = getSavedResults().filter((item) => item.id !== id);
    return write(keys.savedResults, next);
  }

  window.FWT_STORAGE = {
    keys,
    read,
    write,
    remove,
    getLanguage() {
      return read(keys.language, "en");
    },
    setLanguage(language) {
      return write(keys.language, language);
    },
    getSavedResults,
    saveResult,
    deleteResult,
    clearSavedResults() {
      return remove(keys.savedResults);
    }
  };
})();
