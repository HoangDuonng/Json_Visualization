# Troubleshooting

Solutions to common issues in JSON Visualization.

## Loading Issues

### Page Won't Load

**Symptoms:**
- Blank page
- Loading spinner forever
- Error message

**Solutions:**

1. **Check internet connection**
   - Ensure you're online
   - Try refreshing page

2. **Clear browser cache**
   - Chrome: `Ctrl/Cmd + Shift + Delete`
   - Select "Cached images and files"
   - Clear and reload

3. **Try different browser**
   - Chrome, Firefox, Safari, or Edge
   - Ensure browser is up to date

4. **Disable browser extensions**
   - Ad blockers may interfere
   - Try incognito/private mode

5. **Check browser console**
   - Press `F12`
   - Look for error messages
   - Report if persistent

### Data Won't Load

**Symptoms:**
- File upload fails
- URL import fails
- Paste doesn't work

**Solutions:**

1. **Check file format**
   - Ensure valid JSON/YAML/CSV/XML/TOML
   - Validate syntax first

2. **Check file size**
   - Maximum ~10MB
   - Try smaller sample

3. **Check URL**
   - Ensure URL is accessible
   - Check CORS headers
   - Try downloading and uploading

4. **Try different method**
   - If upload fails, try paste
   - If URL fails, download first

## Validation Errors

### "Invalid JSON"

**Common causes:**

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
  "age": 30  // ✅ Removed comma
}
```

**Unquoted keys:**
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

### "Invalid YAML"

**Common causes:**

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
  name: Alice  # ❌ Missing colon
```

**Fix:**
```yaml
user:
  name: Alice  # ✅ Colon added
```

### "Invalid CSV"

**Common causes:**

**Inconsistent columns:**
```csv
name,age,city
Alice,30,New York
Bob,25  # ❌ Missing column
```

**Fix:**
```csv
name,age,city
Alice,30,New York
Bob,25,London  # ✅ All columns
```

**Unescaped quotes:**
```csv
name,quote
Alice,"She said "hello""  # ❌ Unescaped
```

**Fix:**
```csv
name,quote
Alice,"She said ""hello"""  # ✅ Escaped
```

### "Invalid XML"

**Common causes:**

**Mismatched tags:**
```xml
<person>
  <name>Alice</person>  # ❌ Wrong tag
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

## Visualization Issues

### Graph Not Rendering

**Symptoms:**
- Blank canvas
- No nodes visible
- Loading forever

**Solutions:**

1. **Check data validity**
   - Ensure no validation errors
   - Fix syntax errors first

2. **Check node limit**
   - Default: 1000 nodes
   - Reduce data or increase limit

3. **Try Tree View**
   - Press `Ctrl/Cmd + Shift + V`
   - May work better for large data

4. **Refresh page**
   - Press `F5`
   - Try again

5. **Check browser console**
   - Press `F12`
   - Look for errors

### Nodes Overlapping

**Symptoms:**
- Nodes on top of each other
- Hard to read
- Messy layout

**Solutions:**

1. **Adjust layout**
   - View → Layout Options
   - Increase node spacing
   - Try different algorithm

2. **Zoom in**
   - `Ctrl/Cmd + +`
   - Focus on specific area

3. **Collapse nodes**
   - Click arrow icons
   - Hide unnecessary detail

4. **Use Tree View**
   - Better for deep nesting
   - Clearer hierarchy

### Graph Too Small/Large

**Symptoms:**
- Can't see details
- Too zoomed in/out

**Solutions:**

1. **Fit to screen**
   - Press `Ctrl/Cmd + 0`
   - Or click fit button (⊡)

2. **Manual zoom**
   - `Ctrl/Cmd + +` to zoom in
   - `Ctrl/Cmd + -` to zoom out

3. **Reset view**
   - Press `Ctrl/Cmd + R`
   - Or click reset button (↻)

### Text Not Readable

**Symptoms:**
- Text too small
- Blurry text
- Can't read labels

**Solutions:**

1. **Increase font size**
   - View → Font Size → Large
   - Or `Ctrl/Cmd + +`

2. **Zoom in**
   - Mouse wheel up
   - `Ctrl/Cmd + +`

3. **Adjust resolution**
   - For export: Use 2x or 3x
   - Better quality

4. **Change theme**
   - Try dark/light mode
   - Better contrast

## Performance Issues

### Slow Performance

**Symptoms:**
- Laggy interactions
- Slow rendering
- High CPU usage

**Solutions:**

1. **Reduce data size**
   - Use smaller sample
   - Filter data first
   - Collapse nodes

2. **Disable animations**
   - View → Animation → Instant
   - Faster rendering

3. **Use Tree View**
   - Less resource-intensive
   - Better for large data

4. **Close other tabs**
   - Free up memory
   - Reduce CPU load

5. **Restart browser**
   - Clear memory
   - Fresh start

### Browser Freezing

**Symptoms:**
- Browser unresponsive
- Can't interact
- Must force quit

**Solutions:**

1. **Wait**
   - May be processing
   - Give it time (1-2 minutes)

2. **Close tab**
   - Force close if needed
   - Restart browser

3. **Use smaller file**
   - Reduce data size
   - Try sample first

4. **Increase memory**
   - Close other applications
   - Restart computer

### Out of Memory

**Symptoms:**
- "Out of memory" error
- Browser crashes
- Tab crashes

**Solutions:**

1. **Reduce file size**
   - Use smaller sample
   - Maximum ~5MB recommended

2. **Reduce node limit**
   - Settings → Node Limit
   - Lower value

3. **Close other tabs**
   - Free up memory
   - One tab at a time

4. **Restart browser**
   - Clear memory
   - Fresh start

5. **Use different browser**
   - Some handle memory better
   - Try Chrome or Firefox

## Export Issues

### Export Fails

**Symptoms:**
- Download doesn't start
- Error message
- Blank image

**Solutions:**

1. **Check browser permissions**
   - Allow downloads
   - Check popup blocker

2. **Reduce resolution**
   - Try 1x instead of 2x
   - Smaller file size

3. **Try different format**
   - PNG → JPEG
   - Or SVG

4. **Crop to smaller area**
   - Current view instead of full
   - Reduce size

5. **Wait for graph to load**
   - Ensure fully rendered
   - Then export

### Poor Export Quality

**Symptoms:**
- Blurry image
- Pixelated
- Text unreadable

**Solutions:**

1. **Increase resolution**
   - Use 2x or 3x
   - Better quality

2. **Use PNG**
   - Better than JPEG
   - Lossless

3. **Use SVG**
   - Scalable
   - Best quality

4. **Zoom in before export**
   - Focus on important area
   - Better detail

5. **Adjust background**
   - White for documents
   - Transparent for overlays

### Export File Too Large

**Symptoms:**
- File > 10MB
- Can't upload/share
- Slow to load

**Solutions:**

1. **Use JPEG**
   - Smaller than PNG
   - Adjust quality (85%)

2. **Reduce resolution**
   - 1x instead of 2x
   - Smaller file

3. **Crop to needed area**
   - Don't export entire graph
   - Focus on relevant part

4. **Use SVG**
   - Smallest for vectors
   - Scalable

## Conversion Issues

### Conversion Fails

**Symptoms:**
- Error during conversion
- Unexpected result
- Data loss

**Solutions:**

1. **Validate source data**
   - Fix syntax errors first
   - Ensure valid format

2. **Check format compatibility**
   - Some conversions lossy
   - See [Limitations](reference/limitations.md)

3. **Try smaller sample**
   - Test with simple data
   - Then full dataset

4. **Report issue**
   - If persistent
   - Include sample data

### Data Loss in Conversion

**Expected behavior:**

**CSV conversions:**
- Nested data flattened
- Type information lost
- Arrays become strings

**XML conversions:**
- Attributes prefixed with `@`
- Structure may change

**Solutions:**
- Accept limitations
- Or use different format
- See [Format Limitations](reference/limitations.md)

## Query Issues

### jq Query Fails

**Symptoms:**
- Syntax error
- No results
- Unexpected output

**Solutions:**

1. **Check syntax**
   - Verify jq expression
   - Test simple query first

2. **Test incrementally**
   - Start with `.`
   - Add filters gradually

3. **Check data structure**
   - Ensure path exists
   - Verify property names

4. **Use jq manual**
   - [jq documentation](https://stedolan.github.io/jq/manual/)
   - Examples and reference

### JSONPath Query Fails

**Symptoms:**
- No results
- Wrong results
- Syntax error

**Solutions:**

1. **Check syntax**
   - Verify JSONPath expression
   - Use `$` for root

2. **Test simple path**
   - Start with `$.property`
   - Add complexity gradually

3. **Check filter syntax**
   - Use `@` for current node
   - Proper operators

4. **Use JSONPath docs**
   - [JSONPath specification](https://goessner.net/articles/JsonPath/)

## Browser-Specific Issues

### Chrome

**Issue:** High memory usage

**Solution:**
- Close other tabs
- Disable extensions
- Use Task Manager to monitor

### Firefox

**Issue:** Slow rendering

**Solution:**
- Update to latest version
- Disable hardware acceleration
- Clear cache

### Safari

**Issue:** Some features not working

**Solution:**
- Update to latest version
- Enable JavaScript
- Check privacy settings

### Edge

**Issue:** Compatibility issues

**Solution:**
- Update to latest version
- Clear cache
- Try Chrome (same engine)

## Getting Help

### Before Asking for Help

1. **Check this guide**
   - Search for your issue
   - Try suggested solutions

2. **Check FAQ**
   - See [FAQ](faq.md)
   - Common questions answered

3. **Search GitHub Issues**
   - [GitHub Issues](https://github.com/HoangDuonng/Json_Visualization/issues)
   - May already be reported

4. **Gather information**
   - Browser and version
   - Operating system
   - Steps to reproduce
   - Error messages
   - Sample data (if possible)

### Reporting Issues

Create issue on [GitHub](https://github.com/HoangDuonng/Json_Visualization/issues) with:

**Title:**
- Clear and descriptive
- Example: "Graph not rendering for large JSON files"

**Description:**
- What you were trying to do
- What happened
- What you expected
- Steps to reproduce

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- File size: 2MB
- Node count: 500

**Sample data:**
- Minimal example that reproduces issue
- Remove sensitive information

## Related

- [FAQ](faq.md) - Frequently asked questions
- [Limitations](reference/limitations.md) - Known limitations
- [Getting Started](getting-started.md) - Basic usage
- [Features](features/) - Feature documentation
