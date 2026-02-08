# Testing Guide

Testing strategy and guidelines for JSON Visualization.

## Current Status

**Note:** This project currently has **no test suite**.

Tests should only be added when explicitly requested by maintainers.

## Future Testing Strategy

When tests are added, follow these guidelines:

### Testing Framework

Recommended stack:
- **Jest** - Test runner
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interactions
- **MSW** - API mocking

### Installation

```bash
pnpm add -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event msw
```

### Configuration

**jest.config.js:**
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
};
```

## Test Structure

### Unit Tests

Test individual functions and utilities:

```typescript
// src/lib/utils/helpers.test.ts
import { isIframe } from './helpers';

describe('isIframe', () => {
  it('should return true when in iframe', () => {
    // Mock window
    Object.defineProperty(window, 'self', {
      value: {},
    });
    Object.defineProperty(window, 'top', {
      value: { different: true },
    });
    
    expect(isIframe()).toBe(true);
  });
  
  it('should return false when not in iframe', () => {
    Object.defineProperty(window, 'self', {
      value: window,
    });
    Object.defineProperty(window, 'top', {
      value: window,
    });
    
    expect(isIframe()).toBe(false);
  });
});
```

### Component Tests

Test React components:

```typescript
// src/components/MyComponent/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render title', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  
  it('should call onClick when clicked', async () => {
    const onClick = jest.fn();
    render(<MyComponent title="Test" onClick={onClick} />);
    
    await userEvent.click(screen.getByText('Test'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

### Store Tests

Test Zustand stores:

```typescript
// src/store/useFile.test.ts
import useFile from './useFile';

describe('useFile', () => {
  beforeEach(() => {
    // Reset store
    useFile.setState({ contents: '', format: 'json', error: null });
  });
  
  it('should set contents', () => {
    const { setContents, getContents } = useFile.getState();
    
    setContents('test');
    
    expect(getContents()).toBe('test');
  });
  
  it('should set format', () => {
    const { setFormat } = useFile.getState();
    
    setFormat('yaml');
    
    expect(useFile.getState().format).toBe('yaml');
  });
});
```

### Integration Tests

Test feature workflows:

```typescript
// src/features/editor/Editor.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Editor } from './Editor';

describe('Editor', () => {
  it('should load and visualize JSON', async () => {
    render(<Editor />);
    
    const editor = screen.getByRole('textbox');
    await userEvent.type(editor, '{"name": "Alice"}');
    
    await waitFor(() => {
      expect(screen.getByText('name')).toBeInTheDocument();
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });
  });
});
```

## Testing Patterns

### Mocking Zustand Stores

```typescript
import useFile from 'src/store/useFile';

jest.mock('src/store/useFile');

const mockUseFile = useFile as jest.MockedFunction<typeof useFile>;

mockUseFile.mockReturnValue({
  contents: 'test',
  setContents: jest.fn(),
  // ...
});
```

### Mocking Monaco Editor

```typescript
jest.mock('@monaco-editor/react', () => ({
  default: ({ value, onChange }: any) => (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  ),
}));
```

### Testing Async Operations

```typescript
it('should load data from URL', async () => {
  const mockFetch = jest.fn().mockResolvedValue({
    text: () => Promise.resolve('{"name": "Alice"}'),
  });
  global.fetch = mockFetch;
  
  const { loadFromUrl } = useFile.getState();
  await loadFromUrl('https://example.com/data.json');
  
  expect(mockFetch).toHaveBeenCalledWith('https://example.com/data.json');
  expect(useFile.getState().contents).toBe('{"name": "Alice"}');
});
```

## Test Coverage

### Coverage Goals

When tests are added:
- **Utilities**: 90%+ coverage
- **Stores**: 80%+ coverage
- **Components**: 70%+ coverage
- **Overall**: 75%+ coverage

### Running Coverage

```bash
pnpm test:coverage
```

### Coverage Report

```bash
# View in terminal
pnpm test:coverage

# Generate HTML report
pnpm test:coverage -- --coverage-reporters=html

# Open coverage/index.html
```

## Best Practices

### Test Naming

Use descriptive names:

```typescript
// ✅ Good
it('should display error message when validation fails', () => {});

// ❌ Bad
it('test error', () => {});
```

### Arrange-Act-Assert

Structure tests clearly:

```typescript
it('should update count when button clicked', async () => {
  // Arrange
  render(<Counter />);
  const button = screen.getByRole('button');
  
  // Act
  await userEvent.click(button);
  
  // Assert
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### Test One Thing

Each test should verify one behavior:

```typescript
// ✅ Good - separate tests
it('should render title', () => {});
it('should call onClick', () => {});

// ❌ Bad - testing multiple things
it('should render and handle click', () => {});
```

### Avoid Implementation Details

Test behavior, not implementation:

```typescript
// ✅ Good - tests behavior
expect(screen.getByText('Alice')).toBeInTheDocument();

// ❌ Bad - tests implementation
expect(component.state.name).toBe('Alice');
```

### Use Testing Library Queries

Prefer accessible queries:

```typescript
// ✅ Good - accessible
screen.getByRole('button', { name: 'Submit' });
screen.getByLabelText('Email');

// ❌ Bad - fragile
screen.getByTestId('submit-button');
```

## Running Tests

### Commands

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# Specific file
pnpm test MyComponent.test.tsx
```

### CI/CD Integration

Add to GitHub Actions:

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '24'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test:coverage
```

## When to Add Tests

Tests should be added when:
- Explicitly requested by maintainers
- Critical functionality needs coverage
- Bug fixes need regression tests
- Complex logic needs verification

**Do not add tests without discussion first.**

## Related Documentation

- [Contributing](../../CONTRIBUTING.md) - Contribution guide
- [Code Style](code-style.md) - Coding conventions
- [Architecture](architecture.md) - System design
