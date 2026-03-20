# Platform Model Map Template

Use this template for `orchestration/PLATFORM_MODEL_MAP.md` when the project needs concrete model mappings for one or more execution platforms.

Do not treat this file as required for portable planning.
Create it only when the user wants concrete dispatch mappings.

```text
# Platform Model Map

## Routing classes
- economy
- balanced
- frontier

## Codex
- economy: <model id or unresolved>
- balanced: <model id or unresolved>
- frontier: <model id or unresolved>

## Cursor
- economy: <model id or unresolved>
- balanced: <model id or unresolved>
- frontier: <model id or unresolved>

## Claude Code
- economy: <model id or unresolved>
- balanced: <model id or unresolved>
- frontier: <model id or unresolved>

## Notes
- <platform-specific constraints, defaults, or verification notes>
```

Rules:

- the mapping file is project-local and platform-specific
- task files should reference routing classes, not concrete model IDs
- dispatch artifacts may resolve a routing class using this file
- if a mapping is unknown, write `unresolved` rather than guessing
