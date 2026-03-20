# Review Template

Use this structure when reviewing a completed task:

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

Check 5: Usage Tracking
- Is model used documented?
- Are token fields present?
- If token counts are missing, is there an explicit reason?

Check 5b: Completion Records
- Is the task file's completion metadata block filled in?
- Does `orchestration/TASKS.md` mark the task status consistently?
- Does `orchestration/progress.md` log the completion consistently?
- Is there any mismatch between those artifacts?

Check 6: Routing Honesty
- Did the task file declare `model_enforcement`?
- Did any dispatch artifact accurately describe how the requested model would be launched?
- Was routing marked `advisory` when enforcement was not actually available?

Check 7: Model Economy
- Was the requested model consistent with the routing policy?
- If `frontier` was selected, did the task explain why `balanced` was not a good first pass?
- Does the task appear overpowered for the assigned scope?

Decision:
- approved
- needs changes
- blocked

Follow-up:
- concrete next step
```

Rules:

- findings come before summary
- be specific about failed criteria
- if retrying, say whether the same model tier is adequate
- escalate only when complexity is the issue
- do not approve a task with missing completion metadata or missing status synchronization
