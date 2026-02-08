# Component Guide

Catalog of reusable components in JSON Visualization.

## Overview

Components are organized by feature and follow consistent patterns with TypeScript, styled-components, and React best practices.

## Detailed Component Catalog

For comprehensive component documentation, see:

**[Agent Skills - Components Reference](../../.agentskills/json-visualization-dev/references/COMPONENTS.md)**

This includes:
- Complete component catalog
- Button components (EditorButton, GithubButton, etc.)
- Visual effects (Cursor, DotGrid, RippleGrid)
- Layout components (Navbar, Footer, PageLayout)
- Editor components (TextEditor, GraphView, TreeView)
- Usage examples
- Props documentation
- Styled component patterns
- Component creation checklist

## Quick Reference

### Component Structure

```
src/components/ComponentName/
├── ComponentName.tsx    # Component implementation
└── index.ts             # Barrel export
```

### Creating a Component

```typescript
import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  padding: 1rem;
`;

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return <StyledWrapper onClick={onClick}>{title}</StyledWrapper>;
};
```

### Common Components

**Buttons:**
- EditorButton - Purple animated button
- GithubButton - With star count
- ExploreButton - Neumorphic style
- AnimatedLinkButton - With underline animation
- ArrowButton - Circular with arrow
- GenerateButton - With sparkle animation

**Effects:**
- Cursor - Custom animated cursor
- DotGrid - Animated dot background
- RippleGrid - Wave animation
- GlassSurface - Glassmorphism container

**Layout:**
- PageLayout - Main wrapper with Navbar/Footer
- Navbar - Top navigation
- Footer - Bottom links

**Editor:**
- TextEditor - Monaco editor
- GraphView - Graph visualization
- TreeView - Tree structure
- Toolbar - Editor toolbar

## Related Documentation

- [Architecture](architecture.md) - System design
- [State Management](state-management.md) - State patterns
- [Code Style](code-style.md) - Coding conventions
- [Agent Skills - Components](../../.agentskills/json-visualization-dev/references/COMPONENTS.md) - Full catalog
