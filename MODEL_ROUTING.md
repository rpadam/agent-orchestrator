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
