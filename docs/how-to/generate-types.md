# How to Generate Types

Step-by-step guide to generating TypeScript, Go, Rust, and Kotlin types from your data.

## Quick Start

1. Load your data (JSON, YAML, CSV, or XML)
2. Click **Tools** → **Generate Types**
3. Select target language
4. Copy generated code
5. Paste into your project

## Generate TypeScript Types

### From JSON

**Input:**
```json
{
  "user": {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "active": true
  }
}
```

**Steps:**
1. Paste JSON in editor
2. Click **Tools** → **Generate Types**
3. Select **TypeScript**
4. Copy generated interfaces

**Output:**
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

interface Root {
  user: User;
}
```

### From Array

**Input:**
```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]
```

**Output:**
```typescript
interface Root {
  id: number;
  name: string;
}
```

**Note:** Array items merged into single interface.

### With Optional Fields

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
  age?: number; // Optional
}
```

### Using Type Generator Page

1. Visit [/type/json-to-typescript](/type/json-to-typescript)
2. Paste JSON in left panel
3. See TypeScript in right panel
4. Click **Copy** or **Download**

## Generate Go Structs

### Basic Struct

**Input:**
```json
{
  "name": "Alice",
  "age": 30,
  "email": "alice@example.com"
}
```

**Steps:**
1. Load JSON
2. Select **Go** as target
3. Copy generated struct

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
    "profile": {
      "name": "Alice",
      "bio": "Developer"
    }
  }
}
```

**Output:**
```go
type Profile struct {
    Name string `json:"name"`
    Bio  string `json:"bio"`
}

type User struct {
    Profile Profile `json:"profile"`
}

type Root struct {
    User User `json:"user"`
}
```

### With Slices

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

### Optional Fields (Pointers)

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
    Age  *int   `json:"age,omitempty"`
}
```

## Generate Rust Structs

### Basic Struct

**Input:**
```json
{
  "name": "Alice",
  "age": 30,
  "active": true
}
```

**Steps:**
1. Load JSON
2. Select **Rust**
3. Copy with serde derives

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

### With Vectors

**Input:**
```json
{
  "items": [1, 2, 3, 4, 5]
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

### Optional Fields

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

## Generate Kotlin Data Classes

### Basic Data Class

**Input:**
```json
{
  "name": "Alice",
  "age": 30,
  "email": "alice@example.com"
}
```

**Steps:**
1. Load JSON
2. Select **Kotlin**
3. Copy data class

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

### With Lists

**Input:**
```json
{
  "tags": ["kotlin", "android", "mobile"]
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

### Nullable Fields

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

## From Other Formats

### From YAML

**Input (YAML):**
```yaml
user:
  name: Alice
  age: 30
```

**Steps:**
1. Visit [/type/yaml-to-typescript](/type/yaml-to-typescript)
2. Paste YAML
3. Select language
4. Copy types

**Output (TypeScript):**
```typescript
interface User {
  name: string;
  age: number;
}

interface Root {
  user: User;
}
```

### From CSV

**Input (CSV):**
```csv
name,age,city
Alice,30,New York
Bob,25,London
```

**Steps:**
1. Visit [/type/csv-to-go](/type/csv-to-go)
2. Paste CSV
3. Copy struct

**Output (Go):**
```go
type Root struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
    City string `json:"city"`
}
```

### From XML

**Input (XML):**
```xml
<person>
  <name>Alice</name>
  <age>30</age>
</person>
```

**Output (TypeScript):**
```typescript
interface Person {
  name: string;
  age: number;
}

interface Root {
  person: Person;
}
```

## Customization

### Rename Root Type

Default name is `Root`. To customize:

1. Generate types
2. Find/replace `Root` with your name
3. Or use options before generation

**Example:**
```typescript
// Before
interface Root { ... }

// After
interface User { ... }
```

### Adjust Optional Fields

Review and adjust optional markers:

**TypeScript:**
```typescript
// Generated
age?: number;

// If always required, remove ?
age: number;
```

**Go:**
```go
// Generated
Age *int `json:"age,omitempty"`

// If always required, remove pointer
Age int `json:"age"`
```

### Add Custom Methods

Extend generated types:

**TypeScript:**
```typescript
interface User {
  name: string;
  age: number;
}

// Add methods
class UserImpl implements User {
  constructor(
    public name: string,
    public age: number
  ) {}

  isAdult(): boolean {
    return this.age >= 18;
  }
}
```

**Go:**
```go
type User struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

// Add methods
func (u *User) IsAdult() bool {
    return u.Age >= 18
}
```

## Using Generated Types

### TypeScript

**In your code:**
```typescript
import { User } from './types';

const user: User = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

// Type-safe access
console.log(user.name); // ✓
console.log(user.invalid); // ✗ Compile error
```

### Go

**In your code:**
```go
import "encoding/json"

func main() {
    var user User
    json.Unmarshal(data, &user)
    
    // Type-safe access
    fmt.Println(user.Name)
}
```

### Rust

**In your code:**
```rust
use serde_json;

fn main() {
    let user: User = serde_json::from_str(data)?;
    
    // Type-safe access
    println!("{}", user.name);
}
```

### Kotlin

**In your code:**
```kotlin
import com.google.gson.Gson

val gson = Gson()
val user = gson.fromJson(json, User::class.java)

// Type-safe access
println(user.name)
```

## Best Practices

### Use Representative Data

Generate from complete sample:
```json
{
  "user": {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "age": 30,
    "active": true,
    "tags": ["admin", "user"],
    "metadata": {
      "created": "2024-01-01",
      "updated": "2024-01-15"
    }
  }
}
```

Include all possible fields, even if optional.

### Validate Generated Types

Test with actual data:
```typescript
// Test parsing
const parsed: User = JSON.parse(jsonString);

// Test serialization
const serialized = JSON.stringify(user);
```

### Version Your Types

Keep types in sync with API:
```
types/
  v1/
    user.ts
  v2/
    user.ts
```

### Document Custom Changes

Add comments for manual modifications:
```typescript
interface User {
  name: string;
  age: number;
  // Custom: Added for business logic
  isAdult?: boolean;
}
```

## Common Scenarios

### API Response Types

Generate from API response:
```json
{
  "data": {
    "users": [...]
  },
  "meta": {
    "total": 100,
    "page": 1
  }
}
```

Use for type-safe API calls.

### Database Models

Generate from DB export:
```json
{
  "id": 1,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Configuration Types

Generate from config:
```json
{
  "database": {
    "host": "localhost",
    "port": 5432
  }
}
```

## Troubleshooting

### Empty Arrays

**Issue:** `any[]` generated

**Solution:**
- Provide array with items
- Or manually specify type

### Wrong Types

**Issue:** Number as string

**Solution:**
- Check source data types
- Ensure proper JSON format

### Missing Fields

**Issue:** Field not in generated type

**Solution:**
- Include field in sample data
- Even if null or empty

## Next Steps

- [Validate with types](validate-data.md)
- [Use JSON Schema](../features/json-schema.md)
- [Learn about type generation](../features/type-generation.md)

## Related

- [Type Generation Features](../features/type-generation.md)
- [JSON Schema](../features/json-schema.md)
- [Data Validation](validate-data.md)
