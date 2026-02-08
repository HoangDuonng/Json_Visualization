# Export Images

Export your visualizations as PNG, JPEG, or SVG images.

## Overview

Save your graph visualizations as high-quality images for documentation, presentations, or sharing.

**Supported formats:**
- **PNG**: Lossless, transparent background support
- **JPEG**: Smaller file size, solid background
- **SVG**: Vector format, scalable without quality loss

## How to Export

### Quick Export

1. Click **File** → **Download**
2. Or press `Ctrl/Cmd + S`
3. Choose format (PNG, JPEG, or SVG)
4. Click **Download**
5. Image saves to your downloads folder

### Export Options

**Format selection:**
- PNG (recommended for most uses)
- JPEG (smaller files)
- SVG (scalable vector)

**Quality settings:**
- Resolution (1x, 2x, 3x)
- Background color
- Include/exclude UI elements

**Size options:**
- Current view
- Fit to content
- Custom dimensions

## Export Formats

### PNG (Portable Network Graphics)

**Best for:**
- Documentation
- Web use
- Transparent backgrounds
- High quality

**Features:**
- Lossless compression
- Supports transparency
- Good for text and diagrams
- Larger file size than JPEG

**Settings:**
- Resolution: 1x, 2x, 3x (for retina displays)
- Background: Transparent or solid color
- Quality: Always maximum (lossless)

**Example use:**
```
graph-visualization.png
Size: 500KB
Resolution: 2x (2000x1500px)
Background: Transparent
```

### JPEG (Joint Photographic Experts Group)

**Best for:**
- Smaller file sizes
- Email attachments
- Quick sharing
- Solid backgrounds

**Features:**
- Lossy compression
- No transparency
- Smaller files
- Good for photos

**Settings:**
- Quality: 0-100 (default: 90)
- Background: Solid color only
- Resolution: 1x, 2x, 3x

**Example use:**
```
graph-visualization.jpg
Size: 150KB
Quality: 90%
Resolution: 1x (1000x750px)
Background: White
```

### SVG (Scalable Vector Graphics)

**Best for:**
- Print materials
- Infinite scaling
- Editing in design tools
- Smallest file size

**Features:**
- Vector format (not pixels)
- Scales without quality loss
- Editable in Illustrator, Inkscape
- Text remains selectable

**Settings:**
- Include styles (embedded or inline)
- Font embedding
- Optimize for size

**Example use:**
```
graph-visualization.svg
Size: 50KB
Scalable: Yes
Editable: Yes
```

## Export Settings

### Resolution

**1x (Standard):**
- Screen resolution
- Faster export
- Smaller file size
- Good for web

**2x (Retina):**
- High-DPI displays
- Sharper on retina screens
- Recommended for most uses
- Moderate file size

**3x (Ultra HD):**
- Very high resolution
- Print quality
- Large file size
- Slower export

### Background

**Transparent:**
- PNG only
- No background color
- Overlay on other content
- Professional look

**White:**
- Clean, classic
- Good for documents
- High contrast

**Dark:**
- Modern look
- Matches dark mode
- Easy on eyes

**Custom color:**
- Match your brand
- Specific use cases
- Any hex color

### Content Options

**Include:**
- Graph nodes and edges
- Labels and text
- Colors and styling

**Exclude:**
- Zoom controls
- Toolbar
- Sidebar
- Watermark (optional)

**Crop:**
- Current view (what you see)
- Fit to content (entire graph)
- Custom area (select region)

## Export Quality

### For Documentation

**Recommended:**
- Format: PNG
- Resolution: 2x
- Background: White or transparent
- Crop: Fit to content

**Example:**
```
Format: PNG
Resolution: 2x (2000x1500px)
Background: Transparent
Quality: Maximum
Size: ~500KB
```

### For Presentations

**Recommended:**
- Format: PNG or JPEG
- Resolution: 2x
- Background: Match slide background
- Crop: Current view

**Example:**
```
Format: PNG
Resolution: 2x
Background: White
Crop: Current view
Size: ~300KB
```

### For Print

**Recommended:**
- Format: SVG or PNG (3x)
- Resolution: 3x (if PNG)
- Background: White
- Crop: Fit to content

**Example:**
```
Format: SVG
Scalable: Yes
Background: White
Size: ~100KB
```

### For Web/Social Media

**Recommended:**
- Format: JPEG or PNG
- Resolution: 1x or 2x
- Background: Solid color
- Crop: Current view

**Example:**
```
Format: JPEG
Resolution: 1x (1200x630px)
Quality: 85%
Background: White
Size: ~150KB
```

## Advanced Options

### Custom Dimensions

Specify exact pixel dimensions:
```
Width: 1920px
Height: 1080px
Maintain aspect ratio: Yes
```

### Watermark

Add watermark to exported images:
- Text watermark
- Logo watermark
- Position and opacity
- Optional (disabled by default)

### Batch Export

Export multiple views:
1. Set up different views
2. Add to export queue
3. Export all at once
4. Downloads as ZIP file

## File Naming

**Default naming:**
```
json-visualization-YYYY-MM-DD-HHmmss.png
```

**Custom naming:**
- Click **Options** → **File Name**
- Enter custom name
- Automatic timestamp (optional)
- Sequential numbering (optional)

**Examples:**
```
user-data-graph.png
api-response-2024-01-15.jpg
database-schema.svg
```

## Tips for Better Exports

### Before Exporting

**Optimize view:**
- Zoom to appropriate level
- Center important content
- Collapse unnecessary nodes
- Adjust layout for clarity

**Clean up:**
- Remove temporary annotations
- Hide debug information
- Ensure labels are readable
- Check color contrast

**Test:**
- Preview before export
- Check at target size
- Verify text readability
- Test on target background

### For Large Graphs

**Strategies:**
- Export in sections
- Use SVG for scalability
- Increase resolution
- Collapse nested structures

**Performance:**
- Large exports take time
- Higher resolution = slower
- SVG is fastest
- Consider file size limits

### For Multiple Exports

**Consistency:**
- Use same settings
- Same resolution
- Same background
- Same crop method

**Organization:**
- Use descriptive names
- Include dates
- Version numbers
- Folder structure

## Common Use Cases

### Documentation

Export for README, wiki, or docs:
```
Format: PNG
Resolution: 2x
Background: Transparent
Crop: Fit to content
```

### Blog Posts

Export for articles:
```
Format: JPEG
Resolution: 1x
Background: White
Quality: 85%
```

### Presentations

Export for slides:
```
Format: PNG
Resolution: 2x
Background: Match slide
Crop: Current view
```

### Print Materials

Export for brochures, posters:
```
Format: SVG or PNG (3x)
Background: White
Crop: Fit to content
```

### Social Media

Export for Twitter, LinkedIn:
```
Format: JPEG
Resolution: 1x (1200x630px)
Quality: 85%
Background: Solid color
```

## Troubleshooting

### Export Fails

**Possible causes:**
- Graph too large
- Browser memory limit
- Invalid settings

**Solutions:**
- Reduce resolution
- Collapse nodes
- Use smaller crop area
- Try different format

### Poor Quality

**Issues:**
- Blurry text
- Pixelated nodes
- Low contrast

**Solutions:**
- Increase resolution
- Use PNG instead of JPEG
- Adjust background color
- Zoom in before export

### Large File Size

**Issues:**
- File too large to share
- Slow to load
- Storage concerns

**Solutions:**
- Use JPEG instead of PNG
- Reduce resolution
- Reduce quality (JPEG)
- Use SVG for vectors

### Text Not Readable

**Issues:**
- Text too small
- Poor contrast
- Font rendering

**Solutions:**
- Increase resolution
- Zoom in before export
- Change background color
- Use larger font size

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + S` | Open export dialog |
| `Ctrl/Cmd + Shift + S` | Quick export (last settings) |
| `Ctrl/Cmd + P` | Print view |

## Next Steps

- **Customize View**: [Customize before export](../how-to/customize-view.md)
- **Share**: Learn about [sharing options](../how-to/share-visualizations.md)
- **How-to Guide**: See [detailed export guide](../how-to/export-images.md)

## Related

- [Visualization](visualization.md) - Visualization features
- [How to Export Images](../how-to/export-images.md) - Step-by-step guide
- [How to Customize View](../how-to/customize-view.md) - Customize before export
- [Troubleshooting](../troubleshooting.md) - Common issues
