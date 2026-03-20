# Project Plan Template

Use this template for `PLAN.md` (or equivalent).

```text
# <Project Name> Plan

## Objective
- <one paragraph>

## Scope
In scope:
- <item>
Out of scope:
- <item>

## Architecture target
- <item>

## Execution policy
- execution_mode_default: sequential
- parallel_requires_explicit_user_consent: true
- model_routing_invariant_across_modes: true

## Plan creation metadata
- planner_agent_role: parent_planner
- planner_agent_label: <agent name or handle>
- planner_provider: <openai|anthropic|cursor|other>
- planner_model_requested: <model id>
- planner_model_actual: <model id>
- planner_input_tokens_actual: <int|null>
- planner_output_tokens_actual: <int|null>
- planner_total_tokens_actual: <int|null>
- planner_cost_actual_usd: <number|null>
- plan_created_at: <ISO-8601 timestamp>
- planning_usage_notes: <string|null>

## Task graph summary
- <task IDs and dependency notes>

## Verification strategy
- <repo-level checks>

## Handoff notes
- <notes>
```

## Rules

- Plan metadata is required. If usage data is unavailable on your platform, record `null` values and explain why in `planning_usage_notes`.
- Keep the plan stable and append updates instead of rewriting history.
