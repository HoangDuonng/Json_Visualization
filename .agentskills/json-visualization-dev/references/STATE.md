# State Management Reference

Detailed guide to Zustand stores and state patterns in JSON Visualization.

## Store overview

All stores use Zustand with TypeScript. Pattern:

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

## useFile store

**File**: `src/store/useFile.ts` (160 LOC - largest store)

**Purpose**: Manages file content, format, and parsing.

### State

```typescript
interface FileStates {
  contents: string; // Raw file content
  format: FileFormat; // Current format (JSON/YAML/CSV/XML/TOML)
  error: string | null; // Parse error message
}
```

### Actions

```typescript
interface JsonActions {
  getContents: () => string;
  setContents: (contents: string) => void;
  setFormat: (format: FileFormat) => void;
  checkFormat: () => void; // Auto-detect format
  clear: () => void; // Reset to initial state
  setError: (error: string | null) => void;
}
```

### Usage

```typescript
import useFile from "src/store/useFile";

function MyComponent() {
  const contents = useFile(state => state.contents);
  const setContents = useFile(state => state.setContents);
  const format = useFile(state => state.format);

  const handleChange = (value: string) => {
    setContents(value);
  };

  return <textarea value={contents} onChange={e => handleChange(e.target.value)} />;
}
```

### Key behaviors

- **Auto-detection**: `checkFormat()` analyzes content to detect format
- **Validation**: Attempts to parse content and sets error if invalid
- **Session storage**: Persists contents to sessionStorage
- **Debouncing**: Changes trigger debounced parsing (600ms)

## useJson store

**File**: `src/store/useJson.ts`

**Purpose**: Stores parsed JSON object.

### State

```typescript
interface JsonState {
  json: any; // Parsed JSON object
}
```

### Actions

```typescript
interface JsonActions {
  getJson: () => any;
  setJson: (json: any) => void;
  clear: () => void;
}
```

### Usage

```typescript
import useJson from "src/store/useJson";

function MyComponent() {
  const json = useJson(state => state.json);
  const setJson = useJson(state => state.setJson);

  // Parse and store
  const parsed = JSON.parse(contents);
  setJson(parsed);
}
```

## useGraph store

**File**: `src/features/editor/views/GraphView/stores/useGraph.ts` (106 LOC)

**Purpose**: Manages graph visualization state.

### State

```typescript
interface GraphState {
  nodes: NodeData[]; // Graph nodes
  edges: EdgeData[]; // Graph edges
  collapsedNodes: Set<string>; // IDs of collapsed nodes
  collapsedEdges: string[]; // IDs of edges from collapsed nodes
  selectedNode: string | null; // Currently selected node ID
}
```

### Actions

```typescript
interface GraphActions {
  setGraph: (nodes: NodeData[], edges: EdgeData[]) => void;
  expandNodes: (nodeId: string) => void;
  collapseNodes: (nodeId: string) => void;
  setSelectedNode: (nodeId: string | null) => void;
  clearGraph: () => void;
}
```

### Usage

```typescript
import useGraph from "src/features/editor/views/GraphView/stores/useGraph";

function GraphView() {
  const nodes = useGraph(state => state.nodes);
  const edges = useGraph(state => state.edges);
  const setGraph = useGraph(state => state.setGraph);

  // Update graph
  React.useEffect(() => {
    const { nodes, edges } = parseJson(json);
    setGraph(nodes, edges);
  }, [json]);

  return <Canvas nodes={nodes} edges={edges} />;
}
```

### Key behaviors

- **Collapse/expand**: Manages node visibility in graph
- **Selection**: Tracks selected node for highlighting
- **Edge filtering**: Hides edges connected to collapsed nodes

## useConfig store

**File**: `src/store/useConfig.ts`

**Purpose**: App-wide configuration and preferences.

### State

```typescript
interface ConfigState {
  viewMode: ViewMode; // "graph" | "tree"
  theme: "light" | "dark";
  layout: LayoutType; // Graph layout algorithm
  zoomLevel: number;
}
```

### Actions

```typescript
interface ConfigActions {
  setViewMode: (mode: ViewMode) => void;
  setTheme: (theme: "light" | "dark") => void;
  setLayout: (layout: LayoutType) => void;
  setZoomLevel: (level: number) => void;
}
```

### Usage

```typescript
import useConfig from "src/store/useConfig";

function ViewToggle() {
  const viewMode = useConfig(state => state.viewMode);
  const setViewMode = useConfig(state => state.setViewMode);

  return (
    <button onClick={() => setViewMode(viewMode === "graph" ? "tree" : "graph")}>
      Switch to {viewMode === "graph" ? "Tree" : "Graph"} View
    </button>
  );
}
```

## useModal store

**File**: `src/store/useModal.ts`

**Purpose**: Modal state management.

### State

```typescript
interface ModalState {
  modal: ModalType | null; // Currently open modal
  data: any; // Modal-specific data
}
```

### Actions

```typescript
interface ModalActions {
  openModal: (modal: ModalType, data?: any) => void;
  closeModal: () => void;
}
```

### Usage

```typescript
import useModal from "src/store/useModal";

function Toolbar() {
  const openModal = useModal(state => state.openModal);

  return (
    <button onClick={() => openModal("import")}>
      Import
    </button>
  );
}

function ModalController() {
  const modal = useModal(state => state.modal);
  const closeModal = useModal(state => state.closeModal);

  return (
    <>
      {modal === "import" && <ImportModal onClose={closeModal} />}
      {modal === "download" && <DownloadModal onClose={closeModal} />}
      {/* ... other modals */}
    </>
  );
}
```

### Modal types

```typescript
type ModalType = "import" | "download" | "type" | "schema" | "jq" | "jpath" | "node";
```

## View mode state

Editor view mode is stored in session storage (not Zustand):

- **Key**: `viewMode`
- **Values**: `graph`, `tree`, `jsondraw`
- **Source**: `src/enums/viewMode.enum.ts`
- **Usage**: `src/features/editor/LiveEditor.tsx` and `src/features/editor/Toolbar/ViewMenu.tsx`

## State patterns

### Selector pattern

Use selectors to subscribe to specific state slices:

```typescript
// ✅ Good - only re-renders when contents changes
const contents = useFile(state => state.contents);

// ❌ Bad - re-renders on any state change
const file = useFile();
const contents = file.contents;
```

### Multiple selectors

```typescript
// ✅ Good - separate selectors
const contents = useFile(state => state.contents);
const format = useFile(state => state.format);

// ❌ Bad - single selector for multiple values (re-renders more often)
const { contents, format } = useFile(state => ({
  contents: state.contents,
  format: state.format
}));
```

### Action pattern

```typescript
// ✅ Good - stable reference, doesn't cause re-renders
const setContents = useFile(state => state.setContents);

// ✅ Also good - using setState directly
useFile.setState({ contents: newContents });
```

### Computed values

```typescript
// ✅ Good - compute in selector
const nodeCount = useGraph(state => state.nodes.length);

// ❌ Bad - compute in component (re-computes on every render)
const nodes = useGraph(state => state.nodes);
const nodeCount = nodes.length;
```

### Async actions

```typescript
// In store definition
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

// Usage
const loadFromUrl = useFile(state => state.loadFromUrl);
await loadFromUrl("https://example.com/data.json");
```

### Middleware pattern

Zustand supports middleware for logging, persistence, etc:

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      // store definition
    }),
    {
      name: "my-storage-key",
      storage: sessionStorage,
    }
  )
);
```

## State synchronization

### File → JSON → Graph flow

```typescript
// 1. User edits in TextEditor
useFile.setState({ contents: newValue });

// 2. Debounced parse (in useEffect)
const json = await contentToJson(contents, format);
useJson.setState({ json });

// 3. Parse to graph (in useEffect)
const { nodes, edges } = parseJson(json);
useGraph.setState({ nodes, edges });

// 4. GraphView re-renders with new nodes/edges
```

### Cross-store communication

Stores don't directly reference each other. Use React effects:

```typescript
function Editor() {
  const contents = useFile(state => state.contents);
  const format = useFile(state => state.format);
  const setJson = useJson(state => state.setJson);

  React.useEffect(() => {
    const parse = async () => {
      try {
        const json = await contentToJson(contents, format);
        setJson(json);
      } catch (error) {
        console.error("Parse error:", error);
      }
    };

    parse();
  }, [contents, format]);
}
```

### JsonDraw persistence

JsonDraw view auto-saves to `localStorage` under `jsondraw-autosave` and restores on load.

## Performance tips

1. **Use selectors**: Only subscribe to needed state slices
2. **Memoize selectors**: Use `React.useMemo` for expensive computations
3. **Batch updates**: Use `set()` once with multiple properties
4. **Avoid inline objects**: Don't create new objects in selectors
5. **Debounce frequent updates**: Use `useDebouncedValue` from Mantine hooks

Example:

```typescript
import { useDebouncedValue } from "@mantine/hooks";

function MyComponent() {
  const contents = useFile(state => state.contents);
  const [debouncedContents] = useDebouncedValue(contents, 600);

  React.useEffect(() => {
    // Only runs 600ms after user stops typing
    parseContents(debouncedContents);
  }, [debouncedContents]);
}
```

## Testing stores

Stores can be tested independently:

```typescript
import useFile from "src/store/useFile";

// Reset store before each test
beforeEach(() => {
  useFile.setState({ contents: "", format: "json", error: null });
});

test("setContents updates contents", () => {
  const { setContents, getContents } = useFile.getState();

  setContents("test");

  expect(getContents()).toBe("test");
});
```

**Note**: This project has no test suite. Only write tests if explicitly requested.
