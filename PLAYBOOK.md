# Multi-Agent Playbook

## Purpose

Use this playbook when one agent is likely to underperform because the task is:

- broad
- multi-phase
- easy to split by file or subsystem
- reviewable in pieces

Do not use this playbook when:

- the task is small enough for one strong agent
- the task touches the same files in every step
- requirements are unclear
- there is no practical way to verify intermediate output

## Core Pattern

Use a planner, one or more implementers, and a reviewer.

Roles:

- Planner: writes the project plan, task graph, and acceptance criteria
- Implementer: executes one bounded task
- Reviewer: checks scope, quality, and verification

Recommended flow:

1. Write a project plan using `PLAN_TEMPLATE.md`.
2. Record plan creation metadata for the parent planner agent.
3. Split work into task-sized units.
4. Identify dependencies and safe parallelism.
5. Route each task to an appropriate model tier.
6. Add a token estimate range for each task before execution.
7. Require verification on every task.
8. Require a review pass before marking a task complete.
9. Log completion metadata: model used and token usage.
10. Append handoff notes after each task.

## Execution Control

Default:

- sequential execution, one task at a time

Parallel:

- only when the user explicitly requests parallel execution or explicitly consents
- only for tasks that do not overlap in file ownership
- still respect the recommended model tier per task

If user consent for parallel execution is missing, stay sequential even if tasks look parallel-safe.

## Required Project Files

Each project using this pattern should contain:

- `PLAN.md` or equivalent rewrite plan
- `TASKS.md` with explicit task boundaries
- `progress.md` for handoff notes
- prompt files for each task, if you want copy-paste delegation
- optional machine-readable manifest for automation

## Required Plan Metadata

The project plan must include `Plan creation metadata` with:

- `planner_agent_role` (usually `parent_planner`)
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

If the platform cannot provide token usage for planning, set token fields to `null` and explain in `planning_usage_notes`.

Planner metadata is for run-level human review and cost accounting.
Do not require implementer sub-agents to validate it per task.

## Good Task Size

A task is well-sized when:

- it has one clear goal
- it edits a small, explicit set of files
- it has clear acceptance criteria
- it can be reviewed without reading the whole repo

Bad task:

- “Rewrite the UI and make the game better”

Good task:

- “Build the top HUD and right-side tower panel in `index.html`, `src/styles.css`, and `src/game/ui/*` without touching combat logic”

## When To Run Tasks In Parallel

Parallel is safe when tasks do not overlap in files or state ownership.

Usually safe:

- shell/UI layout plus pure data modeling
- art polish plus documentation

Usually unsafe:

- two combat tasks editing the same game loop
- UI task and state task both changing reducers
- two agents editing the same CSS file at once

Consent rule:

- safe parallelism is necessary but not sufficient
- explicit user consent is required before parallel execution

## Model Routing

Cheap models:

- bounded tasks
- data extraction
- state modularization
- straightforward refactors
- verification summaries

Medium models:

- most implementation work
- moderate multi-file edits
- UI tasks with some coordination
- core feature work

High-end models:

- architecture changes
- rescue tasks after failed reviews
- integration work touching many systems
- review of risky or complex code

Execution mode does not change model policy:

- sequential and parallel runs should use the same recommended model tier for each task

## Token Budgeting

Estimate per task before dispatch:

- `input_tokens_estimate_min`
- `input_tokens_estimate_max`
- `output_tokens_estimate_min`
- `output_tokens_estimate_max`

Store estimates as ranges, not single values.

Use rough guidance:

- cheap-tier bounded task: low range
- medium-tier multi-file task: medium range
- high-tier integration task: high range

After completion, compare estimate to actual usage and adjust future ranges.

## Completion Metadata

When a task is marked complete, record:

- `model_requested`
- `model_actual`
- `provider`
- `input_tokens_actual` (nullable if unavailable)
- `output_tokens_actual` (nullable if unavailable)
- `total_tokens_actual` (nullable if unavailable)
- `cost_actual_usd` (nullable if unavailable)
- `completed_at`

If the platform does not expose token counts, explicitly record `null` and include a note.

## Review Standard

A task is not complete just because the agent says it is complete.

The reviewer checks:

- scope adherence
- changed files
- acceptance criteria
- verification command results
- blockers and follow-up notes
- completion metadata presence (model + token usage fields)

Reject the task if:

- unrelated files were changed
- verification was skipped
- acceptance criteria were not actually met
- the agent silently changed scope

## Minimal Human Workflow

1. Create the plan using `PLAN_TEMPLATE.md`.
2. Create task files.
3. Start the first agent with one task only.
4. Review the result.
5. Mark complete or send back with a correction task.
6. Move to the next runnable task.

## Minimal Agent Workflow

Every implementer agent should:

1. Read the plan.
2. Read the task definition.
3. Read `progress.md`.
4. Stay inside the assigned scope.
5. Run required verification.
6. Update `progress.md`.
7. Leave a concise summary and blockers.
