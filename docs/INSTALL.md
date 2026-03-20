# Install Guide

This guide is the practical install path for Codex, Claude Code, and Cursor without manual file copying.

## Prerequisite (Codex)

You need the `skill-installer` skill available in Codex.

- In many Codex environments it is already available as a system skill.
- If it is missing, install it from OpenAI skills docs/repo first.

References:

- https://developers.openai.com/codex/skills
- https://github.com/openai/skills
- https://github.com/openai/skills/tree/main/skills/skill-installer

## Codex Install

Recommended:

```text
$skill-installer install https://github.com/rpadam/agent-orchestrator/tree/main/skills/multi-agent-delegation
```

Verify:

```text
Use the multi-agent-delegation skill to plan a 3-task project.
```

If skill installer is unavailable, fallback is a repo-managed symlink install:

```bash
git submodule add https://github.com/rpadam/agent-orchestrator.git .agents/vendor/agent-orchestrator
mkdir -p .agents/skills
ln -s ../vendor/agent-orchestrator/skills/multi-agent-delegation .agents/skills/multi-agent-delegation
```

## Claude Code Install

Use Claude Code skills from `.claude/skills`. To avoid manual copying, use submodule + symlink:

```bash
git submodule add https://github.com/rpadam/agent-orchestrator.git .claude/vendor/agent-orchestrator
mkdir -p .claude/skills
ln -s ../vendor/agent-orchestrator/skills/multi-agent-delegation .claude/skills/multi-agent-delegation
```

Verify in Claude Code by explicitly asking to use `multi-agent-delegation` on a small planning task.

Note:

- Plugin marketplace packaging is possible in Claude Code, but this repo does not currently ship a marketplace plugin package. The submodule+symlink flow above is the immediate no-copy option.

## Cursor Install

Cursor uses rules/context files instead of a native cross-repo skill installer flow.

Use submodule + thin rule wrapper:

```bash
git submodule add https://github.com/rpadam/agent-orchestrator.git .cursor/vendor/agent-orchestrator
mkdir -p .cursor/rules
```

Create `.cursor/rules/agent-orchestrator.mdc` that tells Cursor agents to read:

- `.cursor/vendor/agent-orchestrator/PLAYBOOK.md`
- `.cursor/vendor/agent-orchestrator/PLAN_TEMPLATE.md`
- `.cursor/vendor/agent-orchestrator/TASK_TEMPLATE.md`
- `.cursor/vendor/agent-orchestrator/REVIEW_TEMPLATE.md`
- `.cursor/vendor/agent-orchestrator/MODEL_ROUTING.md`

## Update Installed Version

For submodule-based installs:

```bash
git submodule update --init --recursive
git submodule update --remote --merge
```

## Source Docs

- Codex skills: https://developers.openai.com/codex/skills
- OpenAI skills repo: https://github.com/openai/skills
- Claude Code skills: https://docs.anthropic.com/en/docs/claude-code/skills
- Claude Code slash commands: https://docs.anthropic.com/en/docs/claude-code/slash-commands
- Cursor rules: https://docs.cursor.com/context/rules
