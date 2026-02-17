# Testing Reference

Testing guidance for JSON Visualization.

## Current status

This project currently has no automated test suite. Do not add tests unless explicitly requested.

## Manual testing checklist

Core flows:

- Paste JSON and verify graph renders.
- Switch between Graph and Tree views.
- Run format conversions (JSON/YAML/CSV/XML/TOML).
- Run JSONPath and jq queries.
- Generate types for at least one language.
- Export visualization (PNG/SVG).

Edge cases:

- Invalid JSON should show an error message.
- Large input should respect node limit.
- Empty input should not crash.

## Suggested test strategy (future)

If a test suite is introduced, start with:

1. **Unit tests**
   - `src/lib/utils/jsonAdapter.ts`
   - `src/lib/utils/generateType.ts`
   - Graph parsing in `src/features/editor/views/GraphView/lib/jsonParser.ts`

2. **Store tests**
   - `useFile`, `useJson`, `useGraph`, `useConfig`, `useModal`
   - Validate actions update state correctly

3. **Component tests**
   - GraphView renders nodes/edges
   - Toolbar actions open modals
   - Converter/Type pages render and handle inputs

## Test isolation notes

- Reset stores between tests using `setState`.
- Avoid real network calls; mock fetch.
- Keep fixtures small and representative.

Example store reset pattern:

```ts
import useFile from "src/store/useFile";

beforeEach(() => {
  useFile.setState({ contents: "", error: null });
});
```
