# Agent Skills Integration Summary

This document explains how AI agents discover and use the Agent Skills in this repository.

## Discovery Mechanisms

### 1. Repository root files

**README.md** - Main project README includes:
```markdown
## For AI Agents

This repository includes [Agent Skills](.agentskills/) - structured documentation...
**Quick start for agents**: Read `.agentskills/json-visualization-dev/SKILL.md`
```

**AGENTS.md** - Legacy agent guidelines with pointer:
```markdown
> **💡 For comprehensive documentation**: See `.agentskills/json-visualization-dev/`
```

### 2. .agentskills directory

**Entry points** (in order of prominence):
1. `AGENTS_START_HERE.md` - Prominent entry point
2. `QUICKSTART.md` - Step-by-step guide
3. `README.md` - Skills overview and catalog
4. `agentskills.json` - Machine-readable manifest

**Skill directory**:
- `json-visualization-dev/SKILL.md` - Main skill definition
- `json-visualization-dev/references/` - Detailed docs
- `json-visualization-dev/scripts/` - Utility scripts

### 3. GitHub integration

**.github/AGENTS.md** - GitHub-visible agent documentation with links to Agent Skills

## How Agents Discover Skills

### Method 1: Direct file reading (most common)

```
1. Agent reads README.md or AGENTS.md
2. Sees reference to .agentskills/
3. Reads .agentskills/AGENTS_START_HERE.md or QUICKSTART.md
4. Loads .agentskills/json-visualization-dev/SKILL.md
5. References detailed docs as needed
```

### Method 2: Directory exploration

```
1. Agent explores repository structure
2. Finds .agentskills/ directory
3. Reads README.md or AGENTS_START_HERE.md
4. Follows links to skills
```

### Method 3: Machine-readable manifest

```
1. Agent looks for agentskills.json
2. Parses skill metadata
3. Loads skills programmatically
```

### Method 4: Convention-based

```
1. Agent knows about Agent Skills convention
2. Looks for .agentskills/ directory
3. Looks for SKILL.md files
4. Loads skills automatically
```

## Progressive Disclosure

Agents load information in stages to minimize context usage:

**Stage 1: Discovery (~100 tokens)**
- Skill name and description from SKILL.md frontmatter

**Stage 2: Overview (~3000 tokens)**
- Full SKILL.md body content
- Quick start, architecture overview, common tasks

**Stage 3: Details (2000-3000 tokens each, on-demand)**
- ARCHITECTURE.md - System design and data flow
- COMPONENTS.md - Component catalog
- STATE.md - State management patterns

**Stage 4: Execution (as needed)**
- Run scripts for validation and analysis

## File Structure

```
Repository Root
├── README.md                           # Points to Agent Skills
├── AGENTS.md                           # Points to Agent Skills
├── .github/
│   └── AGENTS.md                       # GitHub-visible pointer
└── .agentskills/
    ├── AGENTS_START_HERE.md            # Prominent entry point
    ├── QUICKSTART.md                   # Step-by-step guide
    ├── README.md                       # Skills catalog
    ├── agentskills.json                # Machine-readable manifest
    └── json-visualization-dev/
        ├── SKILL.md                    # Main skill (required)
        ├── README.md                   # Skill documentation
        ├── references/
        │   ├── ARCHITECTURE.md
        │   ├── COMPONENTS.md
        │   └── STATE.md
        └── scripts/
            ├── validate-format.js
            └── analyze-json.js
```

## Integration with AI Tools

### GitHub Copilot / Cursor / Windsurf

These tools can:
1. Read repository files
2. Discover .agentskills/ directory
3. Load SKILL.md files
4. Reference detailed docs as needed

### Kiro CLI (current tool)

Can:
1. Read all files in repository
2. Execute scripts
3. Follow links between documents
4. Load information progressively

### Future AI tools

Will be able to:
1. Parse agentskills.json manifest
2. Load skills programmatically
3. Cache skill metadata
4. Auto-discover skills in repositories

## Best Practices for Agents

1. **Start with discovery**: Read AGENTS_START_HERE.md or QUICKSTART.md
2. **Load progressively**: Don't load all docs at once
3. **Use references**: Load detailed docs only when needed
4. **Execute scripts**: Use utility scripts for validation
5. **Follow links**: Documents reference each other with relative paths

## Updating Skills

When the codebase changes:

1. Update SKILL.md if architecture or patterns change
2. Update reference docs for detailed changes
3. Update scripts if new utilities are needed
4. Update agentskills.json if skills are added/removed
5. Keep discovery files (README, QUICKSTART) in sync

## Validation

Validate skills using:

```bash
npx skills-ref validate .agentskills/json-visualization-dev
```

This checks:
- SKILL.md frontmatter format
- Required fields (name, description)
- Naming conventions
- File structure

## Learn More

- [Agent Skills Specification](https://agentskills.io/specification)
- [Agent Skills Repository](https://github.com/agentskills/agentskills)
- [Diátaxis Framework](https://diataxis.fr/)
