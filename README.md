# Agent Orchestrator

This repo is a reusable package for planning and delegating complex software work across multiple agents and multiple agent platforms.

Use it when you want:

- one agent to plan work for other agents
- tasks split into clear, reviewable chunks
- explicit file boundaries
- model routing by task difficulty
- a reviewer pass before calling work complete

This repo is intentionally split into:

- human-facing docs
- an agent-facing skill
- optional machine-readable scaffolding

## Start Here

For humans:

- [PLAYBOOK.md](./PLAYBOOK.md)
- [TASK_TEMPLATE.md](./TASK_TEMPLATE.md)
- [REVIEW_TEMPLATE.md](./REVIEW_TEMPLATE.md)
- [MODEL_ROUTING.md](./MODEL_ROUTING.md)

For agents:

- [skills/multi-agent-delegation/SKILL.md](./skills/multi-agent-delegation/SKILL.md)

Concrete example:

- [examples/tower-defense-game/README.md](./examples/tower-defense-game/README.md)

## What This Solves

This is not a fully automatic multi-agent platform.

It gives you:

- a repeatable planning pattern
- a portable task format
- a reusable review format
- a skill that tells an agent how to read plans, stay in scope, verify work, and hand off cleanly

That is the part most teams actually need first.

## Optional Structured Layer

If you want machine-readable task manifests later, this repo also includes a lightweight structured layer:

- [schemas/task-manifest.schema.json](./schemas/task-manifest.schema.json)
- [examples/adapters.example.json](./examples/adapters.example.json)

You can ignore that until manual use becomes painful.

## Recent Updates

- Added explicit execution policy:
  - default mode is sequential
  - parallel mode requires explicit user request or consent
  - model-tier routing remains unchanged between sequential and parallel modes
- Added token estimation guidance:
  - estimate input/output token ranges per task before dispatch
  - use ranges instead of single-point estimates
- Added completion usage tracking guidance:
  - record requested model, actual model, provider, and token usage fields
  - if usage is unavailable, record `null` with a note
- Updated task manifest schema to support:
  - `token_estimate` per task
  - `completion_usage` per task
