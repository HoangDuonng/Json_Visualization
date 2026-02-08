# Data Validation

Validate JSON, YAML, CSV, and XML data for correctness and structure.

## Overview

JSON Visualization automatically validates your data as you type, helping you catch errors early and ensure data integrity.

## Real-time Validation

### In the Editor

**Visual indicators:**
- ✅ **Green checkmark**: Valid data
- ❌ **Red X**: Invalid data
- ⚠️ **Yellow warning**: Valid but with warnings

**Error display:**
- Error message at bottom of editor
- Line and column number
- Syntax highlighting of error location
- Suggested fix when available

### Validation Types

**Syntax validation:**
- Checks format-specific syntax rules
- Detects missing brackets, quotes, commas
- Identifies invalid characters
- Validates structure

**Schema validation:**
- Validates against JSON Schema (optional)
- Checks required fields
- Validates data types
- Enforces constraints

## Format-Specific Validation

### JSON Validation

**Checks for:**
- Valid JSON syntax
- Matching brackets `{}` and `[]`
- Proper comma placement
- Quoted keys and string values
- No trailing commas
- Valid escape sequences

**Common errors:**
```json
// ❌ Missing comma
{
  "name": "Alice"
  "age": 30
}

// ✅ Fixed
{
  "name": "Alice",
  "age": 30
}
```

```json
// ❌ Trailing comma
{
  "name": "Alice",
  "age": 30,
}

// ✅ Fixed
{
  "name": "Alice",
  "age": 30
}
```

```json
// ❌ Unquoted key
{
  name: "Alice"
}

// ✅ Fixed
{
  "name": "Alice"
}
```

### YAML Validation

**Checks for:**
- Valid YAML syntax
- Proper indentation (spaces, not tabs)
- Valid key-value pairs
- List syntax
- Multiline strings
- Anchors and aliases

**Common errors:**
```yaml
# ❌ Inconsistent indentation
user:
  name: Alice
   age: 30

# ✅ Fixed
user:
  name: Alice
  age: 30
```

```yaml
# ❌ Tab character (use spaces)
user:
	name: Alice

# ✅ Fixed (2 spaces)
user:
  name: Alice
```

```yaml
# ❌ Missing colon
user
  name: Alice

# ✅ Fixed
user:
  name: Alice
```

### CSV Validation

**Checks for:**
- Consistent column count
- Valid delimiters
- Proper quote escaping
- Header row presence
- Empty rows

**Common errors:**
```csv
# ❌ Inconsistent columns
name,age,city
Alice,30,New York
Bob,25

# ✅ Fixed
name,age,city
Alice,30,New York
Bob,25,London
```

```csv
# ❌ Unescaped quotes
name,description
Alice,"She said "hello""

# ✅ Fixed
name,description
Alice,"She said ""hello"""
```

### XML Validation

**Checks for:**
- Well-formed XML
- Matching opening/closing tags
- Proper nesting
- Valid element names
- Attribute syntax
- Entity references

**Common errors:**
```xml
<!-- ❌ Mismatched tags -->
<person>
  <name>Alice</person>
</name>

<!-- ✅ Fixed -->
<person>
  <name>Alice</name>
</person>
```

```xml
<!-- ❌ Unclosed tag -->
<person>
  <name>Alice</name>

<!-- ✅ Fixed -->
<person>
  <name>Alice</name>
</person>
```

```xml
<!-- ❌ Invalid element name -->
<person-name>Alice</person-name>

<!-- ✅ Fixed (use camelCase or underscore) -->
<personName>Alice</personName>
```

## JSON Schema Validation

Validate data against a JSON Schema for stricter validation.

### Using JSON Schema

1. Click **Tools** → **JSON Schema**
2. Choose **"Validate"**
3. Paste or load your schema
4. See validation results

### Schema Example

**Schema:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["name", "age"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "age": {
      "type": "number",
      "minimum": 0,
      "maximum": 150
    },
    "email": {
      "type": "string",
      "format": "email"
    }
  }
}
```

**Valid data:**
```json
{
  "name": "Alice",
  "age": 30,
  "email": "alice@example.com"
}
```

**Invalid data:**
```json
{
  "name": "",
  "age": -5,
  "email": "not-an-email"
}
```

**Validation errors:**
- `name`: Must not be empty (minLength: 1)
- `age`: Must be >= 0 (minimum: 0)
- `email`: Must be valid email format

### Schema Features

**Type validation:**
- `string`, `number`, `boolean`, `null`, `object`, `array`

**String validation:**
- `minLength`, `maxLength`
- `pattern` (regex)
- `format` (email, uri, date, etc.)

**Number validation:**
- `minimum`, `maximum`
- `multipleOf`
- `exclusiveMinimum`, `exclusiveMaximum`

**Object validation:**
- `required` fields
- `properties` definitions
- `additionalProperties`
- `minProperties`, `maxProperties`

**Array validation:**
- `items` schema
- `minItems`, `maxItems`
- `uniqueItems`

## Validation Warnings

Non-critical issues that don't prevent parsing:

**Duplicate keys:**
```json
{
  "name": "Alice",
  "name": "Bob"
}
```
⚠️ Warning: Duplicate key "name" (last value used)

**Large numbers:**
```json
{
  "value": 9007199254740992
}
```
⚠️ Warning: Number exceeds safe integer range

**Deep nesting:**
```json
{
  "a": { "b": { "c": { /* ... 50 levels deep */ } } }
}
```
⚠️ Warning: Deep nesting may impact performance

## Validation Settings

Customize validation behavior:

**Strict mode:**
- Enable/disable trailing commas
- Allow/disallow comments
- Enforce quote style

**Performance:**
- Validation delay (debounce)
- Max file size for validation
- Disable validation for large files

Access via **Settings** → **Validation**.

## Error Recovery

When validation fails:

**Auto-fix suggestions:**
- Add missing commas
- Close unclosed brackets
- Fix quote escaping
- Correct indentation

**Manual fixes:**
- Error highlights problematic code
- Click error for details
- Hover for quick fix options

## Validation API

For programmatic validation:

```javascript
// Validate JSON
try {
  JSON.parse(jsonString);
  console.log("Valid JSON");
} catch (error) {
  console.error("Invalid JSON:", error.message);
}
```

## Best Practices

**Before validation:**
- Format your data (use auto-format)
- Check for obvious syntax errors
- Ensure proper encoding (UTF-8)

**During validation:**
- Fix errors as they appear
- Read error messages carefully
- Use auto-fix when available

**After validation:**
- Test with sample data
- Validate against schema if available
- Check for warnings

## Common Validation Errors

### JSON

| Error | Cause | Fix |
|-------|-------|-----|
| Unexpected token | Missing comma or bracket | Add missing punctuation |
| Unexpected end of input | Unclosed bracket | Close all brackets |
| Invalid character | Special character in key | Quote the key |
| Trailing comma | Comma after last item | Remove trailing comma |

### YAML

| Error | Cause | Fix |
|-------|-------|-----|
| Bad indentation | Inconsistent spaces | Use consistent indentation |
| Unexpected token | Invalid syntax | Check YAML syntax rules |
| Duplicate key | Same key twice | Rename or remove duplicate |

### CSV

| Error | Cause | Fix |
|-------|-------|-----|
| Inconsistent columns | Different column counts | Ensure all rows have same columns |
| Unescaped quote | Quote not escaped | Double the quote or use backslash |

### XML

| Error | Cause | Fix |
|-------|-------|-----|
| Mismatched tag | Opening/closing tags don't match | Fix tag names |
| Unclosed tag | Missing closing tag | Add closing tag |
| Invalid character | Special character not escaped | Use entity reference (&lt;, &gt;, etc.) |

## Troubleshooting

**Validation not working:**
- Check if validation is enabled
- Ensure file format is detected correctly
- Try manual format selection

**False positives:**
- Check validation settings
- Disable strict mode if needed
- Report issue if persistent

**Performance issues:**
- Increase validation delay
- Disable validation for large files
- Use smaller sample data

## Next Steps

- **JSON Schema**: Learn more about [JSON Schema tools](json-schema.md)
- **Format Conversion**: [Convert between formats](conversion.md)
- **How-to Guide**: See [how to validate data](../how-to/validate-data.md)

## Related

- [JSON Schema](json-schema.md) - Schema validation and generation
- [Supported Formats](../reference/supported-formats.md) - Format specifications
- [Troubleshooting](../troubleshooting.md) - Common issues
