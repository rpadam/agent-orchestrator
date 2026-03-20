# Task Template

Use this format for every delegated task.

```text
Task ID: UI-01
Goal: Build the shell layout and title screen.

Project root:
/absolute/path/to/project

Execution mode:
- sequential

Parallel consent:
- not_granted

Read first:
- /absolute/path/to/project/PLAN.md
- /absolute/path/to/project/TASKS.md
- /absolute/path/to/project/progress.md

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
- updating progress.md
- summarizing changed files
- listing blockers honestly
```

## Rules

- Keep each task to one goal.
- Keep file scope explicit.
- Keep “do not” rules explicit.
- Make acceptance criteria observable.
- Make verification commands concrete.
- Default to sequential execution unless the user explicitly requests or approves parallel.
- If running in parallel, keep the same recommended model tier per task.
