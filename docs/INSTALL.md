# Install Guide

This project supports two installation modes:

- skill mode (platform has native skill support)
- prompt-pack mode (platform does not have native skill packaging)

Use whichever mode your agent platform supports.

## 1) Skill Mode (Codex)

Install the skill folder into your Codex skills directory:

1. Create destination folder:
   - `~/.codex/skills/multi-agent-delegation/`
2. Copy these files from this repo:
   - `skills/multi-agent-delegation/SKILL.md`
   - `skills/multi-agent-delegation/references/playbook.md`
   - `skills/multi-agent-delegation/references/task-template.md`
   - `skills/multi-agent-delegation/references/review-template.md`
   - `skills/multi-agent-delegation/references/model-routing.md`
3. Restart your Codex session if needed.
4. Verify by asking the agent to use `multi-agent-delegation` on a small test task.

## 2) Prompt-Pack Mode (Cursor, Claude Code, others)

If the platform does not support a native skill package, copy the same content as docs into your project:

1. Create a folder in your target repo, for example:
   - `.ai/agent-orchestrator/`
2. Copy these files:
   - `PLAYBOOK.md`
   - `TASK_TEMPLATE.md`
   - `REVIEW_TEMPLATE.md`
   - `MODEL_ROUTING.md`
3. In each agent run, explicitly attach or reference these files.
4. Require agents to read these files before planning or coding.

## Platform Notes

- Codex: native skill mode is supported.
- Cursor: use prompt-pack mode by adding docs to project context or rules.
- Claude Code: use prompt-pack mode by attaching docs at session start.

If a platform later adds native skill packaging, keep the same core docs and map them into that platform's format.
