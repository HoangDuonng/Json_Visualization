# Agent Skills

This directory contains Agent Skills for AI coding assistants working with this codebase.

## What are Agent Skills?

Agent Skills are structured documentation packages that help AI agents understand codebases quickly and work effectively. They follow the [Agent Skills specification](https://agentskills.io/specification).

## Available Skills

### json-visualization-dev

**Purpose**: Develop and maintain the JSON Visualization application

**When to use**: Working with this codebase, adding features, fixing bugs, understanding architecture

**Location**: `.agentskills/json-visualization-dev/`

**Quick access**:
- Overview: [SKILL.md](json-visualization-dev/SKILL.md)
- Architecture: [references/ARCHITECTURE.md](json-visualization-dev/references/ARCHITECTURE.md)
- Components: [references/COMPONENTS.md](json-visualization-dev/references/COMPONENTS.md)
- State: [references/STATE.md](json-visualization-dev/references/STATE.md)

## For AI Agents

When you start working with this repository:

1. **Read this file first** to discover available skills
2. **Check skill descriptions** to find relevant skills for your task
3. **Load SKILL.md** from the relevant skill directory
4. **Reference detailed docs** in `references/` as needed
5. **Use scripts** in `scripts/` for validation and analysis

### How to activate a skill

```
1. Read: .agentskills/json-visualization-dev/SKILL.md
2. For details, read files in: .agentskills/json-visualization-dev/references/
3. For utilities, run scripts in: .agentskills/json-visualization-dev/scripts/
```

## For Humans

This directory helps AI assistants understand the project. You can:

- **Browse skills** to see what documentation is available
- **Read SKILL.md files** to understand project structure
- **Use scripts** directly for validation and analysis
- **Update skills** when architecture or patterns change

## Structure

Each skill follows this structure:

```
skill-name/
├── SKILL.md              # Main skill definition (required)
├── README.md             # Skill documentation
├── references/           # Detailed docs (optional)
│   ├── ARCHITECTURE.md
│   ├── COMPONENTS.md
│   └── ...
├── scripts/              # Utility scripts (optional)
│   └── ...
└── assets/               # Templates, diagrams (optional)
    └── ...
```

## Progressive Disclosure

Skills are designed to minimize context usage:

1. **Metadata** (~100 tokens): Skill name + description
2. **Instructions** (~3000 tokens): SKILL.md body
3. **References** (on-demand): Detailed documentation
4. **Scripts** (as-needed): Executable utilities

Agents should load only what they need for the current task.

## Adding New Skills

To add a new skill:

1. Create directory: `.agentskills/new-skill-name/`
2. Create `SKILL.md` with YAML frontmatter
3. Add references and scripts as needed
4. Update this README with the new skill

See [Agent Skills specification](https://agentskills.io/specification) for format details.

## Validation

Validate skills using the skills-ref library:

```bash
npx skills-ref validate .agentskills/json-visualization-dev
```

## Learn More

- [Agent Skills Specification](https://agentskills.io/specification)
- [Agent Skills Repository](https://github.com/agentskills/agentskills)
- [Diátaxis Documentation Framework](https://diataxis.fr/)
