# Graph Parsing Algorithm

Deep dive into the JSON to graph parsing algorithm.

## Overview

The graph parser converts JSON data into nodes and edges for visualization. It traverses the JSON structure recursively and creates a graph representation.

**File**: `src/features/editor/views/GraphView/lib/jsonParser.ts`

## Algorithm

### Main Function

```typescript
function traverse(
  json: any,
  parent: string | null,
  key: string | number,
  nodes: NodeData[],
  edges: EdgeData[]
): void
```

**Parameters:**
- `json`: Current JSON value to process
- `parent`: Parent node ID (null for root)
- `key`: Property name or array index
- `nodes`: Array to collect nodes
- `edges`: Array to collect edges

### Process Flow

```
1. Generate unique node ID
2. Determine node type (object, array, primitive)
3. Create node with metadata
4. Add node to nodes array
5. If parent exists, create edge
6. If object/array, recursively process children
7. Calculate node size based on content
```

## Node Types

### Object Nodes

**Structure:**
```typescript
{
  id: "node-1",
  type: "object",
  text: "user",
  data: {
    name: "Alice",
    age: 30
  }
}
```

**Processing:**
1. Create object node
2. Iterate over properties
3. Recursively process each property
4. Create edges to child nodes

### Array Nodes

**Structure:**
```typescript
{
  id: "node-2",
  type: "array",
  text: "items",
  data: [1, 2, 3]
}
```

**Processing:**
1. Create array node
2. Iterate over items
3. Recursively process each item
4. Create edges with index labels

### Primitive Nodes

**Types:**
- String: `"text"`
- Number: `123`
- Boolean: `true`, `false`
- Null: `null`

**Structure:**
```typescript
{
  id: "node-3",
  type: "string",
  text: "name",
  data: "Alice"
}
```

## Node ID Generation

**Pattern:** `node-{counter}`

```typescript
let nodeCounter = 0;

function generateNodeId(): string {
  return `node-${nodeCounter++}`;
}
```

**Ensures:**
- Unique IDs
- Consistent ordering
- Predictable structure

## Edge Creation

**Structure:**
```typescript
{
  id: "edge-1",
  from: "node-1",
  to: "node-2",
  label: "property-name"
}
```

**Rules:**
- Edge from parent to child
- Label shows property name or array index
- No edge for root node

## Size Calculation

**Formula:**
```typescript
const size = calculateNodeSize(content);
```

**Factors:**
- Content length
- Node type
- Nesting level
- Number of children

**Constraints:**
- Minimum: 50px
- Maximum: 200px
- Default: 100px

## Example

### Input JSON

```json
{
  "user": {
    "name": "Alice",
    "age": 30
  },
  "tags": ["admin", "user"]
}
```

### Generated Nodes

```typescript
[
  {
    id: "node-0",
    type: "object",
    text: "root",
    data: { user: {...}, tags: [...] }
  },
  {
    id: "node-1",
    type: "object",
    text: "user",
    data: { name: "Alice", age: 30 }
  },
  {
    id: "node-2",
    type: "string",
    text: "name",
    data: "Alice"
  },
  {
    id: "node-3",
    type: "number",
    text: "age",
    data: 30
  },
  {
    id: "node-4",
    type: "array",
    text: "tags",
    data: ["admin", "user"]
  },
  {
    id: "node-5",
    type: "string",
    text: "0",
    data: "admin"
  },
  {
    id: "node-6",
    type: "string",
    text: "1",
    data: "user"
  }
]
```

### Generated Edges

```typescript
[
  { id: "edge-0", from: "node-0", to: "node-1", label: "user" },
  { id: "edge-1", from: "node-1", to: "node-2", label: "name" },
  { id: "edge-2", from: "node-1", to: "node-3", label: "age" },
  { id: "edge-3", from: "node-0", to: "node-4", label: "tags" },
  { id: "edge-4", from: "node-4", to: "node-5", label: "0" },
  { id: "edge-5", from: "node-4", to: "node-6", label: "1" }
]
```

## Performance

### Time Complexity

**O(n)** where n = number of nodes

- Single pass through data
- Each node visited once
- Linear growth

### Space Complexity

**O(n)** for nodes and edges arrays

- Stores all nodes
- Stores all edges
- Proportional to input size

### Optimization

**Techniques:**
- Early termination for large datasets
- Node limit enforcement
- Lazy loading for deep nesting
- Memoization for repeated structures

## Edge Cases

### Circular References

**Not supported** - will cause infinite loop

**Detection:**
```typescript
const visited = new Set();

function traverse(json: any, ...args) {
  if (visited.has(json)) {
    throw new Error("Circular reference detected");
  }
  visited.add(json);
  // ... process
}
```

### Deep Nesting

**Limit:** Browser stack size (~10,000 levels)

**Solution:**
- Iterative approach
- Breadth-first traversal
- Stack size monitoring

### Large Arrays

**Issue:** Too many nodes

**Solution:**
- Pagination
- Virtual scrolling
- Collapse by default
- Sample first N items

### Special Values

**Handling:**
- `undefined`: Treated as null
- `NaN`: Converted to null
- `Infinity`: Converted to string
- Functions: Ignored
- Symbols: Ignored

## Customization

### Custom Node Types

Add new node types:

```typescript
function getNodeType(value: any): string {
  if (value instanceof Date) return "date";
  if (value instanceof RegExp) return "regex";
  // ... default types
}
```

### Custom Rendering

Modify node appearance:

```typescript
function renderNode(node: NodeData): ReactNode {
  switch (node.type) {
    case "date":
      return <DateNode data={node.data} />;
    case "regex":
      return <RegexNode data={node.data} />;
    default:
      return <DefaultNode data={node.data} />;
  }
}
```

### Filtering

Filter nodes during parsing:

```typescript
function shouldIncludeNode(key: string, value: any): boolean {
  // Skip private properties
  if (key.startsWith("_")) return false;
  
  // Skip null values
  if (value === null) return false;
  
  return true;
}
```

## Testing

### Unit Tests

```typescript
describe("jsonParser", () => {
  it("should parse simple object", () => {
    const json = { name: "Alice" };
    const { nodes, edges } = parseJson(json);
    
    expect(nodes).toHaveLength(2); // root + name
    expect(edges).toHaveLength(1); // root -> name
  });
  
  it("should parse nested object", () => {
    const json = { user: { name: "Alice" } };
    const { nodes, edges } = parseJson(json);
    
    expect(nodes).toHaveLength(3); // root + user + name
    expect(edges).toHaveLength(2); // root -> user, user -> name
  });
  
  it("should parse array", () => {
    const json = { items: [1, 2, 3] };
    const { nodes, edges } = parseJson(json);
    
    expect(nodes).toHaveLength(5); // root + items + 3 numbers
    expect(edges).toHaveLength(4); // root -> items, items -> each number
  });
});
```

## Related

- [Architecture](../development/architecture.md) - System design
- [Performance](performance.md) - Optimization techniques
- [Format Conversion](format-conversion.md) - Data conversion
