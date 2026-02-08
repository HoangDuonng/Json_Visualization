# How to Export Images

Step-by-step guide to exporting your visualizations as PNG, JPEG, or SVG images.

## Quick Export

1. Click **File** → **Download**
2. Or press `Ctrl/Cmd + S`
3. Choose format (PNG, JPEG, SVG)
4. Click **Download**
5. Image saves to downloads folder

## Export as PNG

Best for documentation and web use.

### Steps

1. Open your visualization
2. Adjust view (zoom, pan, collapse nodes)
3. Click **File** → **Download**
4. Select **PNG**
5. Choose settings:
   - Resolution: 2x (recommended)
   - Background: Transparent or White
   - Crop: Fit to content
6. Click **Download**

### Settings

**Resolution:**
- 1x: Standard (1000x750px)
- 2x: Retina (2000x1500px) ← Recommended
- 3x: Ultra HD (3000x2250px)

**Background:**
- Transparent ← For overlays
- White ← For documents
- Dark ← For dark themes
- Custom color

**Crop:**
- Current view ← What you see
- Fit to content ← Entire graph
- Custom area

### Example

```
Filename: user-data-graph.png
Format: PNG
Resolution: 2x (2000x1500px)
Background: Transparent
Size: ~500KB
```

## Export as JPEG

Best for smaller file sizes.

### Steps

1. Prepare visualization
2. Click **File** → **Download**
3. Select **JPEG**
4. Choose settings:
   - Quality: 90% (recommended)
   - Resolution: 2x
   - Background: White (required)
5. Click **Download**

### Settings

**Quality:**
- 70%: Small file, lower quality
- 85%: Balanced
- 90%: High quality ← Recommended
- 100%: Maximum quality

**Background:**
- Must be solid color (no transparency)
- White (default)
- Custom color

### Example

```
Filename: api-response.jpg
Format: JPEG
Quality: 90%
Resolution: 2x
Background: White
Size: ~150KB
```

## Export as SVG

Best for scalability and editing.

### Steps

1. Prepare visualization
2. Click **File** → **Download**
3. Select **SVG**
4. Choose settings:
   - Include styles: Yes
   - Embed fonts: Yes
   - Optimize: Yes
5. Click **Download**

### Settings

**Include styles:**
- Embedded ← Recommended
- Inline
- External

**Embed fonts:**
- Yes ← For portability
- No ← Smaller file

**Optimize:**
- Yes ← Smaller file
- No ← Preserve all data

### Example

```
Filename: database-schema.svg
Format: SVG
Scalable: Yes
Editable: Yes
Size: ~50KB
```

## Preparing for Export

### Optimize View

**Before exporting:**

1. **Zoom appropriately**
   - Not too close
   - Not too far
   - Show important content

2. **Center content**
   - Use "Fit to screen"
   - Adjust manually if needed

3. **Collapse unnecessary nodes**
   - Hide deep nesting
   - Focus on important parts

4. **Clean up**
   - Remove temporary annotations
   - Hide debug info

### Check Readability

**Ensure text is readable:**
- Zoom to check labels
- Adjust font size if needed
- Check color contrast
- Test on target background

## Export for Different Uses

### For Documentation

**Recommended settings:**
```
Format: PNG
Resolution: 2x
Background: Transparent
Crop: Fit to content
```

**Steps:**
1. Show complete graph
2. Use "Fit to content"
3. Export as PNG
4. Insert in README or docs

### For Presentations

**Recommended settings:**
```
Format: PNG or JPEG
Resolution: 2x
Background: Match slide background
Crop: Current view
```

**Steps:**
1. Focus on relevant section
2. Match slide background color
3. Export at 2x resolution
4. Insert in slides

### For Print

**Recommended settings:**
```
Format: SVG or PNG (3x)
Background: White
Crop: Fit to content
```

**Steps:**
1. Use SVG for scalability
2. Or PNG at 3x resolution
3. White background
4. Test print preview

### For Social Media

**Recommended settings:**
```
Format: JPEG
Resolution: 1x (1200x630px)
Quality: 85%
Background: Solid color
```

**Steps:**
1. Crop to interesting section
2. Use solid background
3. Optimize for platform size
4. Test preview

## Custom Dimensions

Specify exact size:

1. Click **Options** → **Custom Size**
2. Enter dimensions:
   ```
   Width: 1920px
   Height: 1080px
   ```
3. Check "Maintain aspect ratio"
4. Export

**Common sizes:**
- HD: 1920x1080px
- Full HD: 1920x1080px
- 4K: 3840x2160px
- Twitter: 1200x675px
- LinkedIn: 1200x627px

## Batch Export

Export multiple views:

### Method 1: Manual

1. Set up first view
2. Export
3. Adjust view
4. Export again
5. Repeat

### Method 2: Queue

1. Add views to export queue
2. Configure each
3. Click "Export All"
4. Downloads as ZIP

## File Naming

### Default Naming

```
json-visualization-2024-01-15-143022.png
```

Format: `json-visualization-YYYY-MM-DD-HHmmss.ext`

### Custom Naming

1. Click **Options** → **File Name**
2. Enter custom name
3. Optional: Add timestamp
4. Optional: Add counter

**Examples:**
```
user-data-graph.png
api-response-2024-01-15.jpg
database-schema-v2.svg
```

## Advanced Options

### Watermark

Add watermark (optional):

1. Click **Options** → **Watermark**
2. Choose type:
   - Text watermark
   - Logo watermark
3. Set position and opacity
4. Export

### Include/Exclude Elements

Choose what to include:

**Include:**
- [x] Graph nodes and edges
- [x] Labels
- [x] Colors
- [ ] Zoom controls
- [ ] Toolbar
- [ ] Sidebar

### Quality vs Size

Balance quality and file size:

**High quality, large file:**
```
Format: PNG
Resolution: 3x
Quality: Maximum
Size: ~2MB
```

**Balanced:**
```
Format: PNG
Resolution: 2x
Quality: High
Size: ~500KB
```

**Small file:**
```
Format: JPEG
Resolution: 1x
Quality: 85%
Size: ~150KB
```

## Troubleshooting

### Export Fails

**Issue:** Export doesn't start

**Solutions:**
- Check browser permissions
- Try different format
- Reduce resolution
- Collapse large nodes

### Poor Quality

**Issue:** Blurry or pixelated

**Solutions:**
- Increase resolution (2x or 3x)
- Use PNG instead of JPEG
- Zoom in before export
- Check source quality

### File Too Large

**Issue:** File size too big

**Solutions:**
- Use JPEG instead of PNG
- Reduce resolution
- Lower quality (JPEG)
- Crop to smaller area
- Use SVG for vectors

### Text Not Readable

**Issue:** Text too small or blurry

**Solutions:**
- Increase resolution
- Zoom in before export
- Use larger font size
- Increase contrast

### Wrong Colors

**Issue:** Colors look different

**Solutions:**
- Check background color
- Adjust color scheme
- Test on target background
- Use color profile

## Tips

**Before exporting:**
- Preview at target size
- Check all text readable
- Verify colors
- Test on target background

**For best quality:**
- Use 2x or 3x resolution
- PNG for transparency
- SVG for scalability
- White background for documents

**For smaller files:**
- JPEG format
- 1x resolution
- Quality 85%
- Crop to needed area

**For multiple exports:**
- Use consistent settings
- Same resolution
- Same background
- Descriptive names

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + S` | Open export dialog |
| `Ctrl/Cmd + Shift + S` | Quick export (last settings) |
| `Ctrl/Cmd + P` | Print view |

## Next Steps

- [Customize view before export](customize-view.md)
- [Learn about visualization features](../features/visualization.md)
- [Share your visualizations](share-visualizations.md)

## Related

- [Export Features](../features/export.md)
- [Visualization](../features/visualization.md)
- [Customize View](customize-view.md)
- [Troubleshooting](../troubleshooting.md)
