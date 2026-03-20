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

- [`PLAYBOOK.md`](/Users/raphaeladam/development/agent-orchestrator/PLAYBOOK.md)
- [`TASK_TEMPLATE.md`](/Users/raphaeladam/development/agent-orchestrator/TASK_TEMPLATE.md)
- [`REVIEW_TEMPLATE.md`](/Users/raphaeladam/development/agent-orchestrator/REVIEW_TEMPLATE.md)
- [`MODEL_ROUTING.md`](/Users/raphaeladam/development/agent-orchestrator/MODEL_ROUTING.md)

For agents:

- [`skills/multi-agent-delegation/SKILL.md`](/Users/raphaeladam/development/agent-orchestrator/skills/multi-agent-delegation/SKILL.md)

Concrete example:

- [`examples/tower-defense-game/README.md`](/Users/raphaeladam/development/agent-orchestrator/examples/tower-defense-game/README.md)

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

- [`schemas/task-manifest.schema.json`](/Users/raphaeladam/development/agent-orchestrator/schemas/task-manifest.schema.json)
- [`examples/adapters.example.json`](/Users/raphaeladam/development/agent-orchestrator/examples/adapters.example.json)

You can ignore that until manual use becomes painful.
