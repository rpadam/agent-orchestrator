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
2. If the project goal is missing or vague, ask only for the project goal first.
3. After the user answers, restate your understanding and ask for confirmation.
4. Ask about model preferences separately and make clear that answering is optional.
5. If the user does not provide model preferences, state that the default routing policy will be used.
6. Ask only the minimum additional clarifying questions needed to avoid planning the wrong thing.
7. Write a project plan using the plan template at `orchestration/PLAN.md`.
8. Record plan creation metadata for the parent planner agent.
9. Split work into task-sized units.
10. Write `orchestration/TASKS.md` as a draft task index.
11. Return the draft task list in chat using only goal, dependencies, and suggested routing class.
12. After user approval, create one standalone prompt file per task in `orchestration/tasks/`.
13. Decide whether each approved task's model routing is `enforced` or `advisory`.
14. Create per-platform dispatch files in `orchestration/dispatch/` when the user wants routing that can actually be executed.
15. Set execution mode to sequential by default.
16. Identify dependencies and safe parallelism.
17. Route each task to an appropriate model tier.
18. Add token estimate ranges per task.
19. Require verification on every task.
20. Require a review pass before marking a task complete.
21. Log completion metadata: model used and token usage fields.
22. Update task status in `orchestration/TASKS.md`.
23. Append handoff notes after each task.

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

Optional supporting files:

- `orchestration/MODEL_ROUTING.md`
- `orchestration/PLATFORM_MODEL_MAP.md`
- `orchestration/tasks/TASK-XX.md` for every approved task
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
- check `orchestration/TASKS.md` and `orchestration/progress.md` agree with the task file
- reject if verification was skipped or unrelated files changed

Completion protocol:

- a task is complete only when its task file metadata is filled in, its review artifact exists and is approved, its status is updated in `orchestration/TASKS.md`, and its completion is logged in `orchestration/progress.md`
- a summary in chat is never enough to mark a task complete
- if `orchestration/TASKS.md` is still `draft`, no task should be represented as complete

Task artifact standard:

- `orchestration/TASKS.md` is the index, not the only place tasks live
- before approval, `orchestration/TASKS.md` must be clearly marked `draft`
- before approval, do not create standalone task files
- after approval, each task must also exist as its own standalone file under `orchestration/tasks/`
- task files should be dispatch-ready and copy-pasteable without manual reconstruction
- dispatch files should exist when the user expects executable model-routing help across tools
