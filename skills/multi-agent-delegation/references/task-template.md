# Task Template

Use this format for every delegated task file in `orchestration/tasks/`:

Create these files only after the user approves the draft task list.

```text
Task ID: UI-01
Goal: Build the shell layout and title screen.

Project root:
/absolute/path/to/project

Model class requested:
<economy|balanced|frontier>

Reasoning requested:
<low|medium|high|xhigh>

Model selection rationale:
<why this model class is economical for this task, and why a cheaper class would or would not be sufficient>

Model enforcement:
<enforced|advisory>

Dispatch mechanism:
<current_session|codex_subagent|cursor_agent|cursor_background_agent|claude_subagent|claude_custom_command|manual>

Fallback if unavailable:
<what to do if the requested model cannot be launched>

Execution mode:
- sequential

Parallel consent:
- not_granted

Token estimate:
- input_tokens_estimate_min: 0
- input_tokens_estimate_max: 0
- output_tokens_estimate_min: 0
- output_tokens_estimate_max: 0

Read first:
- /absolute/path/to/project/orchestration/PLAN.md
- /absolute/path/to/project/orchestration/TASKS.md
- /absolute/path/to/project/orchestration/progress.md

Files to edit:
- path/a
- path/b

Files allowed to create:
- path/c
- path/d

Do this:
- item
- item

Do not do this:
- item
- item

Acceptance:
- item
- item

Verification:
- command
- command

Finish by:
- updating orchestration/progress.md
- summarizing changed files
- listing blockers honestly

Completion metadata:
- model_requested:
- model_actual:
- provider:
- input_tokens_actual:
- output_tokens_actual:
- total_tokens_actual:
- cost_actual_usd:
- completed_at:
- usage_notes:
```

Rules:

- keep each task to one goal
- store every delegated task as its own file under `orchestration/tasks/`
- do not create task files before the user approves the draft task list
- do not claim a requested model will be used unless the dispatch mechanism can actually enforce it
- do not hardcode provider-specific model IDs in task files
- if selecting `frontier`, explicitly justify why `balanced` is not a good first pass
- make file scope explicit
- make “do not” rules explicit
- make acceptance criteria observable
- make verification commands concrete
- default to sequential unless the user explicitly requests or approves parallel
- if parallel is approved, preserve the recommended model tier per task
- include token estimate ranges before dispatch
- log model-used and token-usage fields at completion (use null if unavailable)
- keep the matching entry in `orchestration/TASKS.md` concise and point to the standalone task file
