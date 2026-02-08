# Architecture Reference

Detailed technical architecture of JSON Visualization.

## System architecture

```
User Input (JSON/YAML/CSV/XML/TOML)
         ↓
   TextEditor (Monaco)
         ↓
   useFile Store (Zustand)
         ↓
   jsonParser.ts (Parse to graph nodes)
         ↓
   useGraph Store (Graph state)
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
   - Actions: `setContents`, `setFormat`, `checkFormat`

2. **useJson** - Parsed JSON state
   - `json`: Parsed JSON object
   - `getJson()`: Getter function

3. **useGraph** - Graph visualization state
   - `nodes`: Graph nodes array
   - `edges`: Graph edges array
   - `collapsedNodes`: Set of collapsed node IDs
   - Actions: `setGraph`, `expandNodes`, `collapseNodes`

4. **useConfig** - App configuration
   - `viewMode`: Graph or Tree view
   - Theme settings
   - Layout preferences

5. **useModal** - Modal state
   - Active modal type
   - Modal data

### State flow

```
User edits → TextEditor → useFile.setContents()
                              ↓
                    Debounced parse (600ms)
                              ↓
                    jsonParser.ts traverse()
                              ↓
                    useGraph.setGraph(nodes, edges)
                              ↓
                    GraphView re-renders
```

## Graph parsing algorithm

**File**: `src/features/editor/views/GraphView/lib/jsonParser.ts`

### Traverse function

Recursively walks JSON structure and builds graph nodes:

```typescript
function traverse(
  json: any,
  parent: string | null,
  key: string | number,
  nodes: NodeData[],
  edges: EdgeData[]
): void
```

**Logic**:
1. Create node for current value
2. Determine node type (object, array, primitive)
3. If parent exists, create edge from parent to current node
4. Recursively process children (object properties or array elements)
5. Calculate node size based on content

**Node types**:
- `object` - JSON objects
- `array` - JSON arrays
- `string`, `number`, `boolean`, `null` - Primitives

## Format conversion

**File**: `src/lib/utils/jsonAdapter.ts`

### contentToJson function

Converts any supported format to JSON:

```typescript
export async function contentToJson(
  contents: string,
  format: FileFormat
): Promise<any>
```

**Supported formats**:
- JSON → `JSON.parse()`
- YAML → `yaml.load()`
- CSV → `Papa.parse()` → array of objects
- XML → `xml2js.parseString()` → object
- TOML → `toml.parse()`

### jsonToContent function

Converts JSON to any format:

```typescript
export function jsonToContent(
  json: any,
  format: FileFormat
): string
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

1. **Debouncing**: Text editor changes debounced 600ms before parsing
2. **Memoization**: Nodes use `React.memo()` with custom equality
3. **Lazy loading**: Reference docs loaded on demand
4. **Session storage**: Persist user data across page reloads
5. **Code splitting**: Next.js automatic code splitting per route

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
const modal = useModal(state => state.modal);

// Open modal
useModal.setState({ modal: "import" });

// Close modal
useModal.setState({ modal: null });
```

**Available modals**:
- ImportModal - Import from URL/file
- DownloadModal - Export as PNG/JPEG/SVG
- TypeModal - Generate types
- SchemaModal - JSON Schema operations
- JQModal - jq queries
- JPathModal - JSONPath queries
- NodeModal - Node details

## Routing

Next.js file-based routing:

- `/` - Landing page
- `/editor` - Main editor
- `/widget` - Embeddable widget
- `/docs` - Documentation
- `/converter/[format1]-to-[format2]` - Format converters (12 routes)
- `/type/[format]-to-[language]` - Type generators (16 routes)
- `/tools/json-schema` - JSON Schema tools
- `/legal/privacy` - Privacy policy
- `/legal/terms` - Terms of service

## Build & deployment

**Build command**: `pnpm build`

**Output**: `.next/` directory with optimized production build

**Environment variables**:
- `NEXT_PUBLIC_NODE_LIMIT` - Max nodes in graph (default: 1000)

**Deployment**: Static export compatible, can deploy to Vercel, Netlify, or any static host.
