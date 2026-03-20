# Dispatch Template

Use this format for per-platform dispatch files in `orchestration/dispatch/`.

Create one file per task per platform only when that platform is relevant to the user or repo workflow.

Suggested filenames:

- `orchestration/dispatch/TASK-01.codex.md`
- `orchestration/dispatch/TASK-01.cursor.md`
- `orchestration/dispatch/TASK-01.claude.md`

```text
# Dispatch: TASK-01 on <platform>

Task file:
- orchestration/tasks/TASK-01.md

Routing summary:
- model_class_requested: <economy|balanced|frontier>
- platform_model_requested: <provider-specific model id or unresolved>
- reasoning_requested: <low|medium|high|xhigh>
- model_enforcement: <enforced|advisory>
- dispatch_mechanism: <mechanism>
- fallback_if_unavailable: <fallback>

Launch instructions:
1. <exact way to launch this task on the platform>
2. <how to verify the launched agent/session is using the requested model>
3. <what to do if the requested model is unavailable>

Session requirements:
- read orchestration/PLAN.md
- read orchestration/TASKS.md
- read orchestration/tasks/TASK-01.md
- read orchestration/progress.md

Notes:
- <platform-specific caveats>
```

Rules:

- if you cannot describe a real launch path that sets the requested model, set `model_enforcement: advisory`
- concrete model IDs belong here, not in the core task files
- prefer project-relative paths over user-specific absolute filesystem paths
- Codex dispatch should only claim `enforced` when the task is launched through a new agent or sub-agent with model override
- Cursor dispatch should only claim `enforced` when the task is launched through a new agent, background agent, or CLI invocation with explicit model selection
- Claude Code dispatch should only claim `enforced` when the task is launched through an explicit model-setting mechanism such as a model-specific custom command
- do not write fake commands or invented product features
