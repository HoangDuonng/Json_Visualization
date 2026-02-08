# How to Convert Formats

Step-by-step guide to converting between JSON, YAML, CSV, and XML formats.

## Quick Start

1. Open the editor or converter page
2. Paste your source data
3. Select target format
4. Copy or download result

## JSON to YAML

### Using the Editor

1. Paste JSON in the editor
2. Click **Tools** → **Convert** → **YAML**
3. YAML appears in editor
4. Copy or save

**Example:**

**Input (JSON):**
```json
{
  "name": "Alice",
  "age": 30,
  "hobbies": ["reading", "coding"]
}
```

**Output (YAML):**
```yaml
name: Alice
age: 30
hobbies:
  - reading
  - coding
```

### Using Converter Page

1. Visit [/converter/json-to-yaml](/converter/json-to-yaml)
2. Paste JSON in left panel
3. See YAML in right panel
4. Click **Copy** or **Download**

## JSON to CSV

### Flat Objects

**Input:**
```json
[
  { "name": "Alice", "age": 30, "city": "New York" },
  { "name": "Bob", "age": 25, "city": "London" }
]
```

**Steps:**
1. Paste JSON array
2. Convert to CSV
3. First object keys become headers

**Output:**
```csv
name,age,city
Alice,30,New York
Bob,25,London
```

### Nested Objects

**Input:**
```json
{
  "user": {
    "name": "Alice",
    "age": 30
  }
}
```

**Output (flattened):**
```csv
user.name,user.age
Alice,30
```

**Note:** Nested objects use dot notation for column names.

## JSON to XML

**Input:**
```json
{
  "person": {
    "name": "Alice",
    "age": 30,
    "hobbies": ["reading", "coding"]
  }
}
```

**Steps:**
1. Paste JSON
2. Click **Tools** → **Convert** → **XML**
3. XML appears with proper structure

**Output:**
```xml
<person>
  <name>Alice</name>
  <age>30</age>
  <hobbies>reading</hobbies>
  <hobbies>coding</hobbies>
</person>
```

## YAML to JSON

**Input:**
```yaml
name: Alice
age: 30
hobbies:
  - reading
  - coding
```

**Steps:**
1. Visit [/converter/yaml-to-json](/converter/yaml-to-json)
2. Paste YAML
3. See JSON result

**Output:**
```json
{
  "name": "Alice",
  "age": 30,
  "hobbies": ["reading", "coding"]
}
```

## CSV to JSON

### Array of Objects

**Input:**
```csv
name,age,city
Alice,30,New York
Bob,25,London
```

**Steps:**
1. Paste CSV
2. Convert to JSON
3. First row becomes keys

**Output:**
```json
[
  { "name": "Alice", "age": 30, "city": "New York" },
  { "name": "Bob", "age": 25, "city": "London" }
]
```

### Custom Delimiter

If using semicolon or tab:

1. Click **Options**
2. Select delimiter
3. Convert

## XML to JSON

**Input:**
```xml
<person>
  <name>Alice</name>
  <age>30</age>
</person>
```

**Steps:**
1. Paste XML
2. Convert to JSON
3. Elements become properties

**Output:**
```json
{
  "person": {
    "name": "Alice",
    "age": 30
  }
}
```

### With Attributes

**Input:**
```xml
<person id="1">
  <name>Alice</name>
</person>
```

**Output:**
```json
{
  "person": {
    "@id": "1",
    "name": "Alice"
  }
}
```

**Note:** Attributes prefixed with `@`.

## Batch Conversion

Convert multiple files:

1. Prepare files in same format
2. Use converter page
3. Paste each file
4. Download results
5. Or use script (see below)

### Using Script

```bash
# Convert all JSON files to YAML
for file in *.json; do
  # Use converter API or tool
  convert "$file" yaml
done
```

## Conversion Options

### CSV Options

**Delimiter:**
- Comma (default)
- Semicolon
- Tab
- Custom

**Headers:**
- First row (default)
- No headers
- Custom headers

**Example:**
```
Delimiter: Semicolon
Headers: First row
Quote: Auto
```

### XML Options

**Root element:**
- Auto (default)
- Custom name

**Attributes:**
- Preserve with `@`
- Convert to properties

**Example:**
```
Root: data
Attributes: Preserve
Pretty print: Yes
```

## Common Scenarios

### API Response to Spreadsheet

1. Copy JSON API response
2. Convert to CSV
3. Open in Excel/Google Sheets

**Example:**
```json
[
  { "id": 1, "name": "Alice", "status": "active" },
  { "id": 2, "name": "Bob", "status": "inactive" }
]
```

→ CSV → Open in spreadsheet

### Config File Migration

Convert config between formats:

**docker-compose.yml (YAML) → JSON:**
1. Open YAML file
2. Convert to JSON
3. Use in JavaScript config

### Database Export to JSON

**CSV export → JSON:**
1. Export from database as CSV
2. Convert to JSON
3. Use in application

### Legacy XML to Modern JSON

**SOAP XML → JSON:**
1. Receive XML response
2. Convert to JSON
3. Process with modern tools

## Validation After Conversion

Always validate converted data:

1. Check structure
2. Verify data types
3. Test with sample
4. Validate against schema

**Steps:**
1. Convert data
2. Click **Tools** → **Validate**
3. Fix any errors
4. Re-convert if needed

## Troubleshooting

### Conversion Fails

**Issue:** "Invalid format"

**Solution:**
- Validate source data first
- Check for syntax errors
- Try smaller sample

### Data Loss

**Issue:** Nested data flattened in CSV

**Solution:**
- CSV doesn't support nesting
- Use JSON or YAML instead
- Or accept flattened structure

### Type Changes

**Issue:** Numbers become strings

**Solution:**
- CSV treats all as strings
- Parse types after conversion
- Use JSON Schema for validation

### Special Characters

**Issue:** Characters not displaying correctly

**Solution:**
- Ensure UTF-8 encoding
- Escape special characters
- Check quote settings

## Tips

**Before converting:**
- Validate source data
- Backup original
- Test with sample

**During conversion:**
- Check preview
- Verify structure
- Review options

**After converting:**
- Validate result
- Test in target system
- Keep both versions

## Next Steps

- [Validate converted data](validate-data.md)
- [Generate types from result](generate-types.md)
- [Learn about formats](../features/conversion.md)

## Related

- [Format Conversion Features](../features/conversion.md)
- [Data Validation](validate-data.md)
- [Supported Formats](../reference/supported-formats.md)
