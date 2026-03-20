---
name: "multi-agent-delegation"
description: "Use when a project should be planned and executed by multiple coding agents with bounded task scopes, dependency-aware sequencing, explicit verification, and reviewer handoffs. This skill is for creating task graphs, choosing safe parallelism, routing model tiers, and instructing each agent how to read plan files, stay in scope, verify work, and update progress logs."
---

# Multi-Agent Delegation

Use this skill when one agent should break a larger software task into multiple bounded tasks for other agents.

Keep `SKILL.md` loaded for the operating rules. Read bundled references only when needed:

- `references/playbook.md` for the human workflow being implemented
- `references/plan-template.md` when drafting `PLAN.md`
- `references/task-template.md` when drafting task definitions
- `references/review-template.md` when reviewing completed tasks
- `references/model-routing.md` when choosing model tiers

## Read First

Before planning or delegating, read the target project's:

- plan file such as `PLAN.md`, `REWRITE_PLAN.md`, or equivalent
- task file such as `TASKS.md`, `AGENT_TASKS.md`, or equivalent
- `progress.md` if it exists

If those files do not exist, create them before dispatching implementation work.

## Planner Workflow

1. Understand the project goal and current code layout.
2. Write or update `PLAN.md` using the plan template structure.
3. Record parent planner metadata in the plan, including model and token usage fields.
4. Split the work into tasks with clear file boundaries.
5. Add dependency order.
6. Set execution mode to `sequential` by default.
7. Mark which tasks can safely run in parallel.
8. Add token estimate ranges for every task.
9. Define verification commands for every task.
10. Define reviewer criteria for every task.

## Parent Planner Metadata Requirement

The project plan must include:

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

If usage metrics are unavailable, set to `null` and document why.

Planner metadata is for run-level human review and accounting.
Implementer sub-agents do not need to validate planner metadata.

## Execution Mode Control

Default behavior:

- run one task at a time (`sequential`)

Parallel behavior:

- only use if the user explicitly requests it or explicitly consents
- only parallelize tasks with no file overlap and no shared ownership risk
- keep the model-routing policy unchanged in parallel mode

When planning, always include:

- `execution_mode: sequential` or `execution_mode: parallel`
- `parallel_consent: explicit` or `parallel_consent: not_granted`
- a short justification if `execution_mode: parallel`
- token estimate range fields for input and output

A good task has:

- one goal
- explicit files to edit
- explicit forbidden areas
- concrete acceptance criteria
- concrete verification

Avoid vague tasks like:

- “make the UI better”
- “refactor the app”

Prefer tasks like:

- “build the shell layout in `index.html`, `src/styles.css`, and `src/ui/*` without touching combat logic”

## Implementer Instructions

Every delegated agent should be told to:

1. Work only in the target project root.
2. Read the project plan, task file, and `progress.md`.
3. Implement only the assigned task.
4. Avoid unrelated changes.
5. Run required verification.
6. Update `progress.md` with:
   - what changed
   - blockers
   - next useful handoff notes
7. Log completion metadata with model used and token usage fields.

If the task is underspecified or overlaps another task, stop and report that before editing.

## Reviewer Instructions

A task is not complete until reviewed.

The reviewer checks:

- scope adherence
- changed files
- acceptance criteria
- verification output
- obvious bugs or regressions
- completion metadata presence (model used and token usage fields)
- planner metadata only during run closeout, not as a per-task block

If the task fails review:

- either send it back with a smaller correction task
- or escalate to a stronger model only if complexity is the issue

## Parallelism Rules

Run tasks in parallel only when they do not overlap in files or state ownership.

Usually safe:

- shell UI plus pure data modeling
- docs plus code unrelated to docs

Usually unsafe:

- two tasks editing the same reducer, loop, or stylesheet
- two tasks changing the same UI panel system

If parallel consent is not explicitly granted, do not run safe pairs in parallel anyway.

## Model Routing

Use the cheapest model likely to succeed.

Cheap tier:

- bounded tasks
- simple refactors
- docs
- verification summaries

Medium tier:

- default implementation tasks
- most multi-file work

High tier:

- architecture
- integration rescue
- risky review work

For more detail, read `references/model-routing.md`.

## Output Format For Task Definitions

When writing tasks, use this structure:

```text
Task ID: TASK-01
Goal: one sentence
Project root: /absolute/path
Read first:
- /absolute/path/PLAN.md
- /absolute/path/TASKS.md
- /absolute/path/progress.md
Files to edit:
- path
Files allowed to create:
- path
Do this:
- item
Do not do this:
- item
Acceptance:
- item
Verification:
- command
Finish by:
- update progress.md
- log completion metadata (model and token usage)
```

## References

Read these when needed:

- `references/playbook.md`
- `references/plan-template.md`
- `references/task-template.md`
- `references/review-template.md`
- `references/model-routing.md`
