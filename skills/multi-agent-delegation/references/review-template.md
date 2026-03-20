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
