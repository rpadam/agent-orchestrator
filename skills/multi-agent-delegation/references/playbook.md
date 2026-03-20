# Multi-Agent Playbook

Use this pattern when a task is broad, multi-phase, easy to split by subsystem, and reviewable in pieces.

Do not use it when:

- one strong agent can handle the whole task cleanly
- every step edits the same files
- requirements are unclear
- there is no practical verification path

Core roles:

- Planner: defines the task graph and acceptance criteria
- Implementer: executes one bounded task
- Reviewer: checks scope, verification, and quality

Planner flow:

1. Write a project plan.
2. Split work into task-sized units.
3. Identify dependencies and safe parallelism.
4. Route each task to an appropriate model tier.
5. Require verification on every task.
6. Require a review pass before marking a task complete.
7. Append handoff notes after each task.

Required project files:

- `PLAN.md` or equivalent
- `TASKS.md` or equivalent
- `progress.md`
- prompt files if you want copy-paste delegation

Good task size:

- one clear goal
- small explicit file set
- clear acceptance criteria
- reviewable without reading the whole repo

Parallelism:

- safe when tasks do not overlap in files or state ownership
- unsafe when two tasks change the same reducers, loop, stylesheet, or UI subsystem

Review standard:

- a task is not complete until reviewed
- check scope adherence, changed files, acceptance criteria, verification results, and blockers
- reject if verification was skipped or unrelated files changed
