# State Management

State management patterns using Zustand in JSON Visualization.

## Overview

JSON Visualization uses Zustand for global state management. Stores are simple, performant, and TypeScript-friendly.

## Detailed State Documentation

For comprehensive state management documentation, see:

**[Agent Skills - State Reference](../../.agentskills/json-visualization-dev/references/STATE.md)**

This includes:
- Complete store overview
- useFile store (file operations)
- useJson store (parsed data)
- useGraph store (visualization)
- useConfig store (configuration)
- useModal store (modal state)
- State patterns and best practices
- Selector patterns
- Async actions
- Performance tips
- Testing stores

## Quick Reference

### Store Pattern

```typescript
import { create } from "zustand";

interface MyState {
  value: string;
}

interface MyActions {
  setValue: (value: string) => void;
}

const useMyStore = create<MyState & MyActions>()((set, get) => ({
  value: "",
  setValue: value => set({ value }),
}));

export default useMyStore;
```

### Using Stores

```typescript
// In component
const value = useMyStore(state => state.value);
const setValue = useMyStore(state => state.setValue);

// Update state
setValue("new value");
```

### Key Stores

**useFile** - File content and format
```typescript
const contents = useFile(state => state.contents);
const setContents = useFile(state => state.setContents);
```

**useJson** - Parsed JSON
```typescript
const json = useJson(state => state.json);
const setJson = useJson(state => state.setJson);
```

**useGraph** - Graph state
```typescript
const nodes = useGraph(state => state.nodes);
const edges = useGraph(state => state.edges);
```

**useConfig** - Configuration
```typescript
const viewMode = useConfig(state => state.viewMode);
const setViewMode = useConfig(state => state.setViewMode);
```

**useModal** - Modal state
```typescript
const modal = useModal(state => state.modal);
useModal.setState({ modal: "import" });
```

## Best Practices

### Use Selectors

```typescript
// ✅ Good - only re-renders when contents changes
const contents = useFile(state => state.contents);

// ❌ Bad - re-renders on any state change
const file = useFile();
```

### Separate Selectors

```typescript
// ✅ Good
const contents = useFile(state => state.contents);
const format = useFile(state => state.format);

// ❌ Bad - re-renders more often
const { contents, format } = useFile(state => ({ 
  contents: state.contents, 
  format: state.format 
}));
```

### Async Actions

```typescript
const useFile = create<FileStates & JsonActions>()((set, get) => ({
  contents: "",
  
  loadFromUrl: async (url: string) => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      set({ contents: text });
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
```

## Related Documentation

- [Architecture](architecture.md) - System design
- [Components](components.md) - Component catalog
- [Code Style](code-style.md) - Coding conventions
- [Agent Skills - State](../../.agentskills/json-visualization-dev/references/STATE.md) - Full details
