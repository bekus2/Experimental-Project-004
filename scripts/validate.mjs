/**
 * Project: Freelancer Web Toolbox
 * File: validate.mjs
 * Author: Beck Sarbassov
 * Version: 0.1.0
 * Release Date: 2026-06-16
 * Last Updated: 2026-06-16
 * Copyright: © Beck Sarbassov. All rights reserved.
 *
 * EN: Validates required repository files using only Node.js built-in modules.
 * RU: Проверяет обязательные файлы репозитория только встроенными модулями Node.js.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const requiredFiles = [
  "README.md",
  "HANDOFF.md",
  "PROJECT_CONTEXT.md",
  "Codex_History.md",
  "TASK.md",
  "AI_RULES.md",
  "LICENSE",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  ".gitignore",
  ".env.example",
  "index.html",
  "public/index.html",
  "public/manifest.json",
  "public/robots.txt",
  "public/sitemap.xml",
  "public/assets/css/app.css",
  "public/assets/js/translations.js",
  "public/assets/js/i18n.js",
  "public/assets/js/storage.js",
  "public/assets/js/security.js",
  "public/assets/js/app.js",
  "public/assets/img/preview.svg",
  "docs/QUICK_START.md",
  "docs/FEATURES.md",
  "docs/PROJECT_STRUCTURE.md",
  "docs/LOCALIZATION.md",
  "docs/SECURITY_NOTES.md",
  "docs/DEPLOYMENT.md",
  "docs/ROADMAP.md",
  "docs/SCREENSHOTS.md",
  "ai/AI_RULES.md",
  "ai/TASK.md",
  "ai/PROJECT_CONTEXT.md",
  "ai/HANDOFF.md",
  "ai/PROMPTS.md",
  "examples/whatsapp-link-example/index.html",
  "examples/whatsapp-link-example/README.md",
  "examples/slug-generator-example/index.html",
  "examples/slug-generator-example/README.md",
  "examples/mini-lead-calculator/index.html",
  "examples/mini-lead-calculator/README.md"
];

const toolFiles = [
  "json-tools.js",
  "base64-tools.js",
  "url-tools.js",
  "utm-builder.js",
  "whatsapp-link.js",
  "telegram-link.js",
  "password-generator.js",
  "slug-generator.js",
  "meta-preview.js",
  "robots-generator.js",
  "sitemap-generator.js",
  "webhook-viewer.js",
  "kzt-calculator.js",
  "freelance-price-estimator.js",
  "invoice-text-generator.js",
  "html-minifier.js",
  "css-minifier.js"
].map((file) => `public/assets/js/tools/${file}`);

let failed = false;

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function pass(message) {
  console.log(`[OK] ${message}`);
}

function fail(message) {
  failed = true;
  console.error(`[FAIL] ${message}`);
}

function existsAndNotEmpty(relativePath) {
  const fullPath = filePath(relativePath);
  if (!fs.existsSync(fullPath)) {
    fail(`${relativePath} missing`);
    return false;
  }
  const stats = fs.statSync(fullPath);
  if (!stats.isFile()) {
    fail(`${relativePath} is not a file`);
    return false;
  }
  const content = fs.readFileSync(fullPath, "utf8");
  if (!content.trim()) {
    fail(`${relativePath} is empty`);
    return false;
  }
  pass(`${relativePath} found`);
  return true;
}

for (const relativePath of [...requiredFiles, ...toolFiles]) {
  existsAndNotEmpty(relativePath);
}

const translationsPath = filePath("public/assets/js/translations.js");
if (fs.existsSync(translationsPath)) {
  const translations = fs.readFileSync(translationsPath, "utf8");
  const hasLanguages = ["en:", "ru:", "kk:"].every((needle) => translations.includes(needle));
  if (hasLanguages) {
    pass("translations include en, ru, kk");
  } else {
    fail("translations.js must include en, ru, kk");
  }
}

const toolDir = filePath("public/assets/js/tools");
if (fs.existsSync(toolDir)) {
  const foundToolFiles = fs.readdirSync(toolDir).filter((file) => file.endsWith(".js"));
  if (foundToolFiles.length === 17) {
    pass("17 tool modules found");
  } else {
    fail(`expected 17 tool modules, found ${foundToolFiles.length}`);
  }
}

const readme = fs.existsSync(filePath("README.md")) ? fs.readFileSync(filePath("README.md"), "utf8") : "";
if (readme.includes("# Freelancer Web Toolbox") && readme.includes("Веб-инструменты для фрилансера")) {
  pass("README contains English and Russian sections");
} else {
  fail("README must contain English and Russian sections");
}

if (failed) {
  console.error("Validation failed.");
  process.exit(1);
}

console.log("Validation passed.");
