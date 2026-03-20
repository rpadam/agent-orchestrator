# Agent Orchestrator

This repo is a reusable documentation + skill package for planning and delegating complex software work across multiple AI agents.

Use it when you want:

- one planner agent to break work into bounded tasks
- predictable sequencing (sequential by default)
- optional safe parallel execution with explicit consent
- model routing by task difficulty and risk
- review gates before marking tasks complete
- token cost estimates and completion usage logs

## Start Here

Core docs:

- [PLAYBOOK.md](./PLAYBOOK.md)
- [TASK_TEMPLATE.md](./TASK_TEMPLATE.md)
- [REVIEW_TEMPLATE.md](./REVIEW_TEMPLATE.md)
- [MODEL_ROUTING.md](./MODEL_ROUTING.md)

Agent-facing skill:

- [skills/multi-agent-delegation/SKILL.md](./skills/multi-agent-delegation/SKILL.md)

Installation and usage:

- [docs/INSTALL.md](./docs/INSTALL.md)
- [docs/INVOKE.md](./docs/INVOKE.md)
- [docs/PRACTICALS.md](./docs/PRACTICALS.md)

Example:

- [examples/tower-defense-game/README.md](./examples/tower-defense-game/README.md)

## What This Solves

This is not a fully automatic multi-agent runtime.

It provides a portable operating model that works across agentic tools:

- shared planning format
- bounded task format
- model routing policy
- reviewer checklist
- structured task manifest (optional)

## Optional Structured Layer

If you want machine-readable manifests, use:

- [schemas/task-manifest.schema.json](./schemas/task-manifest.schema.json)
- [examples/adapters.example.json](./examples/adapters.example.json)
