# How to Query Data

Step-by-step guide to querying JSON data with jq and JSONPath.

## Choosing a Query Language

**Use jq for:**
- Complex transformations
- Aggregations (sum, average, count)
- Advanced filtering
- Custom functions

**Use JSONPath for:**
- Simple property access
- Basic filtering
- Quick queries
- XPath familiarity

## Using jq

### Access jq Tool

1. Click **Tools** → **jq Query**
2. Or press `Ctrl/Cmd + Shift + J`
3. Enter jq expression
4. See results instantly

### Basic Queries

**Get entire object:**
```jq
.
```

**Get property:**
```jq
.name
```

**Get nested property:**
```jq
.user.profile.name
```

**Get array element:**
```jq
.users[0]
```

**Get all array elements:**
```jq
.users[]
```

### Example Data

Use this data for examples:
```json
{
  "users": [
    { "id": 1, "name": "Alice", "age": 30, "country": "USA" },
    { "id": 2, "name": "Bob", "age": 25, "country": "UK" },
    { "id": 3, "name": "Charlie", "age": 35, "country": "USA" }
  ]
}
```

### Extract Names

**Query:**
```jq
.users[] | .name
```

**Result:**
```json
"Alice"
"Bob"
"Charlie"
```

### Filter by Age

**Query:**
```jq
.users[] | select(.age >= 30)
```

**Result:**
```json
{ "id": 1, "name": "Alice", "age": 30, "country": "USA" }
{ "id": 3, "name": "Charlie", "age": 35, "country": "USA" }
```

### Transform Objects

**Query:**
```jq
.users[] | {name: .name, email: (.name | ascii_downcase) + "@example.com"}
```

**Result:**
```json
{ "name": "Alice", "email": "alice@example.com" }
{ "name": "Bob", "email": "bob@example.com" }
{ "name": "Charlie", "email": "charlie@example.com" }
```

### Count Items

**Query:**
```jq
.users | length
```

**Result:**
```json
3
```

### Calculate Average

**Query:**
```jq
.users | map(.age) | add / length
```

**Result:**
```json
30
```

### Group by Country

**Query:**
```jq
.users | group_by(.country) | map({country: .[0].country, count: length})
```

**Result:**
```json
[
  { "country": "UK", "count": 1 },
  { "country": "USA", "count": 2 }
]
```

### Sort by Age

**Query:**
```jq
.users | sort_by(.age)
```

**Result:**
```json
[
  { "id": 2, "name": "Bob", "age": 25, "country": "UK" },
  { "id": 1, "name": "Alice", "age": 30, "country": "USA" },
  { "id": 3, "name": "Charlie", "age": 35, "country": "USA" }
]
```

## Using JSONPath

### Access JSONPath Tool

1. Click **Tools** → **JSONPath Query**
2. Or press `Ctrl/Cmd + Shift + P`
3. Enter JSONPath expression
4. See results instantly

### Basic Queries

**Root object:**
```jsonpath
$
```

**Get property:**
```jsonpath
$.name
```

**Get nested property:**
```jsonpath
$.user.profile.name
```

**Get array element:**
```jsonpath
$.users[0]
```

**Get all elements:**
```jsonpath
$.users[*]
```

### Example Queries

Using same data as jq examples:

### Extract Names

**Query:**
```jsonpath
$.users[*].name
```

**Result:**
```json
["Alice", "Bob", "Charlie"]
```

### Filter by Age

**Query:**
```jsonpath
$.users[?(@.age >= 30)]
```

**Result:**
```json
[
  { "id": 1, "name": "Alice", "age": 30, "country": "USA" },
  { "id": 3, "name": "Charlie", "age": 35, "country": "USA" }
]
```

### Filter by Country

**Query:**
```jsonpath
$.users[?(@.country == 'USA')]
```

**Result:**
```json
[
  { "id": 1, "name": "Alice", "age": 30, "country": "USA" },
  { "id": 3, "name": "Charlie", "age": 35, "country": "USA" }
]
```

### Multiple Conditions

**Query:**
```jsonpath
$.users[?(@.age > 25 && @.country == 'USA')]
```

**Result:**
```json
[
  { "id": 1, "name": "Alice", "age": 30, "country": "USA" },
  { "id": 3, "name": "Charlie", "age": 35, "country": "USA" }
]
```

### Recursive Descent

**Query:**
```jsonpath
$..name
```

**Result:**
```json
["Alice", "Bob", "Charlie"]
```

Finds all `name` properties at any depth.

## Common Query Patterns

### Find Specific Item

**jq:**
```jq
.users[] | select(.id == 2)
```

**JSONPath:**
```jsonpath
$.users[?(@.id == 2)]
```

### Extract Multiple Fields

**jq:**
```jq
.users[] | {name: .name, age: .age}
```

**JSONPath:**
```jsonpath
$.users[*]['name','age']
```

### Filter and Transform

**jq:**
```jq
.users[] | select(.age >= 30) | .name
```

**JSONPath:**
```jsonpath
$.users[?(@.age >= 30)].name
```

### Check Property Exists

**jq:**
```jq
.users[] | select(.email != null)
```

**JSONPath:**
```jsonpath
$.users[?(@.email)]
```

## Advanced Queries

### jq: Conditional Logic

**Query:**
```jq
.users[] | if .age >= 30 then "senior" else "junior" end
```

**Result:**
```json
"senior"
"junior"
"senior"
```

### jq: String Operations

**Query:**
```jq
.users[] | .name | ascii_upcase
```

**Result:**
```json
"ALICE"
"BOB"
"CHARLIE"
```

### jq: Custom Function

**Query:**
```jq
def fullName: .firstName + " " + .lastName;
.users[] | fullName
```

### JSONPath: Regex Filter

**Query:**
```jsonpath
$.users[?(@.name =~ /^A.*/)]
```

Matches names starting with "A".

## Query Workflow

### 1. Load Data

Paste or load your JSON data.

### 2. Choose Tool

- jq for complex queries
- JSONPath for simple queries

### 3. Write Query

Start simple, then refine:
```jq
.users           # Get users array
.users[]         # Get each user
.users[] | .name # Get names
```

### 4. Test Query

See results immediately.

### 5. Refine

Adjust query based on results.

### 6. Copy Results

Copy query results for use elsewhere.

## Query Examples by Use Case

### API Response Processing

**Extract specific fields:**
```jq
.data.users[] | {id: .id, name: .name}
```

**Filter by status:**
```jq
.data.users[] | select(.status == "active")
```

### Data Analysis

**Count by category:**
```jq
group_by(.category) | map({category: .[0].category, count: length})
```

**Find min/max:**
```jq
.prices | min
.prices | max
```

**Calculate statistics:**
```jq
.values | {
  min: min,
  max: max,
  avg: (add / length),
  count: length
}
```

### Data Transformation

**Rename fields:**
```jq
.users[] | {
  userId: .id,
  fullName: .name,
  userAge: .age
}
```

**Flatten nested structure:**
```jq
.users[] | {
  name: .name,
  city: .address.city,
  country: .address.country
}
```

**Combine arrays:**
```jq
.users + .admins
```

## Debugging Queries

### Test Step by Step

Build query incrementally:
```jq
.users           # Step 1: Get array
.users[]         # Step 2: Iterate
.users[] | .name # Step 3: Extract field
```

### Use Comments

Add comments to complex queries:
```jq
.users[]                    # Iterate users
| select(.age >= 30)        # Filter by age
| {name: .name, age: .age}  # Transform
```

### Handle Errors

Use optional operator `?`:
```jq
.users[]? | .name? // "Unknown"
```

## Performance Tips

**For large datasets:**
- Filter early in query
- Avoid recursive descent (`..`)
- Use specific paths
- Test on sample first

**Optimize queries:**
```jq
# ❌ Slow
.. | select(.type == "user")

# ✅ Fast
.users[] | select(.type == "user")
```

## Saving Queries

### Save for Reuse

1. Write query
2. Copy query text
3. Save to file or notes
4. Reuse later

**Example saved queries:**
```
# Get active users
.users[] | select(.active == true)

# Calculate total
.items | map(.price) | add

# Group by category
group_by(.category) | map({cat: .[0].category, count: length})
```

## Troubleshooting

### Query Returns Nothing

**Issue:** Empty result

**Solution:**
- Check data structure
- Verify property names
- Test simpler query first

### Syntax Error

**Issue:** "Invalid jq syntax"

**Solution:**
- Check for typos
- Verify operator usage
- Test in parts

### Wrong Results

**Issue:** Unexpected output

**Solution:**
- Review query logic
- Test with sample data
- Check filter conditions

## Tips

**Start simple:**
```jq
.              # See full data
.users         # See users array
.users[]       # See each user
.users[] | .name  # See names
```

**Use pipe operator:**
```jq
.users[] | select(.age > 25) | .name
```

**Test filters:**
```jq
# Test filter first
.users[] | select(.age > 25)

# Then extract
.users[] | select(.age > 25) | .name
```

## Next Steps

- [Export query results](export-images.md)
- [Validate results](validate-data.md)
- [Learn more about queries](../features/queries.md)

## Related

- [Query Features](../features/queries.md)
- [Data Validation](validate-data.md)
- [jq Manual](https://stedolan.github.io/jq/manual/)
- [JSONPath Docs](https://goessner.net/articles/JsonPath/)
