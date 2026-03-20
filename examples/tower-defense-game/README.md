# Tower Defense Game Example

This is a concrete example of the multi-agent delegation workflow applied to a full game rewrite.

Use this example to see how planning, tasking, model routing, and review connect end-to-end.

## Project Root Convention

Use a portable placeholder in prompts and docs:

- `<project-root>`

For this example, `<project-root>` is the tower-defense-game repository root.

## Example Inputs

Planning files in the target project:

- `<project-root>/REWRITE_PLAN.md`
- `<project-root>/AGENT_TASKS.md`
- `<project-root>/AGENT_HANDOFF.md`
- `<project-root>/progress.md`

Prompt files in the target project:

- `<project-root>/.agent-prompts/UI-01.txt`
- `<project-root>/.agent-prompts/DATA-01.txt`
- `<project-root>/.agent-prompts/MAP-01.txt`
- `<project-root>/.agent-prompts/COMBAT-01.txt`
- `<project-root>/.agent-prompts/COMBAT-02.txt`
- `<project-root>/.agent-prompts/UI-02.txt`
- `<project-root>/.agent-prompts/QA-01.txt`
- `<project-root>/.agent-prompts/POLISH-01.txt`

Structured manifest files:

- `<project-root>/orchestration/tasks.json`
- `<project-root>/orchestration/model-policy.json`
- `<project-root>/orchestration/adapters.json` (optional)

## Why This Example Is Useful

- large enough to require decomposition
- clear subsystem boundaries (UI, data, map/path, combat, QA, polish)
- meaningful dependency chain
- cost-aware model routing and review gates

## Sequence

Recommended order:

1. `UI-01`
2. `DATA-01`
3. `MAP-01`
4. `COMBAT-01`
5. `COMBAT-02`
6. `UI-02`
7. `QA-01`
8. `POLISH-01`

## Parallelism Guidance

- Default is sequential.
- Parallel requires explicit user request or consent.
- In this example, `UI-01` and `DATA-01` are a safe first-wave parallel pair only with consent.

## Completion Standard

Do not mark a task complete unless all are true:

- agent stayed in allowed files
- verification commands passed
- acceptance criteria were met
- progress log was updated
- completion usage metadata was recorded

## Reuse Guidance

To adapt this example for a new project:

1. Replace project-specific plan and tasks.
2. Regenerate prompt files under `.agent-prompts/`.
3. Keep execution policy, model routing, and review gates.
