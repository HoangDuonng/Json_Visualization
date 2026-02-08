# Supported Formats

Complete reference of supported data formats in JSON Visualization.

## Overview

JSON Visualization supports five data formats:
- JSON (JavaScript Object Notation)
- YAML (YAML Ain't Markup Language)
- CSV (Comma-Separated Values)
- XML (eXtensible Markup Language)
- TOML (Tom's Obvious Minimal Language)

## JSON

### Specification

- **Standard**: [RFC 8259](https://tools.ietf.org/html/rfc8259)
- **MIME Type**: `application/json`
- **File Extension**: `.json`
- **Encoding**: UTF-8

### Syntax

**Data types:**
- String: `"text"`
- Number: `123`, `45.67`
- Boolean: `true`, `false`
- Null: `null`
- Array: `[1, 2, 3]`
- Object: `{"key": "value"}`

**Example:**
```json
{
  "name": "Alice",
  "age": 30,
  "active": true,
  "tags": ["admin", "user"],
  "profile": {
    "email": "alice@example.com",
    "bio": null
  }
}
```

### Rules

- Keys must be strings in double quotes
- Strings must use double quotes
- No trailing commas
- No comments (standard JSON)
- Numbers: integers or floats
- Unicode supported

### Limitations

- No date/time type (use ISO 8601 strings)
- No binary data (use Base64 encoding)
- No circular references
- No undefined (use null)
- No functions

## YAML

### Specification

- **Standard**: [YAML 1.2](https://yaml.org/spec/1.2/spec.html)
- **MIME Type**: `application/x-yaml`
- **File Extension**: `.yaml`, `.yml`
- **Encoding**: UTF-8

### Syntax

**Data types:**
- String: `text` or `"text"`
- Number: `123`, `45.67`
- Boolean: `true`, `false`, `yes`, `no`
- Null: `null`, `~`
- Array: `[1, 2, 3]` or list format
- Object: `key: value`

**Example:**
```yaml
name: Alice
age: 30
active: true
tags:
  - admin
  - user
profile:
  email: alice@example.com
  bio: null
```

### Rules

- Indentation with spaces (not tabs)
- Consistent indentation (2 or 4 spaces)
- Colon after keys
- Hyphen for list items
- Comments with `#`
- Quotes optional for strings

### Features

**Anchors and aliases:**
```yaml
defaults: &defaults
  timeout: 30
  retries: 3

production:
  <<: *defaults
  host: prod.example.com
```

**Multiline strings:**
```yaml
description: |
  This is a multiline
  string that preserves
  line breaks.

summary: >
  This is a multiline
  string that folds
  into a single line.
```

### Limitations

- Indentation-sensitive
- Tabs not allowed
- Complex syntax for advanced features
- Anchors/aliases not preserved in conversion

## CSV

### Specification

- **Standard**: [RFC 4180](https://tools.ietf.org/html/rfc4180)
- **MIME Type**: `text/csv`
- **File Extension**: `.csv`
- **Encoding**: UTF-8

### Syntax

**Structure:**
- First row: Headers (column names)
- Subsequent rows: Data
- Columns separated by delimiter (comma, semicolon, tab)

**Example:**
```csv
name,age,city,active
Alice,30,New York,true
Bob,25,London,false
Charlie,35,Paris,true
```

### Rules

- First row as headers (optional)
- Consistent column count
- Delimiter: comma (default), semicolon, tab, custom
- Quotes for values with delimiter or newline
- Double quotes to escape quotes
- No nested structures

### Delimiters

**Comma (default):**
```csv
name,age,city
Alice,30,New York
```

**Semicolon:**
```csv
name;age;city
Alice;30;New York
```

**Tab:**
```csv
name	age	city
Alice	30	New York
```

### Quoting

**Values with delimiter:**
```csv
name,description
Alice,"Developer, Designer"
```

**Values with quotes:**
```csv
name,quote
Alice,"She said ""hello"""
```

**Values with newlines:**
```csv
name,bio
Alice,"Line 1
Line 2"
```

### Limitations

- No nested structures (flattened with dot notation)
- No data types (all values are strings)
- No arrays (converted to multiple rows or comma-separated)
- No null (empty string)
- Limited metadata

## XML

### Specification

- **Standard**: [XML 1.0](https://www.w3.org/TR/xml/)
- **MIME Type**: `application/xml`, `text/xml`
- **File Extension**: `.xml`
- **Encoding**: UTF-8

### Syntax

**Structure:**
- Elements: `<tag>content</tag>`
- Attributes: `<tag attr="value">`
- Self-closing: `<tag />`
- Comments: `<!-- comment -->`

**Example:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<person id="1">
  <name>Alice</name>
  <age>30</age>
  <active>true</active>
  <tags>
    <tag>admin</tag>
    <tag>user</tag>
  </tags>
  <profile>
    <email>alice@example.com</email>
    <bio />
  </profile>
</person>
```

### Rules

- Root element required
- Matching opening/closing tags
- Case-sensitive
- Proper nesting
- Attributes in quotes
- Special characters escaped

### Special Characters

**Entities:**
- `&lt;` for `<`
- `&gt;` for `>`
- `&amp;` for `&`
- `&quot;` for `"`
- `&apos;` for `'`

**Example:**
```xml
<message>Alice &amp; Bob said "hello"</message>
```

### Attributes vs Elements

**Attributes:**
```xml
<person id="1" name="Alice" />
```

**Elements:**
```xml
<person>
  <id>1</id>
  <name>Alice</name>
</person>
```

### Limitations

- Verbose syntax
- No native data types
- Attributes vs elements ambiguity
- Namespaces complexity
- No arrays (repeated elements)

## TOML

### Specification

- **Standard**: [TOML v1.0.0](https://toml.io/en/v1.0.0)
- **MIME Type**: `application/toml`
- **File Extension**: `.toml`
- **Encoding**: UTF-8

### Syntax

**Data types:**
- String: `"text"` or `'text'`
- Integer: `123`
- Float: `45.67`
- Boolean: `true`, `false`
- Date/Time: `2024-01-01T00:00:00Z`
- Array: `[1, 2, 3]`
- Table: `[section]`

**Example:**
```toml
name = "Alice"
age = 30
active = true
tags = ["admin", "user"]

[profile]
email = "alice@example.com"
bio = ""

[database]
host = "localhost"
port = 5432
```

### Rules

- Key-value pairs
- Sections with `[section]`
- Comments with `#`
- Quotes for strings
- No trailing commas
- Indentation optional

### Features

**Tables:**
```toml
[database]
host = "localhost"
port = 5432

[database.credentials]
username = "admin"
password = "secret"
```

**Arrays of tables:**
```toml
[[users]]
name = "Alice"
age = 30

[[users]]
name = "Bob"
age = 25
```

**Multiline strings:**
```toml
description = """
This is a multiline
string in TOML."""
```

### Limitations

- Less common than JSON/YAML
- Limited nesting compared to JSON
- Primarily for configuration files
- Not widely supported in APIs

## Format Comparison

| Feature | JSON | YAML | CSV | XML | TOML |
|---------|------|------|-----|-----|------|
| **Human-readable** | ✓ | ✓✓ | ✓✓ | ✓ | ✓✓ |
| **Nested data** | ✓✓ | ✓✓ | ✗ | ✓✓ | ✓ |
| **Arrays** | ✓✓ | ✓✓ | ✗ | ✓ | ✓✓ |
| **Data types** | ✓ | ✓✓ | ✗ | ✗ | ✓✓ |
| **Comments** | ✗ | ✓ | ✗ | ✓ | ✓ |
| **Compact** | ✓ | ✓✓ | ✓✓ | ✗ | ✓ |
| **API use** | ✓✓ | ✓ | ✗ | ✓ | ✗ |
| **Config files** | ✓ | ✓✓ | ✗ | ✓ | ✓✓ |
| **Tabular data** | ✗ | ✗ | ✓✓ | ✗ | ✗ |
| **Metadata** | ✗ | ✓ | ✗ | ✓✓ | ✗ |

**Legend:**
- ✓✓ Excellent
- ✓ Good
- ✗ Not supported / Poor

## Best Use Cases

### JSON

**Best for:**
- REST APIs
- Web applications
- Data interchange
- Configuration (simple)
- NoSQL databases

**Not ideal for:**
- Human editing (verbose)
- Comments needed
- Complex configuration

### YAML

**Best for:**
- Configuration files
- Docker/Kubernetes
- CI/CD pipelines
- Human-readable data
- Complex nested structures

**Not ideal for:**
- APIs (less common)
- Performance-critical (slower parsing)
- Strict validation

### CSV

**Best for:**
- Tabular data
- Spreadsheets
- Database exports
- Simple lists
- Data analysis

**Not ideal for:**
- Nested structures
- Complex data types
- Metadata

### XML

**Best for:**
- Legacy systems
- SOAP APIs
- Document markup
- Metadata-rich data
- Enterprise systems

**Not ideal for:**
- Modern APIs (verbose)
- Human editing
- Simple data

### TOML

**Best for:**
- Configuration files
- Rust projects (Cargo)
- Simple key-value data
- Human-readable config

**Not ideal for:**
- APIs
- Complex nesting
- Wide adoption needed

## Conversion Compatibility

### Lossless Conversions

**JSON ↔ YAML:**
- Fully compatible
- No data loss
- Syntax changes only

**JSON ↔ TOML:**
- Compatible for simple structures
- Some nesting limitations

### Lossy Conversions

**JSON/YAML → CSV:**
- Nested structures flattened
- Arrays converted to rows
- Type information lost

**CSV → JSON/YAML:**
- All values become strings
- No type inference
- Flat structure

**XML ↔ JSON:**
- Attributes become properties
- Text content handling varies
- Some structure changes

## File Size Comparison

Example data (1000 records):

| Format | Size | Compression |
|--------|------|-------------|
| JSON | 100 KB | Baseline |
| YAML | 85 KB | 15% smaller |
| CSV | 60 KB | 40% smaller |
| XML | 150 KB | 50% larger |
| TOML | 90 KB | 10% smaller |

**Note:** Actual sizes vary by data structure.

## Related

- [Format Conversion](../features/conversion.md) - Convert between formats
- [How to Convert](../how-to/convert-formats.md) - Step-by-step guide
- [Validation](../features/validation.md) - Validate formats
