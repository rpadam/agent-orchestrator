# Agent Orchestrator

This repo is a reusable documentation + skill package for planning and delegating complex software work across multiple AI agents.

Use it when you want:

- one planner agent to break work into bounded tasks
- predictable sequencing (sequential by default)
- optional safe parallel execution with explicit consent
- model routing by task difficulty and risk
- review gates before marking tasks complete
- token cost estimates and completion usage logs
- parent planner model/token logging in the project plan

## Start Here

Core docs:

- [PLAYBOOK.md](./PLAYBOOK.md)
- [PLAN_TEMPLATE.md](./PLAN_TEMPLATE.md)
- [TASK_TEMPLATE.md](./TASK_TEMPLATE.md)
- [REVIEW_TEMPLATE.md](./REVIEW_TEMPLATE.md)
- [MODEL_ROUTING.md](./MODEL_ROUTING.md)

Agent-facing skill:

- [skills/multi-agent-delegation/SKILL.md](./skills/multi-agent-delegation/SKILL.md)

Installation and usage:

- [docs/INSTALL.md](./docs/INSTALL.md)
- [docs/INVOKE.md](./docs/INVOKE.md)
- [docs/PRACTICALS.md](./docs/PRACTICALS.md)

Note:

- Codex users should ensure `skill-installer` is available before using this skill (see `docs/INSTALL.md`).

## What This Solves

This is not a fully automatic multi-agent runtime.

It provides a portable operating model that works across agentic tools:

- shared planning format
- bounded task format
- model routing policy
- reviewer checklist
- usage visibility for planning and execution

## Optional Structured Layer

If you want machine-readable manifests, use:

- [schemas/task-manifest.schema.json](./schemas/task-manifest.schema.json)

## CLI Helper

The code in `src/` is a lightweight helper CLI for the skill workflow.

Use it to:

- validate task manifests
- list runnable tasks based on dependencies
- dispatch provider commands from adapter configs
- run per-task review checks
- run run-closeout checks for planner metadata accounting

Typical usage:

```bash
node ./src/cli.js validate --project /path/to/project --manifest orchestration/tasks.json
node ./src/cli.js plan --project /path/to/project --manifest orchestration/tasks.json
node ./src/cli.js run --project /path/to/project --manifest orchestration/tasks.json --task UI-01 --adapter orchestration/adapters.json --provider codex --dry-run
node ./src/cli.js review --project /path/to/project --manifest orchestration/tasks.json --task UI-01
node ./src/cli.js closeout --project /path/to/project --manifest orchestration/tasks.json
```
