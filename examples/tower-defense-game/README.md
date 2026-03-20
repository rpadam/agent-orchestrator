# Tower Defense Game Example

This is the concrete example of the multi-agent delegation pattern applied to a real project.

Project root (example local path used during setup):

- `/Users/raphaeladam/development/tower-defense-game`

Use this example when you want to understand how the generic playbook maps onto an actual rewrite.

## Example Inputs

Project planning files:

- `REWRITE_PLAN.md`
- `AGENT_TASKS.md`
- `AGENT_HANDOFF.md`
- `progress.md`

Project prompt files:

- `/Users/raphaeladam/development/tower-defense-game/.agent-prompts/UI-01.txt`
- `/Users/raphaeladam/development/tower-defense-game/.agent-prompts/DATA-01.txt`
- `/Users/raphaeladam/development/tower-defense-game/.agent-prompts/MAP-01.txt`
- `/Users/raphaeladam/development/tower-defense-game/.agent-prompts/COMBAT-01.txt`
- `/Users/raphaeladam/development/tower-defense-game/.agent-prompts/COMBAT-02.txt`
- `/Users/raphaeladam/development/tower-defense-game/.agent-prompts/UI-02.txt`
- `/Users/raphaeladam/development/tower-defense-game/.agent-prompts/QA-01.txt`
- `/Users/raphaeladam/development/tower-defense-game/.agent-prompts/POLISH-01.txt`

Structured task manifest:

- `orchestration/tasks.json`
- `orchestration/model-policy.json`

## Why This Example Is Good

This example shows the full pattern:

- one large rewrite goal
- explicit architecture target
- tasks with bounded file ownership
- dependency-aware sequence
- model routing guidance
- review and handoff rules

It is a good example because the project is too large for one weak agent but still easy to split by subsystem.

## How The Generic Playbook Maps To This Project

Human-facing playbook item:

- Write a project plan

Tower defense example:

- `REWRITE_PLAN.md`

Human-facing playbook item:

- Define bounded tasks

Tower defense example:

- `AGENT_TASKS.md`

Human-facing playbook item:

- Provide copy-paste prompts

Tower defense example:

- `/Users/raphaeladam/development/tower-defense-game/.agent-prompts/*.txt`

Human-facing playbook item:

- Track handoff state

Tower defense example:

- `progress.md`

Human-facing playbook item:

- Optional machine-readable manifest

Tower defense example:

- `orchestration/tasks.json`

## Task Sequence In This Example

Use this order:

1. `UI-01`
2. `DATA-01`
3. `MAP-01`
4. `COMBAT-01`
5. `COMBAT-02`
6. `UI-02`
7. `QA-01`
8. `POLISH-01`

Reason:

- UI shell and data boundaries come first
- map and pathing come before combat polish
- tower management depends on working combat and state
- test hooks are checked after the game loop exists
- final polish happens last

## Safe Parallelism In This Example

Safe first-wave parallel pair:

- `UI-01`
- `DATA-01`

Why:

- one task focuses on shell and layout
- the other focuses on state and data structure

Unsafe pairs:

- `COMBAT-01` with `COMBAT-02`
- `UI-02` with anything editing `reducers.js`

## Example Task Handoff

The first task to hand out is `UI-01`.

The prompt file already exists at:

- `/Users/raphaeladam/development/tower-defense-game/.agent-prompts/UI-01.txt`

That prompt tells the agent to:

- work only in the project root
- read the plan and handoff files first
- edit only the allowed shell files
- run `npm run build`
- update `progress.md`

## Example Review Standard

For every completed task in this project, check:

- did the agent stay within allowed files?
- did the agent run `npm run build`?
- did the agent update `progress.md`?
- did the agent satisfy the task acceptance criteria?

If any answer is no, do not mark the task complete.

## Reuse Guidance

When adapting this pattern to another project:

1. Replace the rewrite plan.
2. Replace the task list.
3. Replace the prompt files.
4. Keep the same delegation and review structure.

Do not copy the tower defense tasks directly unless the new project has the same architecture and risk profile.
