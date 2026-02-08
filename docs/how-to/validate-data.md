# How to Validate Data

Step-by-step guide to validating JSON, YAML, CSV, and XML data.

## Quick Validation

The editor validates automatically as you type:
- ✅ Green checkmark = Valid
- ❌ Red X = Invalid
- Error message at bottom

## Validate JSON

### Basic Validation

**Valid JSON:**
```json
{
  "name": "Alice",
  "age": 30
}
```
✅ Valid

**Invalid JSON:**
```json
{
  "name": "Alice"
  "age": 30
}
```
❌ Error: Missing comma at line 2

### Common JSON Errors

**Missing comma:**
```json
{
  "name": "Alice"  // ❌ Missing comma
  "age": 30
}
```

**Fix:**
```json
{
  "name": "Alice",  // ✅ Added comma
  "age": 30
}
```

**Trailing comma:**
```json
{
  "name": "Alice",
  "age": 30,  // ❌ Trailing comma
}
```

**Fix:**
```json
{
  "name": "Alice",
  "age": 30  // ✅ Removed trailing comma
}
```

**Unquoted key:**
```json
{
  name: "Alice"  // ❌ Key not quoted
}
```

**Fix:**
```json
{
  "name": "Alice"  // ✅ Key quoted
}
```

**Single quotes:**
```json
{
  'name': 'Alice'  // ❌ Single quotes
}
```

**Fix:**
```json
{
  "name": "Alice"  // ✅ Double quotes
}
```

## Validate YAML

### Basic Validation

**Valid YAML:**
```yaml
name: Alice
age: 30
```
✅ Valid

**Invalid YAML:**
```yaml
name: Alice
 age: 30  # ❌ Inconsistent indentation
```

### Common YAML Errors

**Inconsistent indentation:**
```yaml
user:
  name: Alice
   age: 30  # ❌ Wrong indentation
```

**Fix:**
```yaml
user:
  name: Alice
  age: 30  # ✅ Consistent indentation
```

**Tab character:**
```yaml
user:
	name: Alice  # ❌ Tab used
```

**Fix:**
```yaml
user:
  name: Alice  # ✅ Spaces used
```

**Missing colon:**
```yaml
user
  name: Alice  # ❌ Missing colon after user
```

**Fix:**
```yaml
user:
  name: Alice  # ✅ Colon added
```

## Validate CSV

### Basic Validation

**Valid CSV:**
```csv
name,age,city
Alice,30,New York
Bob,25,London
```
✅ Valid

**Invalid CSV:**
```csv
name,age,city
Alice,30,New York
Bob,25  # ❌ Missing column
```

### Common CSV Errors

**Inconsistent columns:**
```csv
name,age,city
Alice,30,New York
Bob,25  # ❌ Only 2 columns
```

**Fix:**
```csv
name,age,city
Alice,30,New York
Bob,25,London  # ✅ 3 columns
```

**Unescaped quotes:**
```csv
name,description
Alice,"She said "hello""  # ❌ Unescaped quotes
```

**Fix:**
```csv
name,description
Alice,"She said ""hello"""  # ✅ Escaped quotes
```

## Validate XML

### Basic Validation

**Valid XML:**
```xml
<person>
  <name>Alice</name>
  <age>30</age>
</person>
```
✅ Valid

**Invalid XML:**
```xml
<person>
  <name>Alice</person>  # ❌ Mismatched tags
</name>
```

### Common XML Errors

**Mismatched tags:**
```xml
<person>
  <name>Alice</person>  # ❌ Wrong closing tag
</name>
```

**Fix:**
```xml
<person>
  <name>Alice</name>  # ✅ Matching tags
</person>
```

**Unclosed tag:**
```xml
<person>
  <name>Alice</name>  # ❌ person not closed
```

**Fix:**
```xml
<person>
  <name>Alice</name>
</person>  # ✅ Closed
```

**Invalid characters:**
```xml
<person>
  <name>Alice & Bob</name>  # ❌ Unescaped &
</person>
```

**Fix:**
```xml
<person>
  <name>Alice &amp; Bob</name>  # ✅ Escaped
</person>
```

## Validate Against JSON Schema

For stricter validation, use JSON Schema.

### Step 1: Create or Load Schema

**Example schema:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["name", "email"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "number",
      "minimum": 0,
      "maximum": 150
    }
  }
}
```

### Step 2: Validate Data

1. Click **Tools** → **JSON Schema**
2. Select **"Validate Data"**
3. Paste schema
4. Paste data
5. Click **Validate**

**Valid data:**
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "age": 30
}
```
✅ Valid

**Invalid data:**
```json
{
  "name": "",
  "email": "not-an-email",
  "age": -5
}
```

**Errors:**
- `name`: Must not be empty (minLength: 1)
- `email`: Must be valid email format
- `age`: Must be >= 0 (minimum: 0)

### Step 3: Fix Errors

Fix each validation error:

```json
{
  "name": "Alice",  // ✅ Not empty
  "email": "alice@example.com",  // ✅ Valid email
  "age": 30  // ✅ Within range
}
```

## Validation Workflow

### 1. Paste Data

Paste your data in the editor.

### 2. Check Indicator

Look at validation indicator:
- ✅ Green = Valid
- ❌ Red = Invalid
- ⚠️ Yellow = Warning

### 3. Read Error Message

Error appears at bottom:
```
Error at line 5, column 3:
Missing comma after property
```

### 4. Fix Error

Navigate to error location and fix.

### 5. Verify

Indicator turns green when fixed.

## Auto-Fix

Some errors can be auto-fixed:

1. Click error message
2. Click **"Fix"** button
3. Error corrected automatically

**Auto-fixable errors:**
- Missing commas
- Trailing commas
- Quote style
- Indentation

## Validation Settings

Customize validation:

1. Click **Settings** → **Validation**
2. Adjust options:
   - Strict mode
   - Allow comments
   - Allow trailing commas
   - Validation delay

## Batch Validation

Validate multiple files:

### Method 1: One by One

1. Paste first file
2. Check validation
3. Fix errors
4. Repeat for next file

### Method 2: Using Script

```bash
# Validate all JSON files
for file in *.json; do
  node .agentskills/json-visualization-dev/scripts/validate-format.js json "$file"
done
```

## Validation Checklist

Before considering data valid:

- [ ] Syntax is correct
- [ ] All brackets/tags closed
- [ ] Proper indentation
- [ ] Correct data types
- [ ] Required fields present
- [ ] Values within constraints
- [ ] No duplicate keys
- [ ] Proper encoding (UTF-8)

## Common Validation Scenarios

### API Response

Validate API response before processing:

```json
{
  "status": 200,
  "data": {
    "users": [...]
  }
}
```

1. Paste response
2. Check validation
3. Fix any errors
4. Process data

### Configuration File

Validate config before deployment:

```yaml
database:
  host: localhost
  port: 5432
```

1. Load config
2. Validate syntax
3. Validate against schema
4. Deploy

### User Input

Validate user-submitted data:

```json
{
  "username": "alice",
  "email": "alice@example.com"
}
```

1. Receive input
2. Validate format
3. Validate against rules
4. Accept or reject

## Troubleshooting

### Validation Not Working

**Issue:** No validation indicator

**Solution:**
- Check if validation enabled
- Verify file format detected
- Try manual format selection

### False Positives

**Issue:** Valid data marked invalid

**Solution:**
- Check validation settings
- Disable strict mode
- Report issue if persistent

### Slow Validation

**Issue:** Validation takes too long

**Solution:**
- Increase validation delay
- Disable for large files
- Use smaller sample

## Tips

**Before validation:**
- Format your data (auto-format)
- Check encoding (UTF-8)
- Remove comments if not supported

**During validation:**
- Fix errors as they appear
- Read error messages carefully
- Use auto-fix when available

**After validation:**
- Test with actual use case
- Validate against schema
- Keep validated copy

## Next Steps

- [Use JSON Schema](../features/json-schema.md) for advanced validation
- [Convert formats](convert-formats.md) after validation
- [Generate types](generate-types.md) from validated data

## Related

- [Validation Features](../features/validation.md)
- [JSON Schema](../features/json-schema.md)
- [Supported Formats](../reference/supported-formats.md)
- [Troubleshooting](../troubleshooting.md)
