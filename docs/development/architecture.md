# Architecture

System architecture and design of JSON Visualization.

## Overview

JSON Visualization is a client-side web application built with Next.js, React, and TypeScript. All data processing happens in the browser for privacy and security.

## Detailed Architecture

For comprehensive architecture documentation, see:

**[Agent Skills - Architecture Reference](../../.agentskills/json-visualization-dev/references/ARCHITECTURE.md)**

This includes:
- System architecture diagram
- State management hierarchy
- Data flow
- Graph parsing algorithm
- Format conversion
- Type generation
- Component architecture
- Performance optimizations
- Editor integration
- Modal system
- Routing
- Build & deployment

## Quick Reference

### Tech Stack

- **Framework**: Next.js 13+ (React 19)
- **Language**: TypeScript (strict mode)
- **State**: Zustand
- **Styling**: Styled-components + Mantine v8
- **Editor**: Monaco Editor
- **Graph**: Reaflow
- **Build**: Webpack

### Data Flow

```
User Input → TextEditor → useFile Store → jsonParser.ts → useGraph Store → GraphView
```

### Key Components

- **TextEditor**: Monaco editor wrapper
- **GraphView**: Main visualization (Reaflow)
- **TreeView**: Alternative hierarchical view
- **Toolbar**: File, View, Tools menus
- **Modals**: Import, Download, Type, Schema, etc.

### State Stores

- **useFile**: File content and format
- **useJson**: Parsed JSON object
- **useGraph**: Graph nodes and edges
- **useConfig**: App configuration
- **useModal**: Modal state

## Related Documentation

- [Components Guide](components.md) - Component catalog
- [State Management](state-management.md) - Zustand patterns
- [Code Style](code-style.md) - Coding conventions
- [Agent Skills - Architecture](../../.agentskills/json-visualization-dev/references/ARCHITECTURE.md) - Full details
