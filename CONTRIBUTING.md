# Contributing to JSON Visualization

Thank you for your interest in contributing! This guide will help you get started.

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to build something great together.

## Ways to Contribute

- **Report bugs** - Found an issue? Let us know
- **Suggest features** - Have an idea? Share it
- **Fix bugs** - Submit a pull request
- **Add features** - Implement new functionality
- **Improve docs** - Help others understand
- **Review PRs** - Help maintain quality

## Getting Started

### Prerequisites

- Node.js >= 24.x
- pnpm (package manager)
- Git
- Code editor (VS Code recommended)

### Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Json_Visualization.git
   cd Json_Visualization
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Start development server**
   ```bash
   pnpm dev
   # Open http://localhost:3000
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## Development Workflow

### 1. Make Changes

Edit code following our [code style guidelines](#code-style).

### 2. Test Locally

```bash
# Run dev server
pnpm dev

# Build for production
pnpm build

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix
```

### 3. Commit Changes

Use clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add CSV export feature"
```

**Commit message format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Tests
- `chore:` Maintenance

### 4. Push Changes

```bash
git push origin feature/your-feature-name
```

### 5. Create Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill in PR template
5. Submit

## Code Style

### TypeScript

**Use type imports:**
```typescript
// ✅ Correct
import type { MenuItemProps } from "@mantine/core";

// ❌ Wrong
import { MenuItemProps } from "@mantine/core";
```

**Define interfaces:**
```typescript
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}
```

### Import Order

1. React imports
2. Next.js imports
3. @mantine/core
4. Other @mantine packages
5. styled-components
6. Third-party modules
7. Internal src/ imports
8. Relative imports

**Example:**
```typescript
import React from "react";
import Link from "next/link";
import { Button } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import useGraph from "src/features/editor/views/GraphView/stores/useGraph";
import { isIframe } from "../lib/utils/helpers";
```

### Naming Conventions

- **Components**: PascalCase (`Navbar.tsx`)
- **Hooks**: camelCase with `use` prefix (`useFocusNode.ts`)
- **Stores**: camelCase with `use` prefix (`useFile.ts`)
- **Functions**: camelCase (`fetchUrl`)
- **Constants**: camelCase or UPPER_SNAKE_CASE
- **Styled components**: Prefix with `Styled` (`StyledButton`)

### Formatting

- Double quotes only
- Semicolons required
- Max 100 characters per line
- No multiple empty lines
- Avoid parens for single arrow function params

**Run formatter:**
```bash
pnpm lint:fix
```

## Project Structure

```
src/
├── pages/              # Next.js pages (routing)
├── components/         # Reusable UI components
├── features/           # Feature modules
│   ├── editor/        # Editor features
│   └── modals/        # Modal dialogs
├── store/             # Zustand stores
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── types/             # TypeScript types
├── constants/         # Constants
└── enums/             # Enumerations
```

## Adding Features

### 1. Plan Your Feature

- Check existing issues
- Discuss in GitHub Discussions
- Get feedback before coding

### 2. Create Components

```typescript
// src/components/MyComponent/MyComponent.tsx
import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  padding: 1rem;
`;

interface MyComponentProps {
  title: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return <StyledWrapper>{title}</StyledWrapper>;
};
```

```typescript
// src/components/MyComponent/index.ts
export { MyComponent } from "./MyComponent";
```

### 3. Add Store (if needed)

```typescript
// src/store/useMyStore.ts
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

### 4. Add Tests (if requested)

**Note:** Project currently has no test suite. Only add tests if explicitly requested.

### 5. Update Documentation

- Add to relevant docs
- Update README if needed
- Add examples

## Fixing Bugs

### 1. Reproduce the Bug

- Follow steps in issue
- Confirm bug exists
- Understand the cause

### 2. Write Fix

- Minimal changes
- Fix root cause
- Don't break existing functionality

### 3. Test Fix

- Verify bug is fixed
- Test related functionality
- Check for regressions

### 4. Document Fix

- Update changelog
- Add comments if complex
- Reference issue number

## Pull Request Guidelines

### PR Title

Clear and descriptive:
- `feat: add CSV export feature`
- `fix: resolve graph rendering issue`
- `docs: update contributing guide`

### PR Description

Include:
- **What**: What does this PR do?
- **Why**: Why is this change needed?
- **How**: How does it work?
- **Testing**: How was it tested?
- **Screenshots**: If UI changes

**Template:**
```markdown
## Description
Brief description of changes

## Motivation
Why this change is needed

## Changes
- Change 1
- Change 2

## Testing
How to test this PR

## Screenshots (if applicable)
Before/after images

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### PR Size

Keep PRs small and focused:
- One feature/fix per PR
- < 500 lines changed (ideal)
- Split large changes

### Review Process

1. **Automated checks** run (linting, build)
2. **Maintainer review** (1-2 reviewers)
3. **Feedback** addressed
4. **Approval** and merge

## Code Review

### As Author

- Respond to feedback
- Make requested changes
- Be open to suggestions
- Ask questions if unclear

### As Reviewer

- Be constructive
- Explain reasoning
- Suggest improvements
- Approve when ready

## Common Tasks

### Adding a Converter

1. Create route: `src/pages/converter/[format1]-to-[format2].tsx`
2. Use `ConverterLayout/ToolPage.tsx`
3. Conversion logic in `lib/utils/jsonAdapter.ts`

### Adding a Type Generator

1. Create route: `src/pages/type/[format]-to-[language].tsx`
2. Use `TypeLayout/TypegenWrapper.tsx`
3. Generation logic in `lib/utils/generateType.ts`

### Adding a Modal

1. Create in `src/features/modals/MyModal/`
2. Add to `modalTypes.ts`
3. Add to `ModalController.tsx`
4. Use `useModal` store

### Adding a Store

1. Create in `src/store/useMyStore.ts`
2. Define state and actions
3. Export default
4. Use in components

## Best Practices

### Performance

- Use debouncing for expensive operations
- Memoize components with `React.memo()`
- Use Zustand selectors efficiently
- Avoid unnecessary re-renders

### Error Handling

- Use try-catch for async operations
- Provide user feedback with `react-hot-toast`
- Store errors in state
- Log errors to console

### Accessibility

- Use semantic HTML
- Add ARIA labels
- Support keyboard navigation
- Test with screen readers

### Security

- Sanitize user input
- Validate data
- No eval() or dangerous code
- Follow security best practices

## Resources

### Documentation

- [Agent Skills](.agentskills/json-visualization-dev/SKILL.md) - Project overview
- [Architecture](.agentskills/json-visualization-dev/references/ARCHITECTURE.md) - System design
- [Components](.agentskills/json-visualization-dev/references/COMPONENTS.md) - Component catalog
- [State](.agentskills/json-visualization-dev/references/STATE.md) - State management

### External

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Mantine Docs](https://mantine.dev/)

## Getting Help

### Questions?

- Check [FAQ](docs/faq.md)
- Search [GitHub Issues](https://github.com/HoangDuonng/Json_Visualization/issues)
- Ask in [GitHub Discussions](https://github.com/HoangDuonng/Json_Visualization/discussions)

### Stuck?

- Review existing code
- Check documentation
- Ask maintainers
- Don't hesitate to ask!

## Recognition

Contributors are recognized in:
- README.md
- Release notes
- GitHub contributors page

Thank you for contributing! 🎉

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
