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

Escalation:

- cheap to medium when the task was bounded but needed stronger reasoning
- medium to high when the review finds architectural flaws or the task keeps failing after one retry
- do not escalate just because the first agent was sloppy; tighten the task first

Execution-mode invariance:

- the task's recommended model tier should stay the same in sequential and parallel modes
- do not downgrade quality tiers just because you are running tasks concurrently

Usage logging requirement:

- after task completion, record the actual model used
- record token usage if the platform exposes it
- if usage is unavailable, record null values with a short note
