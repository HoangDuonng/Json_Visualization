# Performance Reference

Performance patterns and profiling tips for JSON Visualization.

## Core principles

- Minimize parsing frequency with debouncing.
- Avoid unnecessary re-renders in graph nodes.
- Keep graph size within node limits.
- Prefer derived values in selectors.

## Parsing and conversion

Debounce parsing to avoid blocking the UI:

```ts
import { useDebouncedValue } from "@mantine/hooks";

const [debouncedContents] = useDebouncedValue(contents, 600);
```

Keep conversions in `src/lib/utils/jsonAdapter.ts` and avoid duplicate parsing.

## Graph rendering

Hot spots:

- Custom nodes in `src/features/editor/views/GraphView/CustomNode/`
- Layout updates in `GraphView`

Patterns:

- Use `React.memo()` with `propsAreEqual` in nodes.
- Collapse nodes to reduce render cost.
- Limit graph size with `NEXT_PUBLIC_NODE_LIMIT`.

## Zustand usage

Selectors reduce re-renders:

```ts
const nodeCount = useGraph(state => state.nodes.length);
```

Avoid selecting whole store objects in React components.

## Layout and view performance

- Prefer incremental updates over full graph rebuilds when possible.
- Avoid heavy computations in render paths.
- Use `useMemo` for derived values that are expensive.
- JsonDraw view should only rehydrate from JSON when the user has not started drawing.

## Profiling

Browser profiling steps:

1. Open Chrome DevTools Performance tab.
2. Record while editing large JSON.
3. Look for long scripting tasks during parse/layout.

React profiling steps:

1. Use React DevTools Profiler.
2. Record interactions in GraphView.
3. Identify components with high render cost.

## Large file handling

Recommendations:

- Warn users when approaching node limits.
- Suggest filtering or collapsing branches.
- Prefer tree view for huge datasets.

## Useful checks

- Node count matches `useGraph.getState().nodes.length`.
- Parsing time is within an acceptable range (target < 200ms for typical inputs).
- Memory does not grow after repeated edits.
