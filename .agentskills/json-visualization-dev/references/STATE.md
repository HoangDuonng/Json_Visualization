# State Management Reference

Detailed guide to Zustand stores and state patterns in JSON Visualization.

## Store overview

The app uses Zustand with TypeScript. Most stores use this shape:

```typescript
import { create } from "zustand";

interface State {
  // state properties
}

interface Actions {
  // action methods
}

const useStore = create<State & Actions>()((set, get) => ({
  // initial state
  // action implementations
}));

export default useStore;
```

`useConfig` uses `persist` middleware, and `useModal` uses `createWithEqualityFn` from `zustand/traditional`.

## useFile store

**File**: `src/store/useFile.ts`

**Purpose**: Manages source file content, current format, parsing errors, file metadata, JSON schema, and session restoration.

### State

```typescript
type FileStates = {
  fileData: File | null;
  format: FileFormat;
  contents: string;
  error: any;
  hasChanges: boolean;
  jsonSchema: object | null;
};
```

`FileFormat` comes from `src/constants/enumData.ts` and currently supports JSON, YAML, XML, and CSV.

### Actions

```typescript
type SetContents = {
  contents|: string;
  hasChanges|: boolean;
  skipUpdate|: boolean;
  format|: FileFormat;
};

interface JsonActions {
  getContents: () => string;
  getFormat: () => FileFormat;
  getHasChanges: () => boolean;
  setError: (error: string | null) => void;
  setHasChanges: (hasChanges: boolean) => void;
  setContents: (data: SetContents) => void;
  fetchUrl: (url: string) => void;
  setFormat: (format: FileFormat) => void;
  clear: () => void;
  setFile: (fileData: File) => void;
  setJsonSchema: (jsonSchema: object | null) => void;
  checkEditorSession: (url: string | string[] | undefined, widget|: boolean) => void;
}
```

### Usage

```typescript
import useFile from "src/store/useFile";

function MyComponent() {
  const contents = useFile(state => state.contents);
  const setContents = useFile(state => state.setContents);

  const handleChange = (value: string) => {
    setContents({ contents: value });
  };

  return <textarea value={contents} onChange={e => handleChange(e.target.value)} />;
}
```

### Key behaviors

- Initializes with `src/data/example.json`.
- `setContents()` parses via `contentToJson(contents, format)`.
- Parsed values are debounced for 400ms before updating `useJson`.
- Session storage persists content and format for normal editor sessions.
- `setFormat()` converts existing content from the previous format to the new format.
- `fetchUrl()` fetches JSON from a URL and reports failures with `sonner`.

## useJson store

**File**: `src/store/useJson.ts`

**Purpose**: Stores the pretty-printed JSON string used by graph/tree views.

### State

```typescript
type JsonStates = {
  json: string;
  loading: boolean;
};
```

### Actions

```typescript
interface JsonActions {
  setJson: (json: string) => void;
  getJson: () => string;
  clear: () => void;
}
```

### Key behaviors

- `setJson(json)` sets `loading` to false and calls `useGraph.getState().setGraph(json)`.
- `clear()` clears the JSON string and calls `useGraph.getState().clearGraph()`.

## useGraph store

**File**: `src/features/editor/views/GraphView/stores/useGraph.ts`

**Purpose**: Manages graph visualization state and viewport controls.

### State

```typescript
interface Graph {
  viewPort: ViewPort | null;
  direction: CanvasDirection;
  loading: boolean;
  fullscreen: boolean;
  nodes: NodeData[];
  edges: EdgeData[];
  selectedNode: NodeData | null;
  path: string;
  aboveSupportedLimit: boolean;
}
```

### Actions

```typescript
interface GraphActions {
  setGraph: (json|: string, options|: Partial<Graph>[]) => void;
  setLoading: (loading: boolean) => void;
  setDirection: (direction: CanvasDirection) => void;
  setViewPort: (ref: ViewPort) => void;
  setSelectedNode: (nodeData: NodeData) => void;
  focusFirstNode: () => void;
  toggleFullscreen: (value: boolean) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  centerView: () => void;
  clearGraph: () => void;
  setZoomFactor: (zoomFactor: number) => void;
}
```

### Usage

```typescript
import useGraph from "src/features/editor/views/GraphView/stores/useGraph";

function GraphStats() {
  const nodeCount = useGraph(state => state.nodes.length);
  const edgeCount = useGraph(state => state.edges.length);

  return <span>{nodeCount} nodes / {edgeCount} edges</span>;
}
```

### Key behaviors

- `setGraph()` parses JSON with `parser()` from `GraphView/lib/jsonParser.ts`.
- If the node count exceeds `SUPPORTED_LIMIT`, it sets `aboveSupportedLimit`.
- Direction changes trigger a delayed `centerView()`.
- Zoom and center actions operate through the `react-zoomable-ui` viewport.

## useConfig store

**File**: `src/store/useConfig.ts`

**Purpose**: Persists app-wide editor preferences.

### State

```typescript
const initialStates = {
  darkmodeEnabled: true,
  imagePreviewEnabled: true,
  liveTransformEnabled: true,
  gesturesEnabled: false,
  rulersEnabled: true,
};
```

### Actions

```typescript
interface ConfigActions {
  toggleDarkMode: (value: boolean) => void;
  toggleImagePreview: (value: boolean) => void;
  toggleLiveTransform: (value: boolean) => void;
  toggleGestures: (value: boolean) => void;
  toggleRulers: (value: boolean) => void;
}
```

### Key behaviors

- Uses Zustand `persist` middleware with storage name `config`.
- `toggleImagePreview()` also calls `useGraph.getState().setGraph()` so node rendering refreshes.

## useModal store

**File**: `src/store/useModal.ts`

**Purpose**: Tracks visibility for every registered modal.

### State

```typescript
type ModalState = Record<ModalName, boolean>;
```

`ModalName` is derived from exports in `src/features/modals/modalTypes.ts`.

### Actions

```typescript
interface ModalActions {
  setVisible: (name: ModalName, open: boolean) => void;
}
```

### Usage

```typescript
import { useModal } from "src/store/useModal";

function ToolbarAction() {
  const setVisible = useModal(state => state.setVisible);

  return <button onClick={() => setVisible("ImportModal", true)}>Import</button>;
}
```

`src/features/modals/ModalController.tsx` maps over the `modals` array, reads `useModal(state => state[modalKey])`, and renders each modal with `opened` and `onClose`.

## View mode state

Editor view mode is stored in session storage, not Zustand.

- **Key**: `viewMode`
- **Values**: `graph`, `tree`, `jsondraw`
- **Source**: `ViewMode` enum in `src/constants/enumData.ts`
- **Usage**: `src/features/editor/LiveEditor.tsx` and `src/features/editor/Toolbar/ViewMenu.tsx`

## State patterns

### Selector pattern

Use selectors to subscribe to specific state slices:

```typescript
// Good: only re-renders when contents changes
const contents = useFile(state => state.contents);

// Avoid: re-renders on any state change
const file = useFile();
const contents = file.contents;
```

### Multiple selectors

```typescript
// Good: separate selectors
const contents = useFile(state => state.contents);
const format = useFile(state => state.format);

// Avoid: a new object in the selector can re-render more often
const { contents, format } = useFile(state => ({
  contents: state.contents,
  format: state.format,
}));
```

### Action pattern

```typescript
// Good: stable reference
const setContents = useFile(state => state.setContents);

// Also valid for direct state changes
useFile.setState({ hasChanges: false });
```

### Computed values

```typescript
// Good: compute in selector
const nodeCount = useGraph(state => state.nodes.length);
```

## State synchronization

### File -> JSON -> Graph flow

```typescript
// 1. User edits in TextEditor
useFile.getState().setContents({ contents: newValue });

// 2. setContents parses the current content and format
const json = await contentToJson(contents, format);

// 3. debouncedUpdateJson updates useJson
useJson.getState().setJson(JSON.stringify(json, null, 2));

// 4. useJson.setJson triggers useGraph.setGraph(json)
useGraph.getState().setGraph(jsonString);
```

### Cross-store communication

Current stores do call each other directly in a few places:

- `useFile` updates `useJson` and `useGraph`.
- `useJson` updates `useGraph`.
- `useConfig.toggleImagePreview()` refreshes `useGraph`.

When adding new behavior, prefer keeping shared updates explicit and easy to trace.

### JsonDraw persistence

JsonDraw view persists its own drawing state. See `src/features/editor/views/JsonDrawView/` for autosave, share link, and load-from-link behavior.

## Performance tips

1. Use selectors so components subscribe only to needed state slices.
2. Avoid creating new objects in selectors unless equality handling is intentional.
3. Batch updates with one `set()` call when practical.
4. Debounce frequent parsing or rendering updates.
5. Use `React.memo()` and custom equality in graph nodes when touching render-heavy paths.

## Testing stores

This project currently has no automated test suite. Only write tests if explicitly requested.

If tests are added later, stores can be reset with `setState()`:

```typescript
import { FileFormat } from "src/constants/enumData";
import useFile from "src/store/useFile";

beforeEach(() => {
  useFile.setState({ contents: "", format: FileFormat.JSON, error: null });
});
```
