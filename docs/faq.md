# Frequently Asked Questions (FAQ)

Common questions about JSON Visualization.

## General

### What is JSON Visualization?

JSON Visualization is a free, open-source web application that converts JSON, YAML, CSV, XML, and TOML data into interactive graphs and trees. It helps you understand, validate, and manipulate structured data.

### Is it free?

Yes, completely free and open-source under the MIT license.

### Do I need to install anything?

No. It's a web application that runs in your browser. Just visit the website and start using it.

### Is my data safe?

Yes. All processing happens in your browser. No data is sent to any server. Your data never leaves your machine.

### Can I use it offline?

The web version requires internet to load initially. For offline use, you can:
- Clone the repository and run locally
- Use the desktop app (if available)
- Cache the page in your browser

### What browsers are supported?

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Older browsers may not work properly.

## Features

### What formats are supported?

- JSON (JavaScript Object Notation)
- YAML (YAML Ain't Markup Language)
- CSV (Comma-Separated Values)
- XML (eXtensible Markup Language)
- TOML (Tom's Obvious Minimal Language)

### Can I convert between formats?

Yes. You can convert between any supported formats:
- JSON ↔ YAML ↔ CSV ↔ XML
- All combinations supported

See [Format Conversion](features/conversion.md).

### Can I generate code types?

Yes. Generate types for:
- TypeScript (interfaces)
- Go (structs)
- Rust (structs)
- Kotlin (data classes)

See [Type Generation](features/type-generation.md).

### Does it support JSON Schema?

Yes. You can:
- Generate schema from data
- Validate data against schema
- Generate mock data from schema

See [JSON Schema](features/json-schema.md).

### Can I query data?

Yes. Two query languages supported:
- **jq**: Powerful JSON processor
- **JSONPath**: XPath-like queries

See [Query Tools](features/queries.md).

### Can I export visualizations?

Yes. Export as:
- PNG (transparent or solid background)
- JPEG (smaller file size)
- SVG (scalable vector)

See [Export Images](features/export.md).

## Usage

### How do I load data?

Three ways:
1. **Paste**: Copy and paste into editor
2. **Upload**: Click File → Import → From File
3. **URL**: Click File → Import → From URL

### How do I save my work?

Click File → Download or press `Ctrl/Cmd + S`. Choose format and location.

### Can I edit the data?

Yes. Edit directly in the text editor. Changes reflect in the graph immediately.

### How do I search for specific data?

Press `Ctrl/Cmd + F` to open search. Type to find matching nodes.

### How do I collapse/expand nodes?

Click the arrow icon on nodes, or right-click → Collapse/Expand.

### Can I zoom and pan?

Yes:
- **Zoom**: Mouse wheel or `Ctrl/Cmd + +/-`
- **Pan**: Click and drag canvas
- **Fit**: Press `Ctrl/Cmd + 0`

### How do I switch between Graph and Tree view?

Click View → Tree View/Graph View or press `Ctrl/Cmd + Shift + V`.

## Data Limits

### What's the maximum file size?

Recommended: < 5MB  
Maximum: ~10MB (browser-dependent)

Larger files may cause performance issues.

### How many nodes can I visualize?

Default limit: 1000 nodes

You can increase this in settings, but performance may degrade.

### What if my file is too large?

Options:
1. Filter data before visualizing
2. Use smaller sample
3. Collapse nested structures
4. Increase node limit (may be slow)
5. Split into multiple files

See [Limitations](reference/limitations.md).

## Conversion

### Why does CSV lose nested data?

CSV is a flat format. Nested objects are flattened using dot notation:
```
user.name,user.age
Alice,30
```

### Why are all CSV values strings?

CSV has no data types. All values are treated as strings. You'll need to parse types after conversion.

### What happens to comments in YAML?

Comments are lost during conversion. JSON doesn't support comments.

### How are XML attributes handled?

Attributes are prefixed with `@`:
```xml
<person id="1">
```
Becomes:
```json
{"person": {"@id": "1"}}
```

## Type Generation

### Why is my type `any`?

This happens when:
- Empty arrays: `[]`
- Null values: `null`
- Mixed types: `[1, "two"]`

Provide complete sample data for better types.

### Are optional fields detected automatically?

Yes. Fields missing in some objects are marked optional:
```typescript
age?: number  // Optional
```

Review and adjust as needed.

### Can I customize generated types?

Yes. Copy the generated code and modify as needed. Add methods, change names, adjust optionality.

## Performance

### Why is it slow?

Common causes:
- Large file (> 5MB)
- Many nodes (> 1000)
- Deep nesting
- Complex structure

Solutions:
- Reduce data size
- Collapse nodes
- Disable animations
- Use Tree View

### Why does my browser freeze?

Usually due to:
- File too large
- Too many nodes
- Out of memory

Solutions:
- Close other tabs
- Restart browser
- Use smaller sample
- Increase browser memory limit

### How can I improve performance?

Tips:
- Collapse unnecessary nodes
- Reduce node limit
- Disable animations
- Use Tree View for large data
- Close other browser tabs

See [Performance Tips](how-to/customize-view.md#performance-options).

## Errors

### "Invalid JSON" error

Common causes:
- Missing comma
- Trailing comma
- Unquoted keys
- Single quotes (use double)

See [Validation](features/validation.md).

### "Invalid YAML" error

Common causes:
- Inconsistent indentation
- Tab characters (use spaces)
- Missing colon

### "File too large" error

Your file exceeds the size limit. Solutions:
- Use smaller sample
- Filter data first
- Split into multiple files

### "Out of memory" error

Browser ran out of memory. Solutions:
- Close other tabs
- Restart browser
- Use smaller file
- Reduce node limit

### Export fails

Common causes:
- Graph too large
- Resolution too high
- Browser memory limit

Solutions:
- Reduce resolution
- Crop to smaller area
- Use different format (SVG)

## Troubleshooting

### Graph not rendering

Check:
- Data is valid
- Format detected correctly
- Node limit not exceeded
- Browser console for errors

### Text editor not working

Try:
- Refresh page
- Clear browser cache
- Try different browser
- Check browser console

### Keyboard shortcuts not working

Ensure:
- Focus is on editor/graph
- No conflicting extensions
- Browser supports shortcuts

### Export image is blank

Possible causes:
- Graph not fully loaded
- Browser rendering issue
- Canvas size too large

Solutions:
- Wait for graph to load
- Try different format
- Reduce resolution

## Privacy & Security

### Where is my data stored?

Your data is only stored in your browser's session storage. It's cleared when you close the tab.

### Is my data sent to a server?

No. All processing happens in your browser. No data is transmitted.

### Can I use it for sensitive data?

Yes. Since everything is client-side, it's safe for sensitive data. However:
- Data is stored in browser cache
- Not encrypted in storage
- Clear cache after use if needed

### Are there any tracking or analytics?

The website may use analytics for usage statistics, but your actual data is never tracked or sent.

## Contributing

### How can I contribute?

Ways to contribute:
- Report bugs on GitHub
- Suggest features
- Submit pull requests
- Improve documentation
- Share with others

See [Contributing Guide](../CONTRIBUTING.md).

### Where do I report bugs?

Report bugs on [GitHub Issues](https://github.com/HoangDuonng/Json_Visualization/issues).

Include:
- Description
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS info

### Can I request features?

Yes! Submit feature requests on [GitHub Issues](https://github.com/HoangDuonng/Json_Visualization/issues).

### Is there a roadmap?

Check the [GitHub repository](https://github.com/HoangDuonng/Json_Visualization) for planned features and roadmap.

## Technical

### What technology is it built with?

- Next.js (React framework)
- TypeScript
- Zustand (state management)
- Reaflow (graph visualization)
- Monaco Editor (code editor)

See [Architecture](../.agentskills/json-visualization-dev/references/ARCHITECTURE.md).

### Can I self-host it?

Yes. Clone the repository and run:
```bash
pnpm install
pnpm build
pnpm start
```

See [Development Setup](development/setup.md).

### Is there an API?

No. It's a browser-based application only. No programmatic API available.

### Can I embed it in my website?

Yes. Use the widget version at `/widget` or embed as iframe.

### Does it work on mobile?

Basic functionality works on mobile browsers, but the experience is optimized for desktop.

## Comparison

### How is it different from other JSON viewers?

Features:
- Multiple format support (not just JSON)
- Type generation
- JSON Schema tools
- Query languages (jq, JSONPath)
- Export as images
- Completely free and open-source
- Privacy-focused (client-side only)

### Should I use this or a command-line tool?

Use JSON Visualization for:
- Visual exploration
- Quick validation
- Format conversion
- Type generation
- Sharing visualizations

Use CLI tools for:
- Automation
- Large files
- Server-side processing
- Scripting

Both have their place!

## Still Have Questions?

- Check [Troubleshooting](troubleshooting.md)
- Read [Documentation](getting-started.md)
- Search [GitHub Issues](https://github.com/HoangDuonng/Json_Visualization/issues)
- Ask on [GitHub Discussions](https://github.com/HoangDuonng/Json_Visualization/discussions)

## Related

- [Getting Started](getting-started.md)
- [Troubleshooting](troubleshooting.md)
- [Features](features/)
- [How-to Guides](how-to/)
