# Debugging Reference

Common issues, diagnostics, and fixes for JSON Visualization.

## Quick checklist

1. Reproduce in a clean session (new tab or hard refresh).
2. Open browser DevTools Console and Network panels.
3. Confirm `NEXT_PUBLIC_*` env vars in the built output.
4. Inspect Zustand stores with `getState()`.
5. Check for errors set in `useFile.error`.

## Common issues

### Parse error or blank visualization

Symptoms:

- Graph is empty
- Error toast appears
- Error message in bottom bar

What to check:

- `useFile.error` in `src/store/useFile.ts`
- Parsing logic in `src/lib/utils/jsonAdapter.ts`
- Debounced parsing path in editor view

Debug steps:

```ts
import useFile from "src/store/useFile";

const { contents, format, error } = useFile.getState();
console.log({ contents, format, error });
```

Fixes:

- Validate the input format and set correct `FileFormat`.
- Ensure `contentToJson` handles empty input gracefully.

### Node limit reached

Symptoms:

- Toast warning about node limit
- Graph stops expanding

What to check:

- `NEXT_PUBLIC_NODE_LIMIT` value
- Node count in `useGraph` store

Fixes:

- Increase `NEXT_PUBLIC_NODE_LIMIT` if acceptable.
- Encourage filtering or collapsing nodes.

### Toolbar action does nothing

Symptoms:

- Clicking a menu item does not open modal

What to check:

- `useModal` store in `src/store/useModal.ts`
- `ModalController` registration in `src/features/modals/ModalController.tsx`
- Action handler wiring in toolbar components

Debug steps:

```ts
import useModal from "src/store/useModal";

console.log(useModal.getState());
```

### Export fails

Symptoms:

- Download modal opens but export fails
- Error toast

What to check:

- Export utility functions in `src/lib/utils/`
- Canvas/SVG permissions in browser
- Large graph size causing timeouts

Fixes:

- Reduce node count before export
- Validate view mode and selection

### JsonDraw canvas does not render

Symptoms:

- Blank canvas in JsonDraw view
- Console error about Canvas API

What to check:

- JsonDraw is dynamically imported in `JsonDrawView`
- Ensure code only runs on client (no SSR)
- Confirm `window.JSONDRAW_ASSET_PATH` is set to `/jsondraw-fonts/`

Fixes:

- Avoid importing JsonDraw at module scope
- Verify fonts are available in public assets

## Store inspection

Zustand stores can be inspected directly:

```ts
import useGraph from "src/features/editor/views/GraphView/stores/useGraph";

const graphState = useGraph.getState();
console.log(graphState.nodes.length, graphState.edges.length);
```

## Network debugging

When fetch calls fail:

- Check request URL, headers, and status in Network tab.
- Confirm API keys and URLs are provided in `NEXT_PUBLIC_*` variables.
- Avoid logging secrets in production.

## Logging guidance

- Use temporary `console.debug` statements and remove after fix.
- Prefer logging derived values, not full data blobs.
- Do not log user content in production builds.

## When to add error handling

Add try-catch around:

- Format conversion
- JSON parsing
- Network requests

Use `react-hot-toast` for user-friendly feedback:

```ts
toast.error("Failed to process data!");
```
