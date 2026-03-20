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
7. Set execution mode to sequential by default.
8. Identify dependencies and safe parallelism.
9. Route each task to an appropriate model tier.
10. Add token estimate ranges per task.
11. Require verification on every task.
12. Require a review pass before marking a task complete.
13. Log completion metadata: model used and token usage fields.
14. Append handoff notes after each task.

Required project files:

- `orchestration/PLAN.md`
- `orchestration/TASKS.md`
- `orchestration/progress.md`
- `orchestration/tasks/TASK-XX.md` for every task

Optional supporting files:

- `orchestration/MODEL_ROUTING.md`
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
