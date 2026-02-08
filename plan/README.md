# Documentation Plan - Quick Reference

## Structure Overview

```
Repository
├── docs/                           # User & Developer docs
│   ├── getting-started.md         # Tutorial
│   ├── features/                  # Explanation
│   ├── how-to/                    # How-to guides
│   ├── reference/                 # Reference
│   ├── development/               # Developer docs
│   ├── technical/                 # Technical deep dives
│   ├── faq.md
│   └── troubleshooting.md
├── .agentskills/                  # Agent Skills (AI agents)
│   └── json-visualization-dev/
│       └── references/
│           ├── WORKFLOWS.md       # New: Development workflows
│           ├── DEBUGGING.md       # New: Debugging guide
│           ├── PERFORMANCE.md     # New: Performance guide
│           └── TESTING.md         # New: Testing guide
├── .github/                       # GitHub templates
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
└── CONTRIBUTING.md                # Contributing guide
```

## Diátaxis Framework Mapping

| Type | Purpose | Location | Examples |
|------|---------|----------|----------|
| **Tutorials** | Learning | `docs/getting-started.md` | First visualization, basic usage |
| **How-to** | Tasks | `docs/how-to/` | Convert formats, generate types |
| **Explanation** | Understanding | `docs/features/`, `docs/development/` | Architecture, concepts |
| **Reference** | Information | `docs/reference/`, `.agentskills/` | Shortcuts, API, specs |

## Phases

1. **User Documentation** (Priority: High) - 2-3 days
2. **Developer Documentation** (Priority: High) - 2-3 days
3. **Technical Documentation** (Priority: Medium) - 2-3 days
4. **Enhanced Agent Skills** (Priority: Medium) - 1-2 days
5. **GitHub Templates** (Priority: Low) - 1 day

**Total**: 8-12 days

## Key Principles

✅ Follow Diátaxis framework  
✅ Follow Agent Skills standards  
✅ Clear, concise, structured  
✅ Code examples tested  
✅ Keep in sync with code  
✅ Progressive disclosure for agents  

## Start Here

Begin with Phase 1: User Documentation
- `docs/getting-started.md`
- `docs/features/`
- `docs/how-to/`

See [documentation-plan.md](documentation-plan.md) for full details.
