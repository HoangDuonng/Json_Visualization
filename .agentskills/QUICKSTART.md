# Quick Start for AI Agents

If you're an AI agent working with this codebase, start here.

## 1. Discover available skills

Read: [`.agentskills/README.md`](.agentskills/README.md)

## 2. Load the main skill

Read: [`.agentskills/json-visualization-dev/SKILL.md`](.agentskills/json-visualization-dev/SKILL.md)

This gives you:
- Project overview
- Tech stack
- Quick start commands
- Architecture overview
- Code style guidelines
- Common tasks

## 3. Access detailed references (as needed)

- **Architecture & data flow**: [`.agentskills/json-visualization-dev/references/ARCHITECTURE.md`](.agentskills/json-visualization-dev/references/ARCHITECTURE.md)
- **Component catalog**: [`.agentskills/json-visualization-dev/references/COMPONENTS.md`](.agentskills/json-visualization-dev/references/COMPONENTS.md)
- **State management**: [`.agentskills/json-visualization-dev/references/STATE.md`](.agentskills/json-visualization-dev/references/STATE.md)

## 4. Use utility scripts

```bash
# Validate data format
node .agentskills/json-visualization-dev/scripts/validate-format.js json data.json

# Analyze JSON structure
node .agentskills/json-visualization-dev/scripts/analyze-json.js data.json
```

## Common tasks

### Adding a feature
1. Read SKILL.md for architecture overview
2. Check COMPONENTS.md for existing components
3. Check STATE.md for state management patterns
4. Follow code style guidelines in SKILL.md

### Fixing a bug
1. Read ARCHITECTURE.md to understand data flow
2. Check relevant component in COMPONENTS.md
3. Check state management in STATE.md if store-related

### Understanding the codebase
1. Start with SKILL.md overview
2. Read ARCHITECTURE.md for system design
3. Browse COMPONENTS.md for component catalog
4. Read STATE.md for state patterns

## Progressive disclosure

Load only what you need:
- **Always**: SKILL.md (~3000 tokens)
- **When needed**: Reference docs (~2000-3000 tokens each)
- **As needed**: Execute scripts

This minimizes context usage while providing comprehensive information.

## Legacy documentation

- [`AGENTS.md`](AGENTS.md) - Original agent guidelines (still valid, but Agent Skills are more structured)
- [`README.md`](README.md) - Project README for humans

## Questions?

- Check [Agent Skills specification](https://agentskills.io/specification)
- Read [Diátaxis framework](https://diataxis.fr/) for documentation structure
