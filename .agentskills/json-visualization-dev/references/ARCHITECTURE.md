# Architecture Reference

Detailed technical architecture of JSON Visualization.

## System architecture

```
User Input (JSON/YAML/CSV/XML)
         ↓
   TextEditor (Monaco)
         ↓
   useFile Store (Zustand)
         ↓
   contentToJson (Parse to JSON)
         ↓
   useJson Store (JSON string)
         ↓
   useGraph.setGraph (parser)
         ↓
   GraphView (Reaflow rendering)
         ↓
   Custom Nodes/Edges (React components)
```

## State management

### Store hierarchy

1. **useFile** - Source of truth for file content
   - `contents`: Raw file content
   - `format`: FileFormat enum
   - `error`: Parse errors
   - Actions: `setContents`, `setFormat`, `setError`, `checkEditorSession`

2. **useJson** - Parsed JSON string state
   - `json`: JSON string
   - `getJson()`: Getter function

3. **useGraph** - Graph visualization state
   - `nodes`: Graph nodes array
   - `edges`: Graph edges array
   - `viewPort`: Zoom/pan state
   - `direction`: Layout direction
   - `aboveSupportedLimit`: Node limit flag
   - Actions: `setGraph`, `setLoading`, `setDirection`, `setViewPort`

4. **useConfig** - App configuration
   - `darkmodeEnabled`, `imagePreviewEnabled`, `liveTransformEnabled`
   - `gesturesEnabled`, `rulersEnabled`

5. **useModal** - Modal visibility map
   - Boolean flags keyed by `ModalName`
   - Action: `setVisible(name, open)`

### State flow

```
User edits → TextEditor → useFile.setContents()
                              ↓
                    Debounced parse (400ms)
                              ↓
                    contentToJson(contents, format)
                              ↓
                    useJson.setJson(JSON.stringify(json))
                              ↓
                    useGraph.setGraph(json)
                              ↓
                    GraphView re-renders
```

## Graph parsing algorithm

**File**: `src/features/editor/views/GraphView/lib/jsonParser.ts`

### Traverse function

Parses JSON to a tree and builds graph nodes:

```typescript
export const parser = (json: string): Graph => {
  const jsonTree = parseTree(json);
  // traverse(node, parentId?)
};
```

**Logic**:

1. Parse string with `jsonc-parser` to a syntax tree
2. Traverse nodes and build `NodeData` rows
3. Create edges between parent and child nodes
4. Calculate node size via `calculateNodeSize`

**Node types**:

- `object` - JSON objects
- `array` - JSON arrays
- `string`, `number`, `boolean`, `null` - Primitives

## Format conversion

**File**: `src/lib/utils/jsonAdapter.ts`

### contentToJson function

Converts any supported format to JSON:

```typescript
export async function contentToJson(contents: string, format: FileFormat): Promise<any>;
```

**Supported formats**:

- JSON → `jsonc-parser` (with fallback to `JSON.parse`)
- YAML → `js-yaml`
- CSV → `json-2-csv`
- XML → `fast-xml-parser`

### jsonToContent function

Converts JSON to any format:

```typescript
export function jsonToContent(json: any, format: FileFormat): string;
```

## Type generation

### TypeScript/Kotlin/Rust

**File**: `src/lib/utils/generateType.ts`

Uses `json-to-ts`, `json-to-kotlin`, `json-to-rust` libraries.

### Go

**File**: `src/lib/utils/json2go.js`

Custom implementation:

1. Parse JSON structure
2. Identify types for each field
3. Generate Go struct definitions
4. Handle nested structs
5. Format with proper indentation

## Component architecture

### GraphView

**File**: `src/features/editor/views/GraphView/index.tsx`

**Responsibilities**:

- Render Reaflow canvas
- Handle zoom/pan controls
- Manage node selection
- Provide context menu (OptionsMenu)

**Key props to Reaflow**:

- `nodes`: Array of node data
- `edges`: Array of edge data
- `node`: Custom node component
- `edge`: Custom edge component
- `onLayoutChange`: Update positions

### Custom nodes

**Files**:

- `src/features/editor/views/GraphView/CustomNode/ObjectNode.tsx`
- `src/features/editor/views/GraphView/CustomNode/TextNode.tsx`

**ObjectNode**: Renders objects/arrays with collapsible UI
**TextNode**: Renders primitive values with syntax highlighting

Both use `React.memo()` with custom `propsAreEqual` for performance.

### Custom edges

**File**: `src/features/editor/views/GraphView/CustomEdge/index.tsx`

Simple edge rendering with label support.

## Performance optimizations

1. **Debouncing**: Text editor changes debounced 400ms before parsing
2. **Memoization**: Nodes use `React.memo()` with custom equality
3. **Session storage**: Persist user data across page reloads
4. **Code splitting**: Next.js automatic code splitting per route

## Editor integration

### Monaco Editor

**File**: `src/features/editor/TextEditor.tsx`

**Configuration**:

- Language: Auto-detected from file format
- Theme: Custom theme matching app design
- Options: Line numbers, minimap, word wrap
- Validation: JSON/YAML syntax validation

**Event handling**:

- `onChange`: Update `useFile.contents`
- `onMount`: Set up editor instance
- Format on paste: Auto-format pasted content

## Modal system

**File**: `src/features/modals/ModalController.tsx`

**Pattern**:

```typescript
const opened = useModal(state => state[modalKey]);
useModal.getState().setVisible(modalKey, true);
```

**Available modals**:

- Driven by `src/features/modals/` exports and `modalTypes.ts`
- `ModalController` maps all registered modal components

## Routing

Next.js file-based routing:

- `/` - Landing page
- `/editor` - Main editor
- `/widget` - Embeddable widget
- `/docs` - Documentation
- `/converter/[format]-to-[format]` - Format converters
- `/type/[format]-to-[language]` - Type generators
- `/tools/json-schema` - JSON Schema tools
- `/legal/privacy` - Privacy policy
- `/legal/terms` - Terms of service

## Build & deployment

**Build command**: `pnpm build`

**Output**: `.next/` directory with optimized production build

**Environment variables**:

- `NEXT_PUBLIC_NODE_LIMIT` - Max nodes in graph (required in env)

**Deployment**: Static export compatible, can deploy to Vercel, Netlify, or any static host.
