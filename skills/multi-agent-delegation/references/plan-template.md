# Plan Template

Use this template for `orchestration/PLAN.md`:

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

## Model routing contract
- routing_mode_default: advisory
- enforced_routing_requires_explicit_launch_support: true
- routing_classes:
  - economy
  - balanced
  - frontier
- platform_model_map_file: orchestration/PLATFORM_MODEL_MAP.md
- supported_dispatch_artifacts:
  - orchestration/dispatch/TASK-XX.codex.md
  - orchestration/dispatch/TASK-XX.cursor.md
  - orchestration/dispatch/TASK-XX.claude.md

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

Rules:

- Plan metadata is required.
- If usage data is unavailable, set the usage fields to `null` and explain in `planning_usage_notes`.
- Keep plan artifacts inside `orchestration/` unless the user explicitly requests another layout.
