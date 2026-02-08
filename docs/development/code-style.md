# Code Style Guide

Coding conventions and style guidelines for JSON Visualization.

## TypeScript

### Type Imports

Always use `import type` for type-only imports:

```typescript
// ✅ Correct
import type { MenuItemProps } from "@mantine/core";

// ❌ Wrong
import { MenuItemProps } from "@mantine/core";
```

**Enforced by ESLint.**

### Type Definitions

Define interfaces for all props and function parameters:

```typescript
interface MyComponentProps {
  title: string;
  count?: number;
  onClick?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, count, onClick }) => {
  // ...
};
```

### Avoid `any`

Use specific types instead of `any`:

```typescript
// ✅ Good
function processData(data: Record<string, unknown>): void

// ❌ Bad
function processData(data: any): void
```

## Import Order

Imports must follow this order (enforced by Prettier):

1. React imports
2. Next.js imports
3. `@mantine/core`
4. Other `@mantine` packages
5. `styled-components`
6. Third-party modules
7. Internal `src/` imports
8. Relative imports

**Example:**

```typescript
import React from "react";
import Link from "next/link";
import { Button, Menu } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import useGraph from "src/features/editor/views/GraphView/stores/useGraph";
import { isIframe } from "../lib/utils/helpers";
```

## Naming Conventions

### Components

PascalCase for component files and names:

```typescript
// File: Navbar.tsx
export const Navbar: React.FC = () => {
  // ...
};
```

### Hooks

camelCase with `use` prefix:

```typescript
// File: useFocusNode.ts
export const useFocusNode = () => {
  // ...
};
```

### Stores

camelCase with `use` prefix, default export:

```typescript
// File: useFile.ts
const useFile = create<FileStates & JsonActions>()((set, get) => ({
  // ...
}));

export default useFile;
```

### Functions

camelCase:

```typescript
function fetchUrl(url: string): Promise<string> {
  // ...
}

const setContents = (data: string) => {
  // ...
};
```

### Constants

camelCase or UPPER_SNAKE_CASE:

```typescript
const maxNodeLimit = 1000;
const DEFAULT_THEME = "light";
```

### Styled Components

Prefix with `Styled`:

```typescript
const StyledButton = styled.button`
  padding: 0.5rem 1rem;
`;

const StyledMenuItem = styled(Menu.Item)<MenuItemProps>`
  color: black;
`;
```

## Formatting

### Quotes

Double quotes only:

```typescript
// ✅ Correct
const name = "Alice";

// ❌ Wrong
const name = 'Alice';
```

### Semicolons

Required at end of statements:

```typescript
// ✅ Correct
const x = 5;

// ❌ Wrong
const x = 5
```

### Line Width

Maximum 100 characters per line.

### Trailing Commas

ES5 style (objects, arrays):

```typescript
const obj = {
  name: "Alice",
  age: 30,  // ✅ Trailing comma
};

const arr = [1, 2, 3];  // ✅ No trailing comma (single line)
```

### Arrow Functions

Avoid parens for single parameters:

```typescript
// ✅ Correct
const double = x => x * 2;

// ❌ Wrong
const double = (x) => x * 2;
```

### No Multiple Empty Lines

Keep code compact:

```typescript
// ✅ Correct
const a = 1;

const b = 2;

// ❌ Wrong
const a = 1;


const b = 2;
```

## React Patterns

### Functional Components

Use functional components with hooks:

```typescript
export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  const [count, setCount] = React.useState(0);
  
  return <div>{title}: {count}</div>;
};
```

### Custom Hooks

Start with `use` prefix:

```typescript
export const useFocusNode = () => {
  const [focusedNode, setFocusedNode] = React.useState<string | null>(null);
  
  return { focusedNode, setFocusedNode };
};
```

### Memoization

Use `React.memo()` for expensive components:

```typescript
export const ExpensiveComponent = React.memo<Props>(({ data }) => {
  // Expensive rendering
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.data === nextProps.data;
});
```

## Styled Components

### Component Styling

Keep styled components in same file:

```typescript
const StyledWrapper = styled.div`
  padding: 1rem;
  background: ${props => props.theme.background};
`;

export const MyComponent: React.FC = () => {
  return <StyledWrapper>Content</StyledWrapper>;
};
```

### Props Typing

Type styled component props:

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary";
}

const StyledButton = styled.button<ButtonProps>`
  background: ${props => 
    props.variant === "primary" ? "#f7c948" : "#37ff8b"
  };
`;
```

### Extending Components

Extend Mantine components:

```typescript
import { Button } from "@mantine/core";
import type { ButtonProps } from "@mantine/core";

const StyledMantineButton = styled(Button)<ButtonProps>`
  border-radius: 8px;
`;
```

## Error Handling

### Try-Catch

Use for async operations:

```typescript
try {
  const json = await contentToJson(contents, format);
  setJson(json);
} catch (error: any) {
  if (error?.message) {
    setError(error.message);
  }
  toast.error("Failed to process data!");
}
```

### Error State

Store errors in state:

```typescript
const [error, setError] = React.useState<string | null>(null);

if (error) {
  return <ErrorMessage>{error}</ErrorMessage>;
}
```

### User Feedback

Use `react-hot-toast`:

```typescript
import { toast } from "react-hot-toast";

toast.success("Data saved!");
toast.error("Failed to save!");
toast.loading("Saving...");
```

## State Management

### Zustand Pattern

```typescript
const useMyStore = create<State & Actions>()((set, get) => ({
  // State
  value: "",
  
  // Actions
  setValue: (value: string) => set({ value }),
  getValue: () => get().value,
}));
```

### Selectors

Use specific selectors:

```typescript
// ✅ Good
const value = useMyStore(state => state.value);

// ❌ Bad
const store = useMyStore();
const value = store.value;
```

## File Organization

### Component Structure

```
src/components/MyComponent/
├── MyComponent.tsx    # Component
└── index.ts           # Export
```

### Barrel Exports

```typescript
// index.ts
export { MyComponent } from "./MyComponent";
```

### Feature Modules

```
src/features/myFeature/
├── components/
├── hooks/
├── stores/
└── utils/
```

## Comments

### JSDoc

Use for complex functions:

```typescript
/**
 * Parses JSON content to graph nodes
 * @param json - JSON object to parse
 * @param parent - Parent node ID
 * @returns Array of graph nodes
 */
function parseJson(json: any, parent: string | null): NodeData[] {
  // ...
}
```

### Inline Comments

Explain complex logic:

```typescript
// Calculate node size based on content length
const size = Math.min(content.length * 10, 200);
```

### TODO Comments

Mark future work:

```typescript
// TODO: Add support for circular references
// FIXME: Performance issue with large arrays
```

## Linting

### Run Linter

```bash
# Check all files
pnpm lint

# Auto-fix issues
pnpm lint:fix
```

### ESLint Rules

Key rules enforced:
- Type-only imports
- No unused variables
- Import order
- React hooks rules
- TypeScript strict checks

### Prettier

Auto-format on save (VS Code):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Best Practices

### Performance

- Use `React.memo()` for expensive components
- Debounce expensive operations
- Use Zustand selectors efficiently
- Avoid unnecessary re-renders

### Accessibility

- Use semantic HTML
- Add ARIA labels
- Support keyboard navigation
- Test with screen readers

### Security

- Sanitize user input
- Validate data
- No `eval()` or dangerous code
- Follow security best practices

### Maintainability

- Keep functions small
- Single responsibility
- DRY (Don't Repeat Yourself)
- Clear naming
- Add comments for complex logic

## Related Documentation

- [Architecture](architecture.md) - System design
- [Components](components.md) - Component catalog
- [State Management](state-management.md) - State patterns
- [Contributing](../../CONTRIBUTING.md) - Contribution guide
