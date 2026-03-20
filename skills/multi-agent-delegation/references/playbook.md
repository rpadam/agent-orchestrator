# Multi-Agent Playbook

Use this pattern when a task is broad, multi-phase, easy to split by subsystem, and reviewable in pieces.

Do not use it when:

- one strong agent can handle the whole task cleanly
- every step edits the same files
- requirements are unclear
- there is no practical verification path

Core roles:

- Planner: defines the project plan, task graph, and acceptance criteria
- Implementer: executes one bounded task
- Reviewer: checks scope, verification, and quality

Planner flow:

1. Create or update the project orchestration directory at `orchestration/`.
2. Write a project plan using the plan template at `orchestration/PLAN.md`.
3. Record plan creation metadata for the parent planner agent.
4. Split work into task-sized units.
5. Write `orchestration/TASKS.md` as the canonical task index.
6. Create one standalone prompt file per task in `orchestration/tasks/`.
7. Decide whether each task's model routing is `enforced` or `advisory`.
8. Create per-platform dispatch files in `orchestration/dispatch/` when the user wants routing that can actually be executed.
9. Set execution mode to sequential by default.
10. Identify dependencies and safe parallelism.
11. Route each task to an appropriate model tier.
12. Add token estimate ranges per task.
13. Require verification on every task.
14. Require a review pass before marking a task complete.
15. Log completion metadata: model used and token usage fields.
16. Append handoff notes after each task.

Model selection defaults:

- cheap tier should usually map to `economy`
- medium tier should usually map to `balanced`
- high tier should usually map to `frontier`
- do not resolve provider-specific model IDs in the core task plan
- if choosing `frontier`, state why `balanced` is not a reasonable first pass
- prefer one cheaper attempt plus review over starting every task on the strongest class
- resolve concrete model IDs only in per-platform dispatch files or `orchestration/PLATFORM_MODEL_MAP.md`

Required project files:

- `orchestration/PLAN.md`
- `orchestration/TASKS.md`
- `orchestration/progress.md`
- `orchestration/tasks/TASK-XX.md` for every task

Optional supporting files:

- `orchestration/MODEL_ROUTING.md`
- `orchestration/PLATFORM_MODEL_MAP.md`
- `orchestration/dispatch/TASK-XX.codex.md`
- `orchestration/dispatch/TASK-XX.cursor.md`
- `orchestration/dispatch/TASK-XX.claude.md`
- `orchestration/reviews/TASK-XX-review.md`

Do not place skill-generated planning files at the repository root unless the user explicitly asks for a different layout.

Required plan metadata:

- `planner_agent_role`
- `planner_agent_label`
- `planner_provider`
- `planner_model_requested`
- `planner_model_actual`
- `planner_input_tokens_actual` (nullable)
- `planner_output_tokens_actual` (nullable)
- `planner_total_tokens_actual` (nullable)
- `planner_cost_actual_usd` (nullable)
- `plan_created_at`
- `planning_usage_notes`

If planning usage is unavailable on your platform, set usage fields to `null` and explain in notes.

Planner metadata is run-level accounting data.
Do not make implementer sub-agents validate it per task.

Good task size:

- one clear goal
- small explicit file set
- clear acceptance criteria
- reviewable without reading the whole repo

Parallelism:

- safe when tasks do not overlap in files or state ownership
- unsafe when two tasks change the same reducers, loop, stylesheet, or UI subsystem
- even safe pairs still require explicit user consent before running in parallel

Execution control:

- default to one task at a time
- parallel mode only if the user explicitly requests it or explicitly consents
- keep model routing unchanged regardless of sequential or parallel execution

Execution contract:

- model routing recommendations are not self-executing
- every task must declare whether routing is `enforced` or `advisory`
- use `enforced` only when the platform has an explicit launch path for the requested model
- if continuing in the current chat without model override, mark routing `advisory`
- dispatch artifacts should say exactly how the task will be launched on each supported platform

Platform notes:

- Codex: enforced routing requires a new agent or sub-agent launched with explicit model override
- Cursor: enforced routing requires a new agent, background agent, or CLI launch with explicit model selection
- Claude Code: enforced routing requires an explicit model-setting mechanism such as a model-specific custom command; subagents alone do not prove model enforcement

Token budgeting:

- estimate input and output token ranges before dispatch
- use ranges, not single-point guesses
- adjust future ranges based on actual usage

Review standard:

- a task is not complete until reviewed
- check scope adherence, changed files, acceptance criteria, verification results, and blockers
- check completion metadata includes model and token usage fields
- reject if verification was skipped or unrelated files changed

Task artifact standard:

- `orchestration/TASKS.md` is the index, not the only place tasks live
- each task must also exist as its own standalone file under `orchestration/tasks/`
- task files should be dispatch-ready and copy-pasteable without manual reconstruction
- dispatch files should exist when the user expects executable model-routing help across tools
