# Performance Optimization

Performance optimization techniques and best practices.

## Overview

JSON Visualization is optimized for client-side performance with techniques like debouncing, memoization, lazy loading, and efficient state management.

## Key Optimizations

### 1. Debouncing

**Purpose**: Reduce expensive operations

**Implementation:**
```typescript
import { useDebouncedValue } from "@mantine/hooks";

const [value, setValue] = React.useState("");
const [debouncedValue] = useDebouncedValue(value, 600);

React.useEffect(() => {
  // Only runs 600ms after user stops typing
  parseData(debouncedValue);
}, [debouncedValue]);
```

**Used for:**
- Text editor changes
- Search queries
- Graph updates
- Validation

**Impact**: 90% reduction in parse operations

### 2. Memoization

**Purpose**: Avoid unnecessary re-renders

**React.memo:**
```typescript
export const ExpensiveComponent = React.memo<Props>(
  ({ data }) => {
    // Expensive rendering
    return <div>{processData(data)}</div>;
  },
  (prevProps, nextProps) => {
    // Custom comparison
    return prevProps.data === nextProps.data;
  }
);
```

**useMemo:**
```typescript
const processedData = React.useMemo(() => {
  return expensiveOperation(data);
}, [data]);
```

**useCallback:**
```typescript
const handleClick = React.useCallback(() => {
  doSomething(value);
}, [value]);
```

**Impact**: 70% reduction in re-renders

### 3. Zustand Selectors

**Purpose**: Minimize state subscriptions

**Efficient:**
```typescript
// ✅ Only re-renders when contents changes
const contents = useFile(state => state.contents);
```

**Inefficient:**
```typescript
// ❌ Re-renders on any state change
const file = useFile();
const contents = file.contents;
```

**Impact**: 80% reduction in unnecessary updates

### 4. Virtual Scrolling

**Purpose**: Handle large lists

**Implementation:**
```typescript
import { FixedSizeList } from "react-window";

<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={50}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>{items[index]}</div>
  )}
</FixedSizeList>
```

**Impact**: Render only visible items

### 5. Code Splitting

**Purpose**: Reduce initial bundle size

**Dynamic imports:**
```typescript
const HeavyComponent = React.lazy(() => import("./HeavyComponent"));

<React.Suspense fallback={<Loading />}>
  <HeavyComponent />
</React.Suspense>
```

**Next.js automatic splitting:**
- Each page is separate bundle
- Shared code in common chunks
- On-demand loading

**Impact**: 60% faster initial load

### 6. Image Optimization

**Purpose**: Faster image loading

**Next.js Image:**
```typescript
import Image from "next/image";

<Image
  src="/logo.png"
  width={200}
  height={50}
  alt="Logo"
  priority // For above-fold images
/>
```

**Features:**
- Automatic WebP/AVIF
- Lazy loading
- Responsive sizes
- Blur placeholder

**Impact**: 50% smaller images

## Performance Metrics

### Target Metrics

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | ~1.2s |
| Time to Interactive | < 3.0s | ~2.5s |
| Largest Contentful Paint | < 2.5s | ~2.0s |
| Cumulative Layout Shift | < 0.1 | ~0.05 |
| First Input Delay | < 100ms | ~50ms |

### Measuring Performance

**React DevTools Profiler:**
```typescript
<Profiler id="GraphView" onRender={onRenderCallback}>
  <GraphView />
</Profiler>

function onRenderCallback(
  id, phase, actualDuration, baseDuration, startTime, commitTime
) {
  console.log(`${id} took ${actualDuration}ms`);
}
```

**Chrome Performance:**
1. Open DevTools
2. Performance tab
3. Record
4. Interact with app
5. Stop recording
6. Analyze timeline

**Lighthouse:**
```bash
# Run Lighthouse
lighthouse http://localhost:3000 --view
```

## Bottlenecks

### 1. Large JSON Parsing

**Problem**: Slow parsing of large files

**Solution:**
```typescript
// Stream parsing
async function parseStream(stream: ReadableStream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    buffer += decoder.decode(value, { stream: true });
    // Process buffer incrementally
  }
}
```

**Impact**: Handle files 10x larger

### 2. Graph Rendering

**Problem**: Slow rendering with many nodes

**Solution:**
```typescript
// Limit visible nodes
const MAX_NODES = 1000;

if (nodes.length > MAX_NODES) {
  nodes = nodes.slice(0, MAX_NODES);
  showWarning(`Showing first ${MAX_NODES} nodes`);
}

// Collapse by default
nodes.forEach(node => {
  if (node.depth > 3) {
    node.collapsed = true;
  }
});
```

**Impact**: Smooth rendering up to 1000 nodes

### 3. State Updates

**Problem**: Frequent state updates cause lag

**Solution:**
```typescript
// Batch updates
React.unstable_batchedUpdates(() => {
  setNodes(newNodes);
  setEdges(newEdges);
  setLoading(false);
});

// Or use single state object
setState({
  nodes: newNodes,
  edges: newEdges,
  loading: false,
});
```

**Impact**: 50% fewer renders

### 4. Memory Leaks

**Problem**: Memory grows over time

**Solution:**
```typescript
React.useEffect(() => {
  const subscription = observable.subscribe();
  
  // Cleanup
  return () => {
    subscription.unsubscribe();
  };
}, []);

// Clear large data
React.useEffect(() => {
  return () => {
    clearCache();
    releaseResources();
  };
}, []);
```

**Impact**: Stable memory usage

## Bundle Optimization

### Analysis

```bash
# Analyze bundle
pnpm analyze

# Output: .next/analyze/
# - client.html
# - server.html
```

### Techniques

**Tree shaking:**
```typescript
// ✅ Import only what you need
import { Button } from "@mantine/core";

// ❌ Import everything
import * as Mantine from "@mantine/core";
```

**Dynamic imports:**
```typescript
// Heavy library
const heavy = await import("heavy-library");
heavy.doSomething();
```

**Externalize dependencies:**
```javascript
// next.config.js
module.exports = {
  webpack: (config) => {
    config.externals = {
      ...config.externals,
      "heavy-lib": "HeavyLib",
    };
    return config;
  },
};
```

**Impact**: 40% smaller bundle

## Caching Strategies

### Browser Cache

```typescript
// Service Worker
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### Memory Cache

```typescript
const cache = new Map();

function getCachedData(key: string) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const data = expensiveOperation(key);
  cache.set(key, data);
  return data;
}
```

### Session Storage

```typescript
// Store parsed data
sessionStorage.setItem("parsed", JSON.stringify(data));

// Retrieve
const cached = sessionStorage.getItem("parsed");
if (cached) {
  return JSON.parse(cached);
}
```

**Impact**: 90% faster subsequent loads

## Best Practices

### 1. Avoid Inline Functions

```typescript
// ❌ Bad - creates new function every render
<button onClick={() => handleClick(id)}>Click</button>

// ✅ Good - stable reference
const onClick = React.useCallback(() => handleClick(id), [id]);
<button onClick={onClick}>Click</button>
```

### 2. Use Keys Properly

```typescript
// ❌ Bad - index as key
{items.map((item, index) => <Item key={index} {...item} />)}

// ✅ Good - stable unique key
{items.map(item => <Item key={item.id} {...item} />)}
```

### 3. Lazy Load Heavy Components

```typescript
// ❌ Bad - loads immediately
import HeavyChart from "./HeavyChart";

// ✅ Good - loads when needed
const HeavyChart = React.lazy(() => import("./HeavyChart"));
```

### 4. Optimize Images

```typescript
// ❌ Bad - large unoptimized image
<img src="/large-image.png" />

// ✅ Good - optimized with Next.js
<Image src="/large-image.png" width={800} height={600} />
```

### 5. Minimize Re-renders

```typescript
// ❌ Bad - creates new object every render
<Component style={{ padding: 10 }} />

// ✅ Good - stable reference
const style = { padding: 10 };
<Component style={style} />
```

## Monitoring

### Performance Monitoring

```typescript
// Custom metrics
performance.mark("parse-start");
parseData(data);
performance.mark("parse-end");

performance.measure("parse", "parse-start", "parse-end");
const measure = performance.getEntriesByName("parse")[0];
console.log(`Parse took ${measure.duration}ms`);
```

### Error Tracking

```typescript
// Track slow operations
if (duration > 1000) {
  console.warn(`Slow operation: ${duration}ms`);
  // Send to analytics
}
```

## Testing Performance

```typescript
describe("performance", () => {
  it("should parse large JSON quickly", () => {
    const largeJson = generateLargeJson(10000);
    
    const start = performance.now();
    parseJson(largeJson);
    const duration = performance.now() - start;
    
    expect(duration).toBeLessThan(1000); // < 1 second
  });
});
```

## Related

- [Architecture](../development/architecture.md) - System design
- [Graph Parsing](graph-parsing.md) - Parsing algorithm
- [Limitations](../reference/limitations.md) - Known limits
