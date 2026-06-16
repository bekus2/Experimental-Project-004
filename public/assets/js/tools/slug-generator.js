/**
 * Project: Freelancer Web Toolbox
 * File: slug-generator.js
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Converts Russian, Kazakh, and English text into URL-friendly Latin slugs.
 * RU: Преобразует русский, казахский и английский текст в URL-friendly латинские slug.
 */
(function () {
  "use strict";

  const map = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z", и: "i", й: "i",
    к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
    х: "h", ц: "c", ч: "ch", ш: "sh", щ: "shch", ы: "y", э: "e", ю: "yu", я: "ya", ь: "", ъ: "",
    ә: "a", ғ: "g", қ: "q", ң: "n", ө: "o", ұ: "u", ү: "u", һ: "h", і: "i"
  };

  function transliterate(value) {
    return value
      .split("")
      .map((char) => {
        const lower = char.toLowerCase();
        return Object.prototype.hasOwnProperty.call(map, lower) ? map[lower] : char;
      })
      .join("");
  }

  function slugify(value) {
    return transliterate(value)
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-");
  }

  window.FWT_TOOLS = window.FWT_TOOLS || {};
  window.FWT_TOOLS.slugGenerator = {
    render(container, app) {
      container.innerHTML = `
        <div class="form-grid">
          <div class="field full"><label for="slug-input">${app.t("labels.textInput")}</label><textarea id="slug-input">Қазақ тілінде сайт жасау</textarea></div>
          <div class="field full"><label for="slug-output">${app.t("labels.output")}</label><textarea id="slug-output" readonly></textarea></div>
        </div>
        <div class="tool-actions">
          <button class="tool-button primary" id="slug-generate" type="button">${app.t("actions.generate")}</button>
          <button class="tool-button secondary" id="slug-copy" type="button">${app.t("actions.copy")}</button>
          <button class="tool-button secondary" id="slug-save" type="button">${app.t("actions.save")}</button>
          <button class="tool-button ghost" id="slug-clear" type="button">${app.t("actions.clear")}</button>
        </div>
        <p class="tool-status" id="slug-status" aria-live="polite"></p>
      `;
      const input = container.querySelector("#slug-input");
      const output = container.querySelector("#slug-output");
      const status = container.querySelector("#slug-status");
      container.querySelector("#slug-generate").addEventListener("click", () => {
        output.value = slugify(input.value);
        app.setStatus(status, app.t("messages.generated"), "success");
      });
      container.querySelector("#slug-copy").addEventListener("click", () => app.copyText(output.value, status));
      container.querySelector("#slug-save").addEventListener("click", () => app.saveResult("slug", output.value, status));
      container.querySelector("#slug-clear").addEventListener("click", () => app.clearInputs(container));
    },
    slugify
  };
})();
