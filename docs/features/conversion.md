# Format Conversion

Convert between JSON, YAML, CSV, and XML formats seamlessly.

## Overview

JSON Visualization supports bidirectional conversion between multiple data formats:
- JSON ↔ YAML
- JSON ↔ CSV
- JSON ↔ XML
- YAML ↔ CSV
- YAML ↔ XML
- CSV ↔ XML

All conversions happen in your browser - no data is sent to servers.

## Supported Formats

### JSON (JavaScript Object Notation)

**Best for:**
- APIs and web services
- Configuration files
- Data interchange
- Nested structures

**Example:**
```json
{
  "name": "Alice",
  "age": 30,
  "hobbies": ["reading", "coding"]
}
```

### YAML (YAML Ain't Markup Language)

**Best for:**
- Configuration files
- Human-readable data
- Docker/Kubernetes configs
- CI/CD pipelines

**Example:**
```yaml
name: Alice
age: 30
hobbies:
  - reading
  - coding
```

### CSV (Comma-Separated Values)

**Best for:**
- Tabular data
- Spreadsheets
- Database exports
- Simple lists

**Example:**
```csv
name,age,city
Alice,30,New York
Bob,25,London
```

**Note:** CSV works best with flat, tabular data. Nested structures are flattened.

### XML (eXtensible Markup Language)

**Best for:**
- Legacy systems
- SOAP APIs
- Document markup
- Hierarchical data

**Example:**
```xml
<person>
  <name>Alice</name>
  <age>30</age>
  <hobbies>
    <hobby>reading</hobby>
    <hobby>coding</hobby>
  </hobbies>
</person>
```

### TOML (Tom's Obvious Minimal Language)

**Best for:**
- Configuration files
- Rust projects (Cargo.toml)
- Simple key-value data

**Example:**
```toml
name = "Alice"
age = 30
hobbies = ["reading", "coding"]
```

## How to Convert

### In the Editor

1. Paste or load your data
2. Click **Tools** → **Convert**
3. Select target format
4. Converted data appears in editor
5. Copy or download result

### Using Converter Pages

Direct conversion without the editor:

1. Visit `/converter/[source]-to-[target]`
   - Example: `/converter/json-to-yaml`
2. Paste source data
3. See converted result instantly
4. Copy or download

**Available converters:**
- [JSON to YAML](/converter/json-to-yaml)
- [JSON to CSV](/converter/json-to-csv)
- [JSON to XML](/converter/json-to-xml)
- [YAML to JSON](/converter/yaml-to-json)
- [YAML to CSV](/converter/yaml-to-csv)
- [YAML to XML](/converter/yaml-to-xml)
- [CSV to JSON](/converter/csv-to-json)
- [CSV to YAML](/converter/csv-to-yaml)
- [CSV to XML](/converter/csv-to-xml)
- [XML to JSON](/converter/xml-to-json)
- [XML to YAML](/converter/xml-to-yaml)
- [XML to CSV](/converter/xml-to-csv)

## Conversion Details

### JSON to YAML

**Preserves:**
- Object structure
- Arrays
- Data types (strings, numbers, booleans, null)
- Nesting

**Changes:**
- Syntax from JSON to YAML
- Quotes removed where possible
- Indentation-based structure

**Example:**
```json
// Input (JSON)
{
  "user": {
    "name": "Alice",
    "active": true
  }
}
```

```yaml
# Output (YAML)
user:
  name: Alice
  active: true
```

### JSON to CSV

**Preserves:**
- Flat key-value pairs
- Array items as rows

**Changes:**
- Nested objects flattened with dot notation
- Arrays converted to rows
- First row becomes headers

**Example:**
```json
// Input (JSON)
[
  { "name": "Alice", "age": 30 },
  { "name": "Bob", "age": 25 }
]
```

```csv
# Output (CSV)
name,age
Alice,30
Bob,25
```

**Nested objects:**
```json
// Input
{ "user": { "name": "Alice", "age": 30 } }
```

```csv
# Output
user.name,user.age
Alice,30
```

### JSON to XML

**Preserves:**
- Object structure
- Arrays
- Nesting

**Changes:**
- Objects become elements
- Properties become child elements
- Arrays become repeated elements

**Example:**
```json
// Input (JSON)
{
  "person": {
    "name": "Alice",
    "hobbies": ["reading", "coding"]
  }
}
```

```xml
<!-- Output (XML) -->
<person>
  <name>Alice</name>
  <hobbies>reading</hobbies>
  <hobbies>coding</hobbies>
</person>
```

### CSV to JSON

**Preserves:**
- Tabular structure
- Column names
- Row data

**Changes:**
- First row becomes object keys
- Each row becomes an object
- Result is array of objects

**Example:**
```csv
# Input (CSV)
name,age,city
Alice,30,New York
Bob,25,London
```

```json
// Output (JSON)
[
  { "name": "Alice", "age": 30, "city": "New York" },
  { "name": "Bob", "age": 25, "city": "London" }
]
```

### YAML to JSON

**Preserves:**
- All structure and data
- Data types
- Nesting

**Changes:**
- Syntax from YAML to JSON
- Adds quotes and braces
- Explicit structure

### XML to JSON

**Preserves:**
- Element hierarchy
- Text content
- Attributes (as properties)

**Changes:**
- Elements become objects
- Text content becomes `_text` property
- Attributes become properties with `@` prefix

**Example:**
```xml
<!-- Input (XML) -->
<person id="1">
  <name>Alice</name>
</person>
```

```json
// Output (JSON)
{
  "person": {
    "@id": "1",
    "name": "Alice"
  }
}
```

## Conversion Options

### CSV Options

**Delimiter:**
- Comma (default)
- Semicolon
- Tab
- Custom

**Headers:**
- First row as headers (default)
- No headers (use column indices)
- Custom headers

**Quotes:**
- Auto-detect (default)
- Always quote strings
- Never quote

### XML Options

**Root element:**
- Auto-generate (default)
- Custom root name

**Attributes:**
- Preserve as `@attribute`
- Convert to properties

**Arrays:**
- Detect repeated elements
- Force array for single items

## Common Use Cases

### API Response to CSV

Convert JSON API response to spreadsheet:
1. Copy API response (JSON)
2. Convert to CSV
3. Open in Excel/Google Sheets

### Config File Conversion

Convert between config formats:
- `package.json` (JSON) → `config.yaml` (YAML)
- `docker-compose.yml` (YAML) → JSON for processing
- `.env` → JSON → YAML

### Data Migration

Migrate data between systems:
- Export from database (CSV)
- Convert to JSON
- Import to new system

### Legacy System Integration

Work with XML APIs:
- Receive XML response
- Convert to JSON
- Process with modern tools
- Convert back to XML

## Limitations

### CSV Limitations

- **No nested structures**: Objects flattened with dot notation
- **No arrays**: Arrays converted to multiple rows or comma-separated
- **Type inference**: All values treated as strings unless parsed

### XML Limitations

- **Attribute handling**: Attributes prefixed with `@`
- **Text content**: Mixed content becomes `_text` property
- **Namespaces**: Namespace prefixes preserved but not validated

### YAML Limitations

- **Anchors and aliases**: Not preserved in conversion
- **Comments**: Lost during conversion
- **Custom tags**: Not supported

## Error Handling

**Invalid input:**
- Error message shows line/column
- Highlights problematic area
- Suggests fixes

**Conversion failures:**
- Explains why conversion failed
- Suggests alternative format
- Offers partial conversion if possible

## Tips

**For best results:**
- Validate source data before converting
- Use appropriate format for data structure
- Check converted output for accuracy
- Test with sample data first

**Performance:**
- Large files may take time to convert
- CSV to JSON is fastest
- XML parsing is slowest
- Consider file size limits

## Next Steps

- **Generate Types**: [Generate code types](type-generation.md) from converted data
- **Validate**: [Validate data](validation.md) after conversion
- **How-to Guide**: See [detailed conversion guide](../how-to/convert-formats.md)

## Related

- [Supported Formats](../reference/supported-formats.md) - Format specifications
- [How to Convert Formats](../how-to/convert-formats.md) - Step-by-step guide
- [Validation](validation.md) - Validate converted data
