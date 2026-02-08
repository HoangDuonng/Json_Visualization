# Limitations

Known limitations and constraints of JSON Visualization.

## Data Size Limits

### Node Limit

**Default:** 1000 nodes

**Reason:** Performance and browser memory

**What happens:**
- Warning shown when limit exceeded
- Graph may not render completely
- Performance degrades

**Solutions:**
- Collapse nested structures
- Filter data before visualizing
- Increase limit in `.env` file:
  ```
  NEXT_PUBLIC_NODE_LIMIT=2000
  ```
- Use Tree View for large datasets

### File Size

**Recommended:** < 5MB

**Maximum:** ~10MB (browser-dependent)

**What happens:**
- Slow parsing
- Browser may freeze
- Out of memory errors

**Solutions:**
- Split large files
- Use smaller samples
- Process server-side first
- Use streaming for very large files

### Browser Memory

**Typical limit:** 2-4GB per tab

**Factors:**
- Browser type and version
- Available system RAM
- Other open tabs
- Operating system

**Solutions:**
- Close other tabs
- Use dedicated browser window
- Restart browser
- Use desktop app (if available)

## Format Limitations

### JSON

**No comments:**
```json
{
  // This comment is not valid
  "name": "Alice"
}
```

**No trailing commas:**
```json
{
  "name": "Alice",
  "age": 30,  // ❌ Trailing comma
}
```

**No undefined:**
```json
{
  "value": undefined  // ❌ Use null instead
}
```

**No functions:**
```json
{
  "calculate": function() {}  // ❌ Not supported
}
```

### YAML

**Indentation-sensitive:**
```yaml
user:
  name: Alice
   age: 30  # ❌ Inconsistent indentation
```

**No tabs:**
```yaml
user:
	name: Alice  # ❌ Tab character
```

**Anchors not preserved:**
```yaml
defaults: &defaults
  timeout: 30

# Anchors lost in conversion
```

### CSV

**No nested structures:**
```csv
name,address
Alice,{"city": "NYC"}  # ❌ Nested object
```

**Flattened with dot notation:**
```csv
user.name,user.age
Alice,30
```

**No data types:**
```csv
name,age,active
Alice,30,true  # All treated as strings
```

**No arrays:**
```csv
name,tags
Alice,"admin,user"  # Comma-separated string
```

### XML

**Verbose:**
```xml
<person>
  <name>Alice</name>
  <age>30</age>
</person>
```

vs JSON:
```json
{"name": "Alice", "age": 30}
```

**Attribute handling:**
```xml
<person id="1">
  <name>Alice</name>
</person>
```

Converts to:
```json
{
  "person": {
    "@id": "1",  // Attribute prefixed
    "name": "Alice"
  }
}
```

## Visualization Limitations

### Graph View

**Maximum nodes:** 1000 (configurable)

**Performance:**
- Slow with > 500 nodes
- Laggy interactions
- High memory usage

**Layout:**
- May not be optimal for all structures
- Overlapping nodes possible
- Manual adjustment needed

**Solutions:**
- Use Tree View
- Collapse nodes
- Filter data
- Adjust layout settings

### Tree View

**Deep nesting:**
- Difficult to navigate
- Lots of scrolling
- Hard to see overview

**Large arrays:**
- Many items to expand
- Slow rendering
- Memory intensive

**Solutions:**
- Collapse deep levels
- Use search
- Filter data
- Use Graph View for overview

## Conversion Limitations

### Type Information Loss

**CSV conversions:**
```json
// Before (JSON)
{"age": 30, "active": true}

// After CSV → JSON
{"age": "30", "active": "true"}  // All strings
```

### Structure Changes

**Nested to CSV:**
```json
// Before
{"user": {"name": "Alice", "age": 30}}

// After (CSV)
user.name,user.age
Alice,30
```

### Array Handling

**Arrays in CSV:**
```json
// Before
{"tags": ["admin", "user"]}

// After (CSV)
tags
"admin,user"  // Comma-separated string
```

### Metadata Loss

**YAML to JSON:**
```yaml
# Comment lost
name: Alice  # This comment too
```

Converts to:
```json
{"name": "Alice"}  // No comments
```

## Type Generation Limitations

### Type Inference

**Based on sample data only:**
```json
[
  {"age": 30},
  {"age": "thirty"}  // Different type
]
```

Generated type may not capture all variations.

**Empty arrays:**
```json
{"items": []}  // Type unknown
```

Generates:
```typescript
items: any[]  // Generic type
```

**Null values:**
```json
{"value": null}  // Type ambiguous
```

May generate:
```typescript
value: any  // Or null
```

### Optional Fields

**Detection:**
```json
[
  {"name": "Alice", "age": 30},
  {"name": "Bob"}  // age missing
]
```

Generates:
```typescript
interface User {
  name: string;
  age?: number;  // Optional
}
```

May need manual adjustment if field should be required.

## Query Limitations

### jq

**Browser implementation:**
- Not full jq feature set
- Some advanced features missing
- Performance slower than CLI

**Memory:**
- Large result sets may fail
- Browser memory limits apply

### JSONPath

**Limited transformations:**
- Cannot transform structure
- Only filter and select
- Use jq for transformations

**No aggregations:**
- Cannot sum, average, etc.
- Use jq instead

## Export Limitations

### Image Size

**Maximum resolution:**
- Browser-dependent
- Typically 8192x8192px
- Larger may fail

**File size:**
- PNG: Can be large (> 10MB)
- JPEG: Smaller but lossy
- SVG: Smallest but limited support

### Quality

**Rasterization:**
- PNG/JPEG are pixel-based
- Quality loss when scaled
- Use SVG for scalability

**Text rendering:**
- May differ from screen
- Font embedding issues
- Use web-safe fonts

## Browser Compatibility

### Supported Browsers

**Fully supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Limited support:**
- Older browsers
- Mobile browsers (some features)
- Internet Explorer (not supported)

### Required Features

**JavaScript:**
- ES6+ features
- Async/await
- Modules

**APIs:**
- Canvas API
- File API
- Clipboard API
- Local Storage

**Missing features:**
- Older browsers may not work
- Polyfills not included
- Upgrade browser recommended

## Performance Considerations

### Large Datasets

**Symptoms:**
- Slow rendering
- Laggy interactions
- High CPU usage
- Browser freezing

**Thresholds:**
- > 500 nodes: Noticeable slowdown
- > 1000 nodes: Significant lag
- > 2000 nodes: May crash

**Solutions:**
- Reduce data size
- Use pagination
- Server-side processing
- Desktop application

### Complex Structures

**Deep nesting:**
- Slow traversal
- High memory usage
- Stack overflow possible

**Circular references:**
- Not supported
- Will cause errors
- Must be removed

### Animations

**Performance impact:**
- Smooth on small graphs
- Laggy on large graphs
- Disable for better performance

## Security Limitations

### Client-Side Only

**No server validation:**
- All processing in browser
- No server-side checks
- Trust user input

**XSS risks:**
- Sanitize user input
- Don't execute code from data
- Be cautious with external data

### Data Privacy

**Local processing:**
- Data never sent to server
- Safe for sensitive data
- But stored in browser cache

**Browser storage:**
- SessionStorage used
- Cleared on tab close
- Not encrypted

## Feature Limitations

### No Real-Time Collaboration

- Single user only
- No multi-user editing
- No conflict resolution

### No Version Control

- No history tracking
- No undo across sessions
- No branching

### No Database Integration

- No direct DB connection
- Manual export/import
- No sync

### No API

- No programmatic access
- No automation
- Browser-based only

## Workarounds

### For Large Files

1. **Split data:**
   ```bash
   # Split JSON array
   jq -c '.[]' large.json > items.jsonl
   ```

2. **Sample data:**
   ```bash
   # Take first 100 items
   jq '.[:100]' large.json > sample.json
   ```

3. **Filter data:**
   ```bash
   # Filter before visualizing
   jq '[.[] | select(.active == true)]' data.json
   ```

### For Complex Structures

1. **Flatten:**
   ```bash
   # Flatten nested structure
   jq 'flatten' nested.json
   ```

2. **Extract:**
   ```bash
   # Extract specific path
   jq '.data.users' response.json
   ```

### For Type Generation

1. **Combine samples:**
   ```json
   // Include all variations
   [
     {"name": "Alice", "age": 30},
     {"name": "Bob", "age": null},
     {"name": "Charlie"}
   ]
   ```

2. **Manual adjustment:**
   ```typescript
   // Review and adjust generated types
   interface User {
     name: string;
     age: number | null;  // Adjust as needed
   }
   ```

## Future Improvements

Planned features to address limitations:

- [ ] Streaming for large files
- [ ] Virtual scrolling
- [ ] Progressive rendering
- [ ] Worker threads
- [ ] Desktop application
- [ ] Server-side processing option
- [ ] Real-time collaboration
- [ ] Version control
- [ ] API access

## Reporting Issues

If you encounter limitations not listed:

1. Check [GitHub Issues](https://github.com/HoangDuonng/Json_Visualization/issues)
2. Search for existing reports
3. Create new issue with:
   - Description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Browser/OS info

## Related

- [Troubleshooting](../troubleshooting.md) - Common issues
- [Performance Tips](../how-to/customize-view.md#performance-options) - Optimize performance
- [Supported Formats](supported-formats.md) - Format specifications
