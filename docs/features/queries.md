# Query Tools (jq and JSONPath)

Query and transform JSON data using jq and JSONPath.

## Overview

JSON Visualization provides two powerful query languages:
- **jq**: Command-line JSON processor with filtering and transformation
- **JSONPath**: XPath-like query language for JSON

Both run in your browser - no data leaves your machine.

## jq Queries

jq is a lightweight command-line JSON processor with a rich query language.

### Accessing jq

1. Click **Tools** → **jq Query**
2. Or press `Ctrl/Cmd + Shift + J`
3. Enter your jq expression
4. See results instantly

### Basic Queries

**Identity (.):**
```jq
.
```
Returns the entire input unchanged.

**Property access:**
```jq
.name
```
Returns the `name` property.

**Nested access:**
```jq
.user.profile.name
```
Returns nested property.

**Array access:**
```jq
.[0]
```
Returns first array element.

**Array slice:**
```jq
.[1:3]
```
Returns elements at index 1 and 2.

### Filtering

**Select objects:**
```jq
.[] | select(.age > 25)
```
Filters array items where age > 25.

**Filter by property:**
```jq
.users[] | select(.active == true)
```
Returns only active users.

**Multiple conditions:**
```jq
.[] | select(.age > 18 and .country == "USA")
```
Combines conditions with `and`/`or`.

### Mapping

**Extract property:**
```jq
.users[] | .name
```
Returns array of names.

**Transform objects:**
```jq
.users[] | {name: .name, email: .email}
```
Creates new objects with selected fields.

**Map array:**
```jq
.users | map(.name)
```
Maps array to names.

### Aggregation

**Length:**
```jq
.users | length
```
Returns array length.

**Sum:**
```jq
.prices | add
```
Sums array values.

**Min/Max:**
```jq
.ages | min
.ages | max
```
Finds minimum/maximum value.

**Group by:**
```jq
.users | group_by(.country)
```
Groups by property.

**Sort:**
```jq
.users | sort_by(.age)
```
Sorts by property.

### Examples

**Input data:**
```json
{
  "users": [
    { "id": 1, "name": "Alice", "age": 30, "country": "USA" },
    { "id": 2, "name": "Bob", "age": 25, "country": "UK" },
    { "id": 3, "name": "Charlie", "age": 35, "country": "USA" }
  ]
}
```

**Get all names:**
```jq
.users[] | .name
```
Result: `["Alice", "Bob", "Charlie"]`

**Filter by age:**
```jq
.users[] | select(.age >= 30)
```
Result: Alice and Charlie objects

**Count by country:**
```jq
.users | group_by(.country) | map({country: .[0].country, count: length})
```
Result: `[{"country": "USA", "count": 2}, {"country": "UK", "count": 1}]`

**Average age:**
```jq
.users | map(.age) | add / length
```
Result: `30`

### Advanced Features

**Conditionals:**
```jq
.users[] | if .age >= 30 then "senior" else "junior" end
```

**String operations:**
```jq
.name | ascii_upcase
.email | split("@")[0]
```

**Date operations:**
```jq
.timestamp | strftime("%Y-%m-%d")
```

**Recursive descent:**
```jq
.. | .name? | select(. != null)
```
Finds all `name` properties at any depth.

**Custom functions:**
```jq
def double: . * 2;
.values[] | double
```

## JSONPath Queries

JSONPath is an XPath-like query language for JSON.

### Accessing JSONPath

1. Click **Tools** → **JSONPath Query**
2. Or press `Ctrl/Cmd + Shift + P`
3. Enter your JSONPath expression
4. See results instantly

### Basic Syntax

**Root ($):**
```jsonpath
$
```
The root object.

**Current node (@):**
```jsonpath
@
```
Current node in filter.

**Dot notation:**
```jsonpath
$.user.name
```
Property access.

**Bracket notation:**
```jsonpath
$['user']['name']
```
Alternative property access.

**Array index:**
```jsonpath
$.users[0]
```
First element.

**Array slice:**
```jsonpath
$.users[0:2]
```
Elements 0 and 1.

**All elements:**
```jsonpath
$.users[*]
```
All array elements.

### Filters

**Filter expression:**
```jsonpath
$.users[?(@.age > 25)]
```
Users with age > 25.

**Multiple conditions:**
```jsonpath
$.users[?(@.age > 18 && @.country == 'USA')]
```
Combines conditions.

**Property exists:**
```jsonpath
$.users[?(@.email)]
```
Users with email property.

### Recursive Descent

**All descendants:**
```jsonpath
$..name
```
All `name` properties at any depth.

**Recursive filter:**
```jsonpath
$..[?(@.type == 'admin')]
```
All objects with type='admin' at any depth.

### Examples

**Input data:**
```json
{
  "store": {
    "books": [
      { "title": "Book 1", "price": 10, "category": "fiction" },
      { "title": "Book 2", "price": 15, "category": "science" },
      { "title": "Book 3", "price": 8, "category": "fiction" }
    ]
  }
}
```

**All book titles:**
```jsonpath
$.store.books[*].title
```
Result: `["Book 1", "Book 2", "Book 3"]`

**Books under $10:**
```jsonpath
$.store.books[?(@.price < 10)]
```
Result: Book 3 object

**Fiction books:**
```jsonpath
$.store.books[?(@.category == 'fiction')]
```
Result: Book 1 and Book 3 objects

**All prices:**
```jsonpath
$..price
```
Result: `[10, 15, 8]`

### Operators

**Comparison:**
- `==` Equal
- `!=` Not equal
- `<` Less than
- `<=` Less than or equal
- `>` Greater than
- `>=` Greater than or equal

**Logical:**
- `&&` AND
- `||` OR
- `!` NOT

**Regex:**
```jsonpath
$.users[?(@.email =~ /.*@example\.com/)]
```
Matches regex pattern.

## jq vs JSONPath

| Feature | jq | JSONPath |
|---------|----|----|
| **Syntax** | Functional, pipe-based | XPath-like |
| **Learning curve** | Steeper | Gentler |
| **Power** | Very powerful | Moderate |
| **Transformation** | Extensive | Limited |
| **Filtering** | Advanced | Basic |
| **Best for** | Complex queries | Simple queries |

**Use jq when:**
- Complex transformations needed
- Aggregations required
- Custom functions needed
- Advanced filtering

**Use JSONPath when:**
- Simple property access
- Basic filtering
- XPath familiarity
- Quick queries

## Common Use Cases

### Extract Specific Fields

**jq:**
```jq
.users[] | {name: .name, email: .email}
```

**JSONPath:**
```jsonpath
$.users[*]['name','email']
```

### Filter by Condition

**jq:**
```jq
.products[] | select(.price < 100 and .inStock == true)
```

**JSONPath:**
```jsonpath
$.products[?(@.price < 100 && @.inStock == true)]
```

### Find Nested Values

**jq:**
```jq
.. | .id? | select(. != null)
```

**JSONPath:**
```jsonpath
$..id
```

### Count Items

**jq:**
```jq
.items | length
```

**JSONPath:**
```jsonpath
$.items.length
```
(Note: JSONPath doesn't have built-in length, use result count)

### Transform Structure

**jq:**
```jq
.users | map({
  fullName: (.firstName + " " + .lastName),
  contact: .email
})
```

**JSONPath:**
(Not supported - use jq for transformations)

## Tips and Tricks

### jq Tips

**Debug with comments:**
```jq
.users[] 
| select(.age > 25)  # Filter by age
| .name              # Extract name
```

**Use variables:**
```jq
.users[] as $user 
| $user.orders[] 
| {user: $user.name, order: .id}
```

**Error handling:**
```jq
.users[]? | .name? // "Unknown"
```
Uses `?` for optional and `//` for default.

**Pretty print:**
```jq
. | tojson | fromjson
```

### JSONPath Tips

**Multiple paths:**
```jsonpath
$['users','admins'][*].name
```

**Union:**
```jsonpath
$.users[0,2,4]
```
Gets elements at indices 0, 2, and 4.

**Script expressions:**
```jsonpath
$.users[?(@.age > 18)].length
```

## Performance

**For large datasets:**
- jq is generally faster
- JSONPath simpler for basic queries
- Both run in browser (no server delay)
- Consider data size limits

**Optimization:**
- Filter early in query
- Avoid recursive descent on large data
- Use specific paths when possible
- Test queries on sample data first

## Error Handling

**jq errors:**
- Syntax errors show line/column
- Type errors explain mismatch
- Null handling with `?` operator

**JSONPath errors:**
- Invalid syntax highlighted
- Filter errors explained
- Path not found returns empty

## Next Steps

- **Validation**: [Validate query results](validation.md)
- **Export**: [Export query results](export.md)
- **How-to Guide**: See [detailed query guide](../how-to/query-data.md)

## Related

- [How to Query Data](../how-to/query-data.md) - Step-by-step guide
- [Validation](validation.md) - Validate results
- [jq Manual](https://stedolan.github.io/jq/manual/) - Official jq docs
- [JSONPath Specification](https://goessner.net/articles/JsonPath/) - JSONPath docs
