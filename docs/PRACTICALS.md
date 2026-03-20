# Practical Considerations

This file covers real-world issues when other teams use this workflow.

## 1) Is This Already Solved?

Partially.

- Some platforms provide agent execution primitives.
- Few provide a portable standard for planning, task boundaries, model routing, review gates, and usage logging.

This repo is that portability layer.

## 2) Cost Efficiency Controls

Use all of these together:

- bounded tasks with explicit file scope
- cheapest viable model per task class
- sequential default to limit parallel burn
- required token_estimate before dispatch
- required completion_usage after execution
- required parent planner usage metadata in `PLAN.md`
- reviewer gate before rework loops

## 3) Cost Predictability Limits

Token estimates are useful but imperfect.

Reasons estimates drift:

- hidden reasoning/tool overhead differs by provider
- retries and recovery loops add usage
- context growth across long sessions increases input tokens
- platform-level model substitutions can happen

Recommendation:

- estimate ranges, not single values
- track actuals task-by-task
- track planner usage separately from implementer usage
- recalibrate estimates every 3 to 5 completed tasks

## 4) Cross-Platform Maturity (Installation)

- Codex: native skill model with explicit invocation and skill installers.
- Claude Code: native skills plus plugin marketplaces for distributable install flows.
- Cursor: strong rules support, but no equivalent first-party skill marketplace flow today.

Practical implication:

- use native install paths where possible
- use git-based sync for cross-platform fallback

## 5) Model Routing Reliability

Map routing to capability tiers, not fixed model names:

- low cost tier
- medium tier
- high tier

Then map tier to real model names per platform.

## 6) Governance and Safety

Require these controls before broad team adoption:

- explicit writable-path boundaries per task
- no destructive commands unless user-approved
- review gate required for completion
- audit logs for planner and implementer model/token metadata

## 7) Minimum Viable Team Rollout

1. Start with sequential-only mode for 1 to 2 projects.
2. Enforce planner and task completion metadata for every run.
3. Publish weekly cost and rework summaries.
4. Introduce parallel mode only for proven independent task pairs.
