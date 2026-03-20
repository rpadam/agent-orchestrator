# Review Template

Use this format when reviewing a completed task.

```text
Review target: TASK-ID

Check 1: Scope
- Did the agent edit only allowed files?
- Did the agent avoid unrelated rewrites?

Check 2: Acceptance
- Which acceptance criteria were satisfied?
- Which were not satisfied?

Check 3: Verification
- Were required commands run?
- Did they pass?

Check 4: Quality
- Any bugs?
- Any regressions?
- Any missing tests or validation?

Check 5: Usage Tracking (Task)
- Is model used documented?
- Are token fields present?
- If token counts are missing, is there an explicit reason?

Check 6: Planning Metadata (Run Closeout Only)
- Skip for normal per-task reviews.
- At run closeout, is planner metadata present in PLAN.md?
- At run closeout, are planner token/cost fields present or null with reason?

Decision:
- approved
- needs changes
- blocked

Follow-up:
- concrete next step
```

## Review Rules

- Findings come before summary.
- Be specific about failed criteria.
- If the task should be retried, say whether the same model tier is adequate.
- Escalate only when the failure is due to complexity, not laziness.
