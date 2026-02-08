# Agent Skills Discovery

**For AI Agents**: This repository uses [Agent Skills](https://agentskills.io) for structured documentation.

## Quick Start

1. **Read**: [`.agentskills/QUICKSTART.md`](.agentskills/QUICKSTART.md)
2. **Load**: [`.agentskills/json-visualization-dev/SKILL.md`](.agentskills/json-visualization-dev/SKILL.md)
3. **Reference**: Files in [`.agentskills/json-visualization-dev/references/`](.agentskills/json-visualization-dev/references/)

## What you'll find

- **Project overview** - Tech stack, architecture, data flow
- **Development guide** - Setup, commands, code style
- **Component catalog** - Reusable components with examples
- **State management** - Zustand stores and patterns
- **Common tasks** - How to add features, fix bugs, etc.

## Structure

```
.agentskills/
├── QUICKSTART.md                    # Start here
├── README.md                        # Skills overview
├── agentskills.json                 # Machine-readable manifest
└── json-visualization-dev/          # Main skill
    ├── SKILL.md                     # Core documentation
    ├── references/                  # Detailed docs
    │   ├── ARCHITECTURE.md
    │   ├── COMPONENTS.md
    │   └── STATE.md
    └── scripts/                     # Utility scripts
        ├── validate-format.js
        └── analyze-json.js
```

## Progressive disclosure

Load only what you need to minimize context usage:
- Metadata: ~100 tokens
- SKILL.md: ~3000 tokens
- Each reference: ~2000-3000 tokens
- Scripts: Execute as needed

---

**For humans**: This directory helps AI assistants understand the codebase. You can also browse the documentation and use the scripts directly.
