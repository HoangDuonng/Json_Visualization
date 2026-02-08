# JSON Schema Tools

Create, validate, and generate mock data with JSON Schema.

## Overview

JSON Schema is a vocabulary for annotating and validating JSON documents. JSON Visualization provides tools to:
- Generate JSON Schema from data
- Validate data against schema
- Generate mock data from schema

## What is JSON Schema?

JSON Schema defines the structure and validation rules for JSON data:

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

**Valid data:**
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "age": 30
}
```

## Accessing JSON Schema Tools

1. Click **Tools** → **JSON Schema**
2. Or visit `/tools/json-schema`

Three modes available:
- **Generate Schema** - Create schema from data
- **Validate Data** - Check data against schema
- **Generate Mock Data** - Create sample data from schema

## Generate Schema from Data

Create a JSON Schema from your existing data.

### How to Generate

1. Select **"Generate Schema"** mode
2. Paste or load your JSON data
3. Click **"Generate"**
4. Copy generated schema

### Example

**Input data:**
```json
{
  "user": {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "age": 30,
    "active": true,
    "tags": ["admin", "user"]
  }
}
```

**Generated schema:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["user"],
  "properties": {
    "user": {
      "type": "object",
      "required": ["id", "name", "email", "age", "active", "tags"],
      "properties": {
        "id": {
          "type": "number"
        },
        "name": {
          "type": "string"
        },
        "email": {
          "type": "string",
          "format": "email"
        },
        "age": {
          "type": "number",
          "minimum": 0
        },
        "active": {
          "type": "boolean"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

### Schema Features

**Type detection:**
- Infers types from values
- Detects formats (email, uri, date)
- Identifies patterns
- Sets constraints

**Constraints:**
- String: `minLength`, `maxLength`, `pattern`
- Number: `minimum`, `maximum`, `multipleOf`
- Array: `minItems`, `maxItems`, `uniqueItems`
- Object: `required`, `additionalProperties`

**Advanced features:**
- Nested objects and arrays
- Optional vs required fields
- Enum values (if limited set)
- Const values (if always same)

## Validate Data Against Schema

Check if your data conforms to a schema.

### How to Validate

1. Select **"Validate Data"** mode
2. Paste your JSON Schema
3. Paste your data
4. Click **"Validate"**
5. See validation results

### Validation Results

**Valid data:**
```
✅ Data is valid
```

**Invalid data:**
```
❌ Validation failed:
- /user/email: must be a valid email format
- /user/age: must be >= 0
- /user/name: is required
```

### Example Validation

**Schema:**
```json
{
  "type": "object",
  "required": ["username", "password"],
  "properties": {
    "username": {
      "type": "string",
      "minLength": 3,
      "maxLength": 20
    },
    "password": {
      "type": "string",
      "minLength": 8
    }
  }
}
```

**Valid:**
```json
{
  "username": "alice",
  "password": "securepass123"
}
```

**Invalid:**
```json
{
  "username": "al",
  "password": "short"
}
```

**Errors:**
- `username`: Must be at least 3 characters (minLength: 3)
- `password`: Must be at least 8 characters (minLength: 8)

## Generate Mock Data from Schema

Create sample data that conforms to a schema.

### How to Generate Mock Data

1. Select **"Generate Mock Data"** mode
2. Paste your JSON Schema
3. Click **"Generate"**
4. Copy generated data

### Example

**Schema:**
```json
{
  "type": "object",
  "required": ["id", "name", "email"],
  "properties": {
    "id": {
      "type": "number",
      "minimum": 1,
      "maximum": 1000
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "number",
      "minimum": 18,
      "maximum": 100
    }
  }
}
```

**Generated mock data:**
```json
{
  "id": 42,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 35
}
```

### Mock Data Features

**Realistic values:**
- Names: Random realistic names
- Emails: Valid email format
- Dates: Valid date strings
- URLs: Valid URL format
- Numbers: Within specified range

**Constraints respected:**
- Min/max values
- String lengths
- Array sizes
- Required fields
- Enum values

**Multiple items:**
- Generate arrays of items
- Specify count
- Unique values if required

## Schema Validation Rules

### Type Validation

```json
{
  "type": "string"  // Must be string
}
```

**Multiple types:**
```json
{
  "type": ["string", "number"]  // Can be string OR number
}
```

### String Validation

```json
{
  "type": "string",
  "minLength": 3,
  "maxLength": 20,
  "pattern": "^[a-zA-Z]+$",
  "format": "email"
}
```

**Formats:**
- `email` - Email address
- `uri` - URI/URL
- `date` - Date (YYYY-MM-DD)
- `date-time` - ISO 8601 date-time
- `ipv4` - IPv4 address
- `ipv6` - IPv6 address

### Number Validation

```json
{
  "type": "number",
  "minimum": 0,
  "maximum": 100,
  "multipleOf": 5,
  "exclusiveMinimum": true
}
```

### Array Validation

```json
{
  "type": "array",
  "items": {
    "type": "string"
  },
  "minItems": 1,
  "maxItems": 10,
  "uniqueItems": true
}
```

**Tuple validation:**
```json
{
  "type": "array",
  "items": [
    { "type": "string" },
    { "type": "number" }
  ]
}
```

### Object Validation

```json
{
  "type": "object",
  "required": ["name", "email"],
  "properties": {
    "name": { "type": "string" },
    "email": { "type": "string" }
  },
  "additionalProperties": false
}
```

**Pattern properties:**
```json
{
  "type": "object",
  "patternProperties": {
    "^[a-z]+$": { "type": "string" }
  }
}
```

### Enum and Const

**Enum (one of):**
```json
{
  "type": "string",
  "enum": ["red", "green", "blue"]
}
```

**Const (exact value):**
```json
{
  "type": "string",
  "const": "fixed-value"
}
```

### Conditional Validation

**If-then-else:**
```json
{
  "if": {
    "properties": { "country": { "const": "USA" } }
  },
  "then": {
    "properties": { "zipCode": { "pattern": "^[0-9]{5}$" } }
  },
  "else": {
    "properties": { "postalCode": { "type": "string" } }
  }
}
```

### Combining Schemas

**AllOf (must match all):**
```json
{
  "allOf": [
    { "type": "object" },
    { "required": ["name"] }
  ]
}
```

**AnyOf (must match at least one):**
```json
{
  "anyOf": [
    { "type": "string" },
    { "type": "number" }
  ]
}
```

**OneOf (must match exactly one):**
```json
{
  "oneOf": [
    { "type": "string", "maxLength": 5 },
    { "type": "number", "minimum": 0 }
  ]
}
```

**Not (must not match):**
```json
{
  "not": {
    "type": "null"
  }
}
```

## Common Use Cases

### API Contract Validation

Define and validate API request/response:
```json
{
  "type": "object",
  "required": ["method", "path", "body"],
  "properties": {
    "method": {
      "enum": ["GET", "POST", "PUT", "DELETE"]
    },
    "path": {
      "type": "string",
      "pattern": "^/"
    },
    "body": {
      "type": "object"
    }
  }
}
```

### Configuration Validation

Validate config files:
```json
{
  "type": "object",
  "required": ["database", "server"],
  "properties": {
    "database": {
      "type": "object",
      "required": ["host", "port"],
      "properties": {
        "host": { "type": "string" },
        "port": { "type": "number", "minimum": 1, "maximum": 65535 }
      }
    }
  }
}
```

### Form Validation

Define form field rules:
```json
{
  "type": "object",
  "required": ["email", "password"],
  "properties": {
    "email": {
      "type": "string",
      "format": "email"
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)"
    }
  }
}
```

### Testing Data

Generate test data:
```json
{
  "type": "array",
  "minItems": 10,
  "maxItems": 100,
  "items": {
    "type": "object",
    "required": ["id", "name"],
    "properties": {
      "id": { "type": "number" },
      "name": { "type": "string" }
    }
  }
}
```

## Best Practices

**Schema design:**
- Start simple, add constraints gradually
- Use descriptive property names
- Add `title` and `description` fields
- Version your schemas

**Validation:**
- Validate early and often
- Provide clear error messages
- Handle validation errors gracefully
- Test with edge cases

**Mock data:**
- Generate realistic data
- Test with various scenarios
- Use for development and testing
- Don't use in production

## Tips

**For better schemas:**
- Use `$ref` for reusable definitions
- Add examples in schema
- Document constraints
- Keep schemas focused

**For validation:**
- Validate at API boundaries
- Cache compiled schemas
- Handle errors user-friendly
- Log validation failures

**For mock data:**
- Customize generators
- Use realistic values
- Generate edge cases
- Automate test data creation

## Next Steps

- **Type Generation**: Generate [code types](type-generation.md) from schema
- **Validation**: Learn more about [data validation](validation.md)
- **How-to Guide**: See [JSON Schema guide](../how-to/use-json-schema.md)

## Related

- [Validation](validation.md) - Data validation features
- [Type Generation](type-generation.md) - Generate code types
- [JSON Schema Specification](https://json-schema.org/) - Official docs
