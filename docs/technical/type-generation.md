# Type Generation

Technical details of code type generation from JSON data.

## Overview

JSON Visualization generates type definitions for TypeScript, Go, Rust, and Kotlin by analyzing JSON structure and inferring types.

**Files:**
- `src/lib/utils/generateType.ts` - Type generation orchestration
- `src/lib/utils/json2go.js` - Go struct generation

## Type Inference

### Algorithm

```
1. Analyze JSON structure
2. Identify data types
3. Detect optional fields
4. Generate type definitions
5. Format output
```

### Type Detection

```typescript
function inferType(value: any): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object") return "object";
  if (typeof value === "string") return "string";
  if (typeof value === "number") {
    return Number.isInteger(value) ? "integer" : "float";
  }
  if (typeof value === "boolean") return "boolean";
  return "unknown";
}
```

### Optional Field Detection

```typescript
function detectOptionalFields(objects: any[]): Set<string> {
  const allKeys = new Set<string>();
  const requiredKeys = new Set<string>();
  
  // Collect all keys
  objects.forEach(obj => {
    Object.keys(obj).forEach(key => allKeys.add(key));
  });
  
  // Find keys present in all objects
  allKeys.forEach(key => {
    if (objects.every(obj => key in obj)) {
      requiredKeys.add(key);
    }
  });
  
  // Optional = all keys - required keys
  const optionalKeys = new Set<string>();
  allKeys.forEach(key => {
    if (!requiredKeys.has(key)) {
      optionalKeys.add(key);
    }
  });
  
  return optionalKeys;
}
```

## TypeScript Generation

### Library

Uses `json-to-ts` library:

```typescript
import { JsonToTS } from "json-to-ts";

function generateTypeScript(json: any): string {
  const interfaces = JsonToTS(json);
  return interfaces.join("\n\n");
}
```

### Output Format

```typescript
// Input
{
  "user": {
    "name": "Alice",
    "age": 30,
    "email": "alice@example.com"
  }
}

// Output
interface User {
  name: string;
  age: number;
  email: string;
}

interface Root {
  user: User;
}
```

### Optional Fields

```typescript
// Input (inconsistent fields)
[
  { "name": "Alice", "age": 30 },
  { "name": "Bob" }
]

// Output
interface Root {
  name: string;
  age?: number; // Optional
}
```

### Union Types

```typescript
// Input (mixed types)
{
  "value": "string",
  "mixed": [1, "two", true]
}

// Output
interface Root {
  value: string;
  mixed: (number | string | boolean)[];
}
```

## Go Generation

### Custom Implementation

**File**: `src/lib/utils/json2go.js`

```javascript
function jsonToGo(json, typeName = "Root") {
  const structs = [];
  const mainStruct = generateStruct(json, typeName, structs);
  
  return [mainStruct, ...structs].join("\n\n");
}

function generateStruct(obj, name, structs) {
  const fields = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fieldName = toProperCase(key);
    const fieldType = getGoType(value, fieldName, structs);
    const jsonTag = `\`json:"${key}"\``;
    
    fields.push(`    ${fieldName} ${fieldType} ${jsonTag}`);
  }
  
  return `type ${name} struct {\n${fields.join("\n")}\n}`;
}

function getGoType(value, name, structs) {
  if (value === null) return "*interface{}";
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]interface{}";
    const itemType = getGoType(value[0], name, structs);
    return `[]${itemType}`;
  }
  if (typeof value === "object") {
    const structName = toProperCase(name);
    structs.push(generateStruct(value, structName, structs));
    return structName;
  }
  if (typeof value === "string") return "string";
  if (typeof value === "number") {
    return Number.isInteger(value) ? "int" : "float64";
  }
  if (typeof value === "boolean") return "bool";
  return "interface{}";
}

function toProperCase(str) {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}
```

### Output Format

```go
// Input
{
  "user": {
    "name": "Alice",
    "age": 30
  }
}

// Output
type User struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

type Root struct {
    User User `json:"user"`
}
```

### Optional Fields

```go
// Input (optional field)
[
  { "name": "Alice", "age": 30 },
  { "name": "Bob" }
]

// Output
type Root struct {
    Name string `json:"name"`
    Age  *int   `json:"age,omitempty"` // Pointer for optional
}
```

## Rust Generation

### Library

Uses `json-to-rust` library:

```typescript
import { jsonToRust } from "json-to-rust";

function generateRust(json: any): string {
  return jsonToRust(json, {
    rootName: "Root",
    deriveDebug: true,
    deriveSerde: true,
  });
}
```

### Output Format

```rust
// Input
{
  "name": "Alice",
  "age": 30
}

// Output
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Root {
    pub name: String,
    pub age: i64,
}
```

### Optional Fields

```rust
// Input (optional field)
[
  { "name": "Alice", "age": 30 },
  { "name": "Bob" }
]

// Output
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Root {
    pub name: String,
    pub age: Option<i64>, // Option for optional
}
```

## Kotlin Generation

### Library

Uses `json-to-kotlin` library:

```typescript
import { jsonToKotlin } from "json-to-kotlin";

function generateKotlin(json: any): string {
  return jsonToKotlin(json, {
    rootName: "Root",
    useGson: true,
  });
}
```

### Output Format

```kotlin
// Input
{
  "name": "Alice",
  "age": 30
}

// Output
import com.google.gson.annotations.SerializedName

data class Root(
    @SerializedName("name")
    val name: String,
    @SerializedName("age")
    val age: Int
)
```

### Optional Fields

```kotlin
// Input (optional field)
[
  { "name": "Alice", "age": 30 },
  { "name": "Bob" }
]

// Output
import com.google.gson.annotations.SerializedName

data class Root(
    @SerializedName("name")
    val name: String,
    @SerializedName("age")
    val age: Int? = null // Nullable with default
)
```

## Type Mapping

### Primitive Types

| JSON Type | TypeScript | Go | Rust | Kotlin |
|-----------|------------|----|----- |--------|
| String | `string` | `string` | `String` | `String` |
| Integer | `number` | `int` | `i64` | `Int` |
| Float | `number` | `float64` | `f64` | `Double` |
| Boolean | `boolean` | `bool` | `bool` | `Boolean` |
| Null | `null` | `nil` | `Option<T>` | `null` |

### Complex Types

| JSON Type | TypeScript | Go | Rust | Kotlin |
|-----------|------------|----|----- |--------|
| Array | `T[]` | `[]T` | `Vec<T>` | `List<T>` |
| Object | `interface` | `struct` | `struct` | `data class` |
| Any | `any` | `interface{}` | `serde_json::Value` | `Any` |

## Naming Conventions

### TypeScript

```typescript
// PascalCase for interfaces
interface UserProfile { }

// camelCase for properties
{
  firstName: string;
  lastName: string;
}
```

### Go

```typescript
// PascalCase for exported types
type UserProfile struct { }

// PascalCase for exported fields
{
  FirstName string
  LastName  string
}

// JSON tags in snake_case or camelCase
`json:"first_name"`
```

### Rust

```rust
// PascalCase for structs
pub struct UserProfile { }

// snake_case for fields
{
  pub first_name: String,
  pub last_name: String,
}
```

### Kotlin

```kotlin
// PascalCase for data classes
data class UserProfile()

// camelCase for properties
{
  val firstName: String,
  val lastName: String
}
```

## Edge Cases

### Empty Arrays

```typescript
// Input
{ "items": [] }

// TypeScript
items: any[]

// Go
Items []interface{} `json:"items"`

// Rust
pub items: Vec<serde_json::Value>

// Kotlin
val items: List<Any>
```

### Null Values

```typescript
// Input
{ "value": null }

// TypeScript
value: any | null

// Go
Value *interface{} `json:"value"`

// Rust
pub value: Option<serde_json::Value>

// Kotlin
val value: Any? = null
```

### Mixed Types

```typescript
// Input
{ "mixed": [1, "two", true] }

// TypeScript
mixed: (number | string | boolean)[]

// Go
Mixed []interface{} `json:"mixed"`

// Rust
pub mixed: Vec<serde_json::Value>

// Kotlin
val mixed: List<Any>
```

## Performance

### Benchmarks

- TypeScript: ~5ms per type
- Go: ~10ms per type
- Rust: ~8ms per type
- Kotlin: ~7ms per type

### Optimization

- Cache generated types
- Incremental generation
- Parallel processing
- Lazy evaluation

## Testing

```typescript
describe("type generation", () => {
  it("should generate TypeScript interface", () => {
    const json = { name: "Alice", age: 30 };
    const ts = generateTypeScript(json);
    
    expect(ts).toContain("interface Root");
    expect(ts).toContain("name: string");
    expect(ts).toContain("age: number");
  });
  
  it("should detect optional fields", () => {
    const json = [
      { name: "Alice", age: 30 },
      { name: "Bob" }
    ];
    const ts = generateTypeScript(json);
    
    expect(ts).toContain("age?: number");
  });
});
```

## Related

- [Architecture](../development/architecture.md) - System design
- [Format Conversion](format-conversion.md) - Data conversion
- [Performance](performance.md) - Optimization
