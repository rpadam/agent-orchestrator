# Install Guide (No Manual File Copy)

This guide documents practical installation options for Codex, Claude Code, and Cursor.

## Recommended Distribution Strategy

Use two channels:

1. Native installer path where available.
2. Git-based sync path where native installers are not available.

That keeps install friction low while staying portable.

## Codex

### Option A (recommended): install by URL with `$skill-installer`

In Codex, run:

```text
$skill-installer install https://github.com/rpadam/agent-orchestrator/tree/main/skills/multi-agent-delegation
```

Then restart Codex if the skill does not appear immediately.

### Option B: repo-scoped skill (shared with team)

Add this repo as a submodule and expose the skill under `.agents/skills`:

```bash
git submodule add https://github.com/rpadam/agent-orchestrator.git .agents/vendor/agent-orchestrator
mkdir -p .agents/skills
ln -s ../vendor/agent-orchestrator/skills/multi-agent-delegation .agents/skills/multi-agent-delegation
```

This avoids copying files and keeps updates pull-based.

## Claude Code

### Option A (recommended long-term): publish as a plugin marketplace entry

Claude Code supports plugin marketplaces that can install plugins containing skills, agents, hooks, and MCP servers.

Install flow for users becomes:

```text
/plugin marketplace add <owner>/<marketplace-repo>
/plugin install <plugin-name>@<marketplace-name>
/reload-plugins
```

This is the best no-copy path for broad adoption.

### Option B (immediate): git submodule + path wiring

If marketplace packaging is not ready yet, use a git submodule in the project and wire skills from it. This is still no manual copying, but less polished than marketplace install.

## Cursor

Cursor supports project rules in `.cursor/rules` and AGENTS-style repo instructions. It does not currently have an equivalent first-party skill marketplace flow.

### Option A (recommended): git submodule + project rules wrapper

```bash
git submodule add https://github.com/rpadam/agent-orchestrator.git .cursor/vendor/agent-orchestrator
mkdir -p .cursor/rules
```

Then create one thin rule file that points agents to the orchestrator docs in the submodule.

### Option B: centralized internal template repo

If your org bootstraps repos from templates, include the submodule and wrapper rules in the template so end users do zero manual setup.

## Update Strategy

For submodule installs:

```bash
git submodule update --init --recursive
git submodule update --remote --merge
```

For plugin/installer-based installs, follow the platform-specific update mechanism.

## Sources

- Codex skills doc: https://developers.openai.com/codex/skills
- OpenAI skills installer examples: https://github.com/openai/skills
- Claude Code skills: https://docs.anthropic.com/en/docs/claude-code/skills
- Claude Code slash commands: https://docs.anthropic.com/en/docs/claude-code/slash-commands
- Claude Code plugin marketplace: https://code.claude.com/docs/en/discover-plugins
- Cursor rules: https://docs.cursor.com/context/rules
