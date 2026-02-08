# JSON Visualization Agent Skill

This directory contains the Agent Skill for developing and maintaining the JSON Visualization project.

## Structure

```
.agentskills/json-visualization-dev/
├── SKILL.md                    # Main skill definition
├── references/                 # Detailed documentation
│   ├── ARCHITECTURE.md        # System architecture
│   ├── COMPONENTS.md          # Component catalog
│   └── STATE.md               # State management
└── scripts/                    # Utility scripts
    ├── validate-format.js     # Validate JSON/YAML/CSV/XML/TOML
    └── analyze-json.js        # Analyze JSON structure
```

## What is this?

This is an [Agent Skills](https://agentskills.io) package that helps AI agents understand and work with the JSON Visualization codebase effectively.

## How it works

1. **SKILL.md** - Loaded when agent activates this skill (quick reference)
2. **references/** - Loaded on-demand for detailed information
3. **scripts/** - Executable utilities for validation and analysis

## For AI agents

When working with JSON Visualization:
1. Read `SKILL.md` for overview and quick start
2. Reference `ARCHITECTURE.md` for system design
3. Reference `COMPONENTS.md` for component details
4. Reference `STATE.md` for state management patterns
5. Use scripts for validation and analysis tasks

## For humans

This directory helps AI coding assistants understand the project structure and conventions. You can also use the scripts directly:

```bash
# Validate a data file
node .agentskills/json-visualization-dev/scripts/validate-format.js json data.json

# Analyze JSON structure
node .agentskills/json-visualization-dev/scripts/analyze-json.js data.json
```

## Progressive disclosure

Following Agent Skills best practices:
- **Metadata** (~100 tokens): name + description in SKILL.md frontmatter
- **Instructions** (~3000 tokens): SKILL.md body content
- **References** (loaded on demand): Detailed docs in references/
- **Scripts** (executed as needed): Utility scripts

This structure minimizes context usage while providing comprehensive information when needed.
