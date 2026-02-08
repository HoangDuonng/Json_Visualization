# Type Generation

Generate TypeScript, Go, Rust, and Kotlin types from your JSON, YAML, CSV, or XML data.

## Overview

JSON Visualization automatically generates type definitions for popular programming languages, saving you time and ensuring type safety in your code.

**Supported languages:**
- TypeScript (interfaces and types)
- Go (structs)
- Rust (structs)
- Kotlin (data classes)

## How to Generate Types

### In the Editor

1. Load your data (JSON, YAML, CSV, or XML)
2. Click **Tools** → **Generate Types**
3. Select target language
4. Copy generated code
5. Paste into your project

### Using Type Generator Pages

Direct generation without the editor:

Visit `/type/[format]-to-[language]`:
- [JSON to TypeScript](/type/json-to-typescript)
- [JSON to Go](/type/json-to-go)
- [JSON to Rust](/type/json-to-rust)
- [JSON to Kotlin](/type/json-to-kotlin)
- [YAML to TypeScript](/type/yaml-to-typescript)
- [YAML to Go](/type/yaml-to-go)
- [YAML to Rust](/type/yaml-to-rust)
- [YAML to Kotlin](/type/yaml-to-kotlin)
- [CSV to TypeScript](/type/csv-to-typescript)
- [CSV to Go](/type/csv-to-go)
- [CSV to Rust](/type/csv-to-rust)
- [CSV to Kotlin](/type/csv-to-kotlin)
- [XML to TypeScript](/type/xml-to-typescript)
- [XML to Go](/type/xml-to-go)
- [XML to Rust](/type/xml-to-rust)
- [XML to Kotlin](/type/xml-to-kotlin)

## TypeScript Generation

### Interface Generation

**Input:**
```json
{
  "name": "Alice",
  "age": 30,
  "email": "alice@example.com",
  "active": true
}
```

**Output:**
```typescript
interface Root {
  name: string;
  age: number;
  email: string;
  active: boolean;
}
```

### Nested Objects

**Input:**
```json
{
  "user": {
    "profile": {
      "name": "Alice",
      "age": 30
    },
    "settings": {
      "theme": "dark",
      "notifications": true
    }
  }
}
```

**Output:**
```typescript
interface Profile {
  name: string;
  age: number;
}

interface Settings {
  theme: string;
  notifications: boolean;
}

interface User {
  profile: Profile;
  settings: Settings;
}

interface Root {
  user: User;
}
```

### Arrays

**Input:**
```json
{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}
```

**Output:**
```typescript
interface User {
  id: number;
  name: string;
}

interface Root {
  users: User[];
}
```

### Optional Properties

**Input:**
```json
[
  { "name": "Alice", "age": 30 },
  { "name": "Bob" }
]
```

**Output:**
```typescript
interface Root {
  name: string;
  age?: number; // Optional (not in all objects)
}
```

### Union Types

**Input:**
```json
{
  "value": "string",
  "mixed": [1, "two", true]
}
```

**Output:**
```typescript
interface Root {
  value: string;
  mixed: (number | string | boolean)[];
}
```

## Go Generation

### Struct Generation

**Input:**
```json
{
  "name": "Alice",
  "age": 30,
  "email": "alice@example.com"
}
```

**Output:**
```go
type Root struct {
    Name  string `json:"name"`
    Age   int    `json:"age"`
    Email string `json:"email"`
}
```

### Nested Structs

**Input:**
```json
{
  "user": {
    "name": "Alice",
    "address": {
      "city": "New York",
      "country": "USA"
    }
  }
}
```

**Output:**
```go
type Address struct {
    City    string `json:"city"`
    Country string `json:"country"`
}

type User struct {
    Name    string  `json:"name"`
    Address Address `json:"address"`
}

type Root struct {
    User User `json:"user"`
}
```

### Slices

**Input:**
```json
{
  "tags": ["go", "json", "api"]
}
```

**Output:**
```go
type Root struct {
    Tags []string `json:"tags"`
}
```

### Pointers for Optional Fields

**Input:**
```json
[
  { "name": "Alice", "age": 30 },
  { "name": "Bob" }
]
```

**Output:**
```go
type Root struct {
    Name string `json:"name"`
    Age  *int   `json:"age,omitempty"` // Pointer for optional
}
```

## Rust Generation

### Struct Generation

**Input:**
```json
{
  "name": "Alice",
  "age": 30,
  "active": true
}
```

**Output:**
```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Root {
    pub name: String,
    pub age: i64,
    pub active: bool,
}
```

### Nested Structs

**Input:**
```json
{
  "user": {
    "name": "Alice",
    "email": "alice@example.com"
  }
}
```

**Output:**
```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub name: String,
    pub email: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Root {
    pub user: User,
}
```

### Vectors

**Input:**
```json
{
  "items": [1, 2, 3]
}
```

**Output:**
```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Root {
    pub items: Vec<i64>,
}
```

### Option for Optional Fields

**Input:**
```json
[
  { "name": "Alice", "age": 30 },
  { "name": "Bob" }
]
```

**Output:**
```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Root {
    pub name: String,
    pub age: Option<i64>,
}
```

## Kotlin Generation

### Data Class Generation

**Input:**
```json
{
  "name": "Alice",
  "age": 30,
  "email": "alice@example.com"
}
```

**Output:**
```kotlin
import com.google.gson.annotations.SerializedName

data class Root(
    @SerializedName("name")
    val name: String,
    @SerializedName("age")
    val age: Int,
    @SerializedName("email")
    val email: String
)
```

### Nested Data Classes

**Input:**
```json
{
  "user": {
    "name": "Alice",
    "profile": {
      "bio": "Developer"
    }
  }
}
```

**Output:**
```kotlin
import com.google.gson.annotations.SerializedName

data class Profile(
    @SerializedName("bio")
    val bio: String
)

data class User(
    @SerializedName("name")
    val name: String,
    @SerializedName("profile")
    val profile: Profile
)

data class Root(
    @SerializedName("user")
    val user: User
)
```

### Lists

**Input:**
```json
{
  "tags": ["kotlin", "android"]
}
```

**Output:**
```kotlin
import com.google.gson.annotations.SerializedName

data class Root(
    @SerializedName("tags")
    val tags: List<String>
)
```

### Nullable for Optional Fields

**Input:**
```json
[
  { "name": "Alice", "age": 30 },
  { "name": "Bob" }
]
```

**Output:**
```kotlin
import com.google.gson.annotations.SerializedName

data class Root(
    @SerializedName("name")
    val name: String,
    @SerializedName("age")
    val age: Int? = null
)
```

## Type Inference

### Primitive Types

| JSON Type | TypeScript | Go | Rust | Kotlin |
|-----------|------------|----|----- |--------|
| String | `string` | `string` | `String` | `String` |
| Number (int) | `number` | `int` | `i64` | `Int` |
| Number (float) | `number` | `float64` | `f64` | `Double` |
| Boolean | `boolean` | `bool` | `bool` | `Boolean` |
| Null | `null` | `nil` | `Option<T>` | `null` |
| Array | `T[]` | `[]T` | `Vec<T>` | `List<T>` |
| Object | `interface` | `struct` | `struct` | `data class` |

### Complex Types

**Any type:**
- TypeScript: `any`
- Go: `interface{}`
- Rust: `serde_json::Value`
- Kotlin: `Any`

**Mixed arrays:**
- TypeScript: `(string | number)[]`
- Go: `[]interface{}`
- Rust: `Vec<serde_json::Value>`
- Kotlin: `List<Any>`

## Generation Options

### Naming Conventions

**TypeScript:**
- PascalCase for interfaces
- camelCase for properties

**Go:**
- PascalCase for exported structs
- PascalCase for exported fields
- JSON tags in snake_case or camelCase

**Rust:**
- PascalCase for structs
- snake_case for fields
- Serde annotations

**Kotlin:**
- PascalCase for data classes
- camelCase for properties
- SerializedName annotations

### Optional Fields

**Detection:**
- Field missing in some objects → optional
- Field is `null` → nullable
- Field always present → required

**Handling:**
- TypeScript: `?` suffix
- Go: Pointer type with `omitempty`
- Rust: `Option<T>`
- Kotlin: `?` suffix with default `null`

### Root Type Name

Default: `Root`

Customize:
1. Click **Options**
2. Enter custom name
3. Regenerate

## Common Use Cases

### API Response Types

Generate types for API responses:
```json
{
  "data": {
    "users": [
      { "id": 1, "name": "Alice" }
    ]
  },
  "meta": {
    "total": 1,
    "page": 1
  }
}
```

Use generated types for type-safe API calls.

### Configuration Files

Generate types for config files:
```json
{
  "database": {
    "host": "localhost",
    "port": 5432
  },
  "cache": {
    "enabled": true,
    "ttl": 3600
  }
}
```

### Database Models

Generate types from database exports:
```json
[
  {
    "id": 1,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

## Best Practices

**Before generation:**
- Ensure data is representative
- Include all possible fields
- Use consistent naming
- Validate data structure

**After generation:**
- Review generated types
- Adjust optional fields if needed
- Add custom methods/functions
- Document complex types

**For APIs:**
- Generate from actual responses
- Include error responses
- Handle pagination
- Consider versioning

## Limitations

**Type inference:**
- Based on sample data only
- May not capture all variations
- Empty arrays default to `any[]`
- Null values may be ambiguous

**Naming:**
- Auto-generated names may need adjustment
- Duplicate names get numeric suffixes
- Reserved keywords are escaped

**Complex types:**
- Recursive types may need manual adjustment
- Discriminated unions not auto-detected
- Generic types not inferred

## Tips

**For accurate types:**
- Use complete sample data
- Include all optional fields (even if null)
- Test with multiple examples
- Validate generated code

**For maintainability:**
- Keep types in separate files
- Document custom modifications
- Regenerate when API changes
- Version your types

## Next Steps

- **JSON Schema**: Generate [JSON Schema](json-schema.md) for validation
- **Validation**: [Validate data](validation.md) against types
- **How-to Guide**: See [detailed type generation guide](../how-to/generate-types.md)

## Related

- [JSON Schema](json-schema.md) - Schema generation and validation
- [How to Generate Types](../how-to/generate-types.md) - Step-by-step guide
- [Supported Formats](../reference/supported-formats.md) - Format specifications
