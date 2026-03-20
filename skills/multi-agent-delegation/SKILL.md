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
- `references/dispatch-template.md` when drafting per-platform dispatch files
- `references/platform-model-map-template.md` when drafting `PLATFORM_MODEL_MAP.md`
- `references/review-template.md` when reviewing completed tasks
- `references/model-routing.md` when choosing model tiers

## Artifact Layout

Unless the user explicitly requests a different location, store all files created by this skill under a single project-root directory:

- `orchestration/PLAN.md`
- `orchestration/TASKS.md`
- `orchestration/progress.md`
- `orchestration/MODEL_ROUTING.md`
- `orchestration/PLATFORM_MODEL_MAP.md`
- `orchestration/tasks/TASK-XX.md`
- `orchestration/dispatch/TASK-XX.codex.md`
- `orchestration/dispatch/TASK-XX.cursor.md`
- `orchestration/dispatch/TASK-XX.claude.md`
- `orchestration/reviews/TASK-XX-review.md`

Do not scatter skill-generated files across the project root.
If legacy root-level planning files already exist, read them first, then migrate or replace them under `orchestration/` before dispatching new work.

## Path Style

Prefer project-relative paths in all planning artifacts.

Rules:

- use paths like `orchestration/PLAN.md`, `src/game/*`, or `README.md`
- do not encode user-specific absolute filesystem paths in task files, dispatch files, or task indexes unless the user explicitly asks for absolute paths
- keep path wording stable across machines and repositories

## Read First

Before planning or delegating, read the target project's:

- `orchestration/PLAN.md`, `PLAN.md`, `REWRITE_PLAN.md`, or equivalent
- `orchestration/TASKS.md`, `TASKS.md`, `AGENT_TASKS.md`, or equivalent
- `orchestration/progress.md` or `progress.md` if either exists

If those files do not exist, create them under `orchestration/` before dispatching implementation work.

## Clarification Gate

Do not draft substantive plans from guesses.

Required interaction order for new or unclear projects:

1. If the project goal is missing or vague, ask only for the project goal first.
2. After the user answers, restate your understanding and ask for confirmation.
3. Ask about model preferences in a separate message. The user may decline or ignore this.
4. If the user does not provide model preferences, explicitly state that the default routing policy will be used.
5. Ask only the minimum additional clarifying questions needed to avoid planning the wrong thing.

Rules:

- never invent a product domain, app type, or prototype theme from an empty directory
- do not create a task list until the project goal has been confirmed
- `orchestration/` may be created before clarification is complete
- `PLAN.md` may be created before approval as a living draft
- `TASKS.md` may be created before approval only as a clearly marked draft index
- do not create `orchestration/tasks/*` before the user approves the draft task list
- after the user approves the draft task list, create all standalone task files immediately

## Planner Workflow

1. Understand the confirmed project goal and current code layout.
2. Write or update `PLAN.md` using the plan template structure.
3. Record parent planner metadata in the plan, including model and token usage fields.
4. Split the work into draft tasks with clear file boundaries.
5. Write or update `orchestration/TASKS.md` as a draft task index until the user approves it.
6. Return the draft task list in chat using only goal, dependencies, and suggested routing class.
7. After user approval, create one standalone task file per task in `orchestration/tasks/` using the task template.
8. For each approved task, record whether model routing is `advisory` or `enforced`.
9. Create per-platform dispatch files in `orchestration/dispatch/` only after approval and only when the user wants executable routing help.
10. Add dependency order.
11. Set execution mode to `sequential` by default.
12. Mark which tasks can safely run in parallel.
13. Add token estimate ranges for every task.
14. Define verification commands for every task.
15. Define reviewer criteria for every task.

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

## Model Routing Contract

Model routing must never be implied.
Every task must declare one of:

- `model_enforcement: enforced`
- `model_enforcement: advisory`

Use `enforced` only when the execution environment can actually launch the task on the requested model.
Use `advisory` when the task will run on the current session model unless a human launches it differently.

Every task must also include:

- `model_class_requested`
- `reasoning_requested`
- `dispatch_mechanism`
- `fallback_if_unavailable`

Recommended `model_class_requested` values:

- `economy`
- `balanced`
- `frontier`

Do not hardcode provider-specific model IDs in the core plan, task index, or standalone task files.
Concrete model IDs belong only in platform-specific dispatch artifacts or a project-local platform map such as `orchestration/PLATFORM_MODEL_MAP.md`.

Valid `dispatch_mechanism` examples:

- `current_session`
- `codex_subagent`
- `cursor_agent`
- `cursor_background_agent`
- `claude_subagent`
- `claude_custom_command`
- `manual`

Platform guidance:

- Codex: treat routing as enforceable only when launching a sub-agent or new agent with an explicit model override. If continuing in the same session, routing is advisory.
- Cursor: treat routing as enforceable only when launching a new agent, background agent, or CLI session with explicit model selection. If continuing in the same session, routing is advisory.
- Claude Code: treat routing as enforceable only when using a mechanism that explicitly sets the model, such as a model-specific custom command or equivalent supported launcher. Plain subagent use alone is not enough evidence of enforced routing.

Never tell the user “start TASK-01 next” without also stating whether the task will use the current session model or a routed model.

## Implementer Instructions

Every delegated agent should be told to:

1. Work only in the target project root.
2. Read `orchestration/PLAN.md`, `orchestration/TASKS.md`, the assigned file in `orchestration/tasks/`, and `orchestration/progress.md`.
3. Implement only the assigned task.
4. Avoid unrelated changes.
5. Run required verification.
6. Update `orchestration/progress.md` with:
   - what changed
   - blockers
   - next useful handoff notes
7. Log completion metadata with model used and token usage fields.
8. Update the task status in `orchestration/TASKS.md`.

If the task is underspecified or overlaps another task, stop and report that before editing.

## Completion Gate

Never call a task complete unless all required completion artifacts exist and agree.

Required completion artifacts:

- the task file in `orchestration/tasks/` has its `Completion metadata` block filled in
- `orchestration/TASKS.md` marks the task as completed or equivalent non-draft executed state
- `orchestration/progress.md` records the task completion with a dated handoff note
- a review artifact exists at `orchestration/reviews/TASK-XX-review.md`
- the review decision is `approved`

Rules:

- a chat message or parent-agent summary is not a completion artifact
- progress notes alone are not sufficient
- if completion metadata is missing, the task is incomplete even if code was written
- if the review artifact is missing or not approved, the task is incomplete
- if `orchestration/TASKS.md` is still marked `draft`, no task may be represented as complete

## Reviewer Instructions

A task is not complete until reviewed.

The reviewer checks:

- scope adherence
- changed files
- acceptance criteria
- verification output
- obvious bugs or regressions
- completion metadata presence (model used and token usage fields)
- task index status consistency
- progress log consistency
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

Use the cheapest model class likely to succeed.

Task tiers:

- cheap
- medium
- high

Default routing classes:

- cheap -> `economy`
- medium -> `balanced`
- high -> `frontier`

Economic bias:

- default to `economy` for bounded tasks and verification-oriented work
- default to `balanced` for most implementation work
- use `frontier` only when the task is architecture-sensitive, integration-heavy, or has already failed at a cheaper class
- if selecting `frontier`, explain why `balanced` is likely insufficient

For more detail, read `references/model-routing.md`.

## Output Format For Task Definitions

When writing the task index in `orchestration/TASKS.md`, include:

- draft status
- task ID
- goal
- dependency order
- execution mode
- parallel consent
- model routing
- model class requested
- model enforcement
- token estimate
- task file path
- dispatch file paths
- reviewer expectation

Before approval:

- mark `orchestration/TASKS.md` clearly as `draft`
- do not create standalone task files
- in chat, present only goal, dependencies, and suggested routing class

After approval:

- remove or update the `draft` marker in `orchestration/TASKS.md`
- create all standalone task files immediately
- create dispatch files only if needed

When writing each standalone task file in `orchestration/tasks/`, use this structure:

```text
Task ID: TASK-01
Goal: one sentence
Project root: .
Model class requested: <economy|balanced|frontier>
Reasoning requested: <low|medium|high|xhigh>
Model enforcement: <enforced|advisory>
Dispatch mechanism: <mechanism>
Fallback if unavailable: <what to do>
Read first:
- orchestration/PLAN.md
- orchestration/TASKS.md
- orchestration/progress.md
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
- update orchestration/progress.md
- log completion metadata (model and token usage)
```

## References

Read these when needed:

- `references/playbook.md`
- `references/plan-template.md`
- `references/task-template.md`
- `references/dispatch-template.md`
- `references/platform-model-map-template.md`
- `references/review-template.md`
- `references/model-routing.md`
