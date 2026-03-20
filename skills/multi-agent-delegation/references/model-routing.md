# Model Routing

Goal:

- use the cheapest model likely to succeed without creating more review cost than it saves

Cheap tier:

- bounded tasks
- data extraction
- documentation
- straightforward refactors
- verification summaries

Avoid cheap tier for:

- broad architecture work
- large UI rewrites
- integration-heavy bug fixes

Medium tier:

- default implementation work
- moderate multi-file features
- most UI tasks
- most system tasks with clear boundaries

High tier:

- architecture changes
- rescue tasks after failed reviews
- integration work touching many systems
- review of risky or complex changes

Escalation:

- cheap to medium when the task was bounded but needed stronger reasoning
- medium to high when the review finds architectural flaws or the task keeps failing after one retry
- do not escalate just because the first agent was sloppy; tighten the task first
