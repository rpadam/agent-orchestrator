# Practical Considerations

This file covers real-world issues when other teams use this workflow.

## 1) Is This Already Solved?

Partially.

- Some platforms provide agent execution primitives.
- Very few provide a portable, cross-platform operating standard for planning, model routing, review gates, and usage logging.

This repo fills that portability gap.

## 2) Cost Efficiency Controls

Use all of these together:

- bounded tasks with explicit file scope
- cheapest viable model per task class
- sequential default to limit parallel burn
- required token_estimate before dispatch
- required completion_usage after execution
- reviewer gate before rework loops

## 3) Cost Predictability Limits

Token estimates are useful but imperfect.

Reasons estimates drift:

- hidden chain-of-thought and tool overhead differ by provider
- retries and error recovery increase usage
- context growth across long sessions increases input tokens
- model substitutions by platform may occur

Recommendation:

- estimate ranges, not single values
- track actuals task-by-task
- recalibrate estimates every 3 to 5 completed tasks

## 4) Cross-Platform Differences To Expect

Common differences across Codex, Cursor, Claude Code, and others:

- model naming and availability
- telemetry access (some expose token usage, some do not)
- native skill support vs prompt-pack only
- tool sandbox and permission behavior

Design for these differences by keeping policy in markdown docs and using optional structured manifests.

## 5) Model Routing Reliability

Map your routing to capability tiers, not fixed names:

- low cost tier
- medium tier
- high tier

Then map tier to actual provider model names per platform.

## 6) Governance and Safety

Require these controls before broad team adoption:

- explicit list of writable paths per task
- no-destructive-command policy unless user-approved
- review gate required for completion
- audit log in progress file for model + token metadata

## 7) Minimum Viable Team Rollout

1. Start with sequential-only mode for 1 to 2 projects.
2. Enforce completion metadata for every task.
3. Publish weekly cost and rework summaries.
4. Introduce parallel mode only for proven independent task pairs.
