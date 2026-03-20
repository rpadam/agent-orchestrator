# Model Routing

## Goal

Use the cheapest model that is likely to succeed without creating more review cost than it saves.

## Cheap Tier

Use for:

- bounded refactors
- data file creation
- documentation tasks
- verification and status summaries
- simple single-purpose edits

Avoid for:

- broad architecture work
- large UI rewrites
- integration-heavy bug fixes

## Medium Tier

Use for:

- default implementation work
- multi-file feature tasks
- moderate UI work
- system tasks with clear file boundaries

This should be the default.

## High Tier

Use for:

- hard integration
- architecture changes
- failed tasks that need rescue
- reviewer passes on high-risk tasks
- cross-cutting refactors

Estimated token bands (starting heuristic, tune over time):

- cheap tier:
  - input: 2k to 12k
  - output: 0.5k to 4k
- medium tier:
  - input: 8k to 35k
  - output: 2k to 12k
- high tier:
  - input: 20k to 80k
  - output: 4k to 25k

Treat these as planning ranges, not guarantees.

## Escalation Policy

Start cheap only if task boundaries are narrow.

Escalate from cheap to medium when:

- scope was followed but solution quality is weak
- task needed stronger reasoning across several files

Escalate from medium to high when:

- review finds architectural flaws
- the task keeps failing after one retry
- the task requires strong tradeoff judgment

Do not escalate only because the first agent was sloppy. Tighten the task first.

Usage logging requirement:

- after task completion, record the actual model used
- record token usage if the platform exposes it
- if usage is unavailable, record null values with a short note
