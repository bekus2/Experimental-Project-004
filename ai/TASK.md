# New Tool Task Template

Author: Beck Sarbassov  
Date created: 2026-06-16  
Last updated: 2026-06-16  
Copyright: © Beck Sarbassov. All rights reserved.

## Tool Name

Write the exact public tool name.

## Problem Solved

Explain the practical freelance, web, CRM, marketing, SEO, text, business, or security workflow this tool improves.

## Input Fields

List each input field, type, default example value, validation rule, and privacy note.

## Output Fields

List generated outputs and copy behavior.

## Validation Rules

Describe required fields, value ranges, and friendly errors.

## Translations Required

Add tool name, description, labels, helper notes, and messages in:

- English
- Русский
- Қазақша

## Security Considerations

Explain how user input is displayed safely and what data users should avoid entering.

## Documentation Updates

Update:

- `README.md`
- `docs/FEATURES.md`
- `docs/PROJECT_STRUCTURE.md` if files change
- `Codex_History.md`
- `TASK.md` if acceptance changes

## Acceptance Criteria

- Tool appears in dashboard.
- Search and category filter find it.
- Tool works through `file://`.
- Output is copyable.
- User input is not rendered as raw HTML.
- `node scripts/validate.mjs` passes.
