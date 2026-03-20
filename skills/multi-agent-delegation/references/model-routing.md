# Model Routing

Goal:

- use the cheapest model likely to succeed without creating more review cost than it saves

Platform-neutral routing classes:

- `economy`: lowest-cost model class likely to succeed for bounded work
- `balanced`: default model class for most implementation work
- `frontier`: strongest model class reserved for architecture, integration rescue, and risky review

Tier-to-class defaults:

- cheap tier -> `economy`
- medium tier -> `balanced`
- high tier -> `frontier`

Economy-first policy:

- prefer `economy` for bounded tasks, authored content, documentation, verification, and cleanup work
- prefer `balanced` for most implementation tasks with clear boundaries
- reserve `frontier` for architecture, complex integration, rescue work after failure, or risky review
- do not assign `frontier` to a task merely because it touches several files
- when uncertain between two tiers, start with the cheaper one unless the cost of failure is obviously high

Platform mapping rule:

- the core skill must not hardcode provider-specific model IDs
- resolve `economy`, `balanced`, or `frontier` to real model IDs only in platform-specific dispatch artifacts or a project-local platform map
- if no platform map exists, keep the task portable and leave the concrete model unresolved until dispatch time

Cheap tier:

- bounded tasks
- data extraction
- documentation
- straightforward refactors
- verification summaries
- authored content with clear schemas and examples

Avoid cheap tier for:

- broad architecture work
- large UI rewrites
- integration-heavy bug fixes

Medium tier:

- default implementation work
- moderate multi-file features
- most UI tasks
- most system tasks with clear boundaries
- first-pass gameplay systems that are modular and reviewable

High tier:

- architecture changes
- rescue tasks after failed reviews
- integration work touching many systems
- review of risky or complex changes
- ambiguous tasks where a wrong design choice would create expensive follow-on work

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
- do not escalate from medium to high before a review unless the task is clearly architecture-defining or integration-heavy from the start

Planner defaults:

- planner work that defines architecture or task graphs may use `frontier`
- implementer tasks should default one tier lower than the planner unless the task itself clearly warrants more
- review tasks should usually match the implementer tier, and only jump to `frontier` when prior review failed to resolve real complexity

Execution-mode invariance:

- the task's recommended model tier should stay the same in sequential and parallel modes
- do not downgrade quality tiers just because you are running tasks concurrently

Usage logging requirement:

- after task completion, record the actual model used
- record token usage if the platform exposes it
- if usage is unavailable, record null values with a short note
