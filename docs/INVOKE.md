# Invocation Guide

Use this workflow to invoke the orchestrator consistently across tools.

## 1) Kickoff Prompt (Planner)

```text
Use the multi-agent delegation workflow.
Project root: <absolute-or-repo-root-path>
Read first: <plan file>, <task file>, <progress file if present>
Default execution mode: sequential.
Only plan parallel execution if I explicitly request it.
Apply model routing from MODEL_ROUTING.md.
Before tasking, write or update PLAN.md using PLAN_TEMPLATE.md.
Record plan creation metadata for the parent planner agent, including model and token usage fields.
Add token_estimate for each task.
Do not start implementation yet. Return a task list first.
```

## 2) Task Dispatch Prompt (Implementer)

```text
Implement only task <TASK-ID>.
Project root: <path>
Read: <plan>, <tasks>, <progress>
Allowed files: <list>
Forbidden files: <list>
Run verification commands from task definition.
Update progress log with changed files, verification result, blockers.
Record completion_usage with model + token fields (or null + reason if unavailable).
```

## 3) Review Prompt (Reviewer, Per Task)

```text
Review task <TASK-ID> using REVIEW_TEMPLATE.md.
Check scope, acceptance criteria, verification output, and regressions.
Verify completion_usage fields are present.
Do not block a task on planner metadata.
If failed, return a minimal correction task.
If passed, mark complete in progress log.
```

## 4) Execution Control

- Default: `sequential` (one task at a time).
- Parallel: only if user explicitly requests or consents.
- Parallel tasks must have no file overlap and no shared ownership risk.
- Model tier recommendations do not change because of parallel mode.

## 5) Required Plan Metadata

For the parent planner agent, `PLAN.md` must log:

- planner agent role and label
- requested model and actual model
- provider
- planning input, output, and total tokens
- planning cost (if tracked)
- plan creation timestamp
- notes if any fields are unavailable

## 6) Required Task Completion Metadata

For each completed task, log:

- requested model
- actual model used
- provider
- input tokens
- output tokens
- total tokens
- cost estimate (if tracked)

If any field is unavailable, write `null` and include a short note.


## 7) Run Closeout (Reviewer/Orchestrator)

At run closeout (not per task), verify planning metadata in PLAN.md:

- planner agent role and label
- requested and actual planner model
- planner token usage fields (or null with reason)
- planning cost field (or null with reason)
- plan creation timestamp
