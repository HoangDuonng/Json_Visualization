# How to Customize View

Step-by-step guide to customizing your graph visualization.

## Quick Customization

Common customizations:

- Theme (light/dark)
- Layout algorithm
- Node spacing
- Colors
- Font size

## Switch to JsonDraw View

Use JsonDraw for freeform drawing and annotations.

1. Click **View** → **JsonDraw**
2. The JSON graph is placed on a canvas
3. Use drawing tools to annotate or rearrange

**Note:** Graph-specific layout and spacing settings do not apply in JsonDraw.

## Manage a JsonDraw Session

**Auto-save:**

- Your drawing is saved in the browser automatically.

**Reload from JSON:**

- Use **Clear Drawing** in the JsonDraw canvas menu
- This clears the drawing and rehydrates from the latest JSON

## Change Theme

### Light Mode

1. Click theme icon (top-right)
2. Or press `Ctrl/Cmd + Shift + T`
3. Select **Light**

**Best for:**

- Bright environments
- Printing
- Documentation

### Dark Mode

1. Click theme icon
2. Select **Dark**

**Best for:**

- Low light environments
- Reduced eye strain
- Modern aesthetic

## Change Layout

### Layout Algorithms

**Hierarchical (default):**

- Top-to-bottom tree
- Clear parent-child relationships
- Best for most data

**Force-directed:**

- Physics-based organic layout
- Shows relationships naturally
- Best for network data

**Radial:**

- Circular layout from center
- Emphasizes central node
- Best for hub-and-spoke data

### Change Layout

1. Click **View** → **Layout**
2. Select algorithm
3. Adjust spacing if needed

## Adjust Node Spacing

### Increase Spacing

For large graphs:

1. Click **View** → **Layout Options**
2. Increase **Node Spacing**
3. Values: 50-200px
4. Click **Apply**

### Decrease Spacing

For compact view:

1. Decrease **Node Spacing**
2. Values: 20-50px
3. Click **Apply**

## Customize Colors

### Change Node Colors

1. Click **View** → **Customize Colors**
2. Select node type:
   - Objects
   - Arrays
   - Strings
   - Numbers
   - Booleans
   - Null
3. Choose color
4. Click **Apply**

### Color Schemes

**Preset schemes:**

- Default (blue/green)
- Monochrome (grays)
- Vibrant (bright colors)
- Pastel (soft colors)
- High contrast (accessibility)

**Apply scheme:**

1. Click **View** → **Color Scheme**
2. Select preset
3. Or customize individual colors

## Adjust Font Size

### Increase Font Size

For better readability:

1. Click **View** → **Font Size**
2. Select **Large**
3. Or use `Ctrl/Cmd + +`

### Decrease Font Size

For more content:

1. Select **Small**
2. Or use `Ctrl/Cmd + -`

**Sizes:**

- Small: 10px
- Medium: 12px (default)
- Large: 14px
- Extra Large: 16px

## Customize Graph Direction

### Change Direction

1. Click **View** → **Layout Options**
2. Select **Direction**:
   - Top to Bottom (default)
   - Left to Right
   - Bottom to Top
   - Right to Left
3. Click **Apply**

**Use cases:**

- Left to Right: Wide data
- Top to Bottom: Deep nesting
- Bottom to Top: Reverse hierarchy
- Right to Left: RTL languages

## Show/Hide Elements

### Toggle Labels

1. Click **View** → **Show Labels**
2. Toggle on/off

**Options:**

- All labels
- Node labels only
- Edge labels only
- No labels

### Toggle Edge Labels

1. Click **View** → **Show Edge Labels**
2. Toggle on/off

Useful for cleaner view.

### Toggle Minimap

1. Click **View** → **Show Minimap**
2. Toggle on/off

Shows overview of large graphs.

## Collapse and Expand

### Collapse Nodes

Hide nested content:

1. Click arrow icon on node
2. Or right-click → **Collapse**
3. Node shows `...` indicator

### Expand Nodes

Show nested content:

1. Click arrow icon again
2. Or right-click → **Expand**

### Collapse All

1. Right-click canvas
2. Select **Collapse All**
3. Or press `Ctrl/Cmd + Shift + C`

### Expand All

1. Right-click canvas
2. Select **Expand All**
3. Or press `Ctrl/Cmd + Shift + E`

## Zoom and Pan

### Zoom In

- Mouse wheel up
- `Ctrl/Cmd + +`
- Click `+` button

### Zoom Out

- Mouse wheel down
- `Ctrl/Cmd + -`
- Click `-` button

### Fit to Screen

- Click fit button (⊡)
- Or press `Ctrl/Cmd + 0`

### Reset View

- Click reset button (↻)
- Or press `Ctrl/Cmd + R`

## Animation Settings

### Adjust Animation Speed

1. Click **View** → **Animation**
2. Adjust speed:
   - Slow
   - Normal (default)
   - Fast
   - Instant (no animation)

### Disable Animations

For better performance:

1. Select **Instant**
2. Or toggle **Disable Animations**

## Node Display Options

### Compact Mode

Show less detail:

1. Click **View** → **Compact Mode**
2. Nodes show minimal info
3. Better for large graphs

### Detailed Mode

Show more detail:

1. Disable **Compact Mode**
2. Nodes show full content
3. Better for small graphs

### Show Data Types

Display type indicators:

1. Click **View** → **Show Types**
2. Icons show data types
3. Helpful for understanding structure

## Edge Styling

### Change Edge Style

1. Click **View** → **Edge Style**
2. Select style:
   - Straight
   - Curved (default)
   - Step
   - Orthogonal

### Adjust Edge Thickness

1. Click **View** → **Edge Thickness**
2. Values: 1-5px
3. Thicker for emphasis

## Save Custom Settings

### Save as Preset

1. Customize view
2. Click **View** → **Save Preset**
3. Enter name
4. Click **Save**

### Load Preset

1. Click **View** → **Load Preset**
2. Select saved preset
3. Settings applied

### Reset to Defaults

1. Click **View** → **Reset Settings**
2. Confirm reset
3. All settings restored

## Responsive Layout

### Auto-adjust for Screen

1. Enable **Responsive Layout**
2. Layout adapts to window size
3. Useful for different devices

### Lock Layout

Prevent auto-adjustment:

1. Disable **Responsive Layout**
2. Layout stays fixed
3. Manual adjustments only

## Accessibility Options

### High Contrast Mode

For better visibility:

1. Click **View** → **High Contrast**
2. Increased contrast
3. Better for visual impairments

### Keyboard Navigation

Enable full keyboard control:

1. Click **View** → **Keyboard Navigation**
2. Tab through nodes
3. Arrow keys to navigate
4. Enter to expand/collapse

### Screen Reader Support

Optimize for screen readers:

1. Enable **Screen Reader Mode**
2. Adds ARIA labels
3. Announces changes

## Performance Options

### Reduce Quality

For large graphs:

1. Click **View** → **Performance**
2. Select **Low Quality**
3. Faster rendering
4. Lower visual quality

### Limit Visible Nodes

1. Set **Max Visible Nodes**
2. Default: 1000
3. Increase for more nodes
4. Decrease for better performance

## Export-Ready View

### Prepare for Export

Before exporting:

1. **Optimize zoom**
   - Fit important content
   - Not too close/far

2. **Clean layout**
   - Collapse unnecessary nodes
   - Center content
   - Remove clutter

3. **Adjust colors**
   - Match target background
   - Ensure contrast
   - Test readability

4. **Set font size**
   - Readable at target size
   - Not too small/large

## Custom CSS (Advanced)

### Apply Custom Styles

1. Click **View** → **Custom CSS**
2. Enter CSS rules:
   ```css
   .node {
     border-radius: 8px;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   ```
3. Click **Apply**

### Reset Custom CSS

1. Click **Reset CSS**
2. Styles removed

## Tips

**For large graphs:**

- Use compact mode
- Collapse deep nesting
- Reduce animation
- Limit visible nodes

**For presentations:**

- High contrast colors
- Large font size
- Clean layout
- Match slide theme

**For documentation:**

- Clear labels
- Logical layout
- Appropriate zoom
- Professional colors

**For accessibility:**

- High contrast mode
- Keyboard navigation
- Screen reader support
- Clear focus indicators

## Keyboard Shortcuts

| Shortcut               | Action        |
| ---------------------- | ------------- |
| `Ctrl/Cmd + Shift + T` | Toggle theme  |
| `Ctrl/Cmd + +`         | Zoom in       |
| `Ctrl/Cmd + -`         | Zoom out      |
| `Ctrl/Cmd + 0`         | Fit to screen |
| `Ctrl/Cmd + R`         | Reset view    |
| `Ctrl/Cmd + Shift + C` | Collapse all  |
| `Ctrl/Cmd + Shift + E` | Expand all    |

## Next Steps

- [Export customized view](export-images.md)
- [Learn about visualization features](../features/visualization.md)
- [See keyboard shortcuts](../reference/keyboard-shortcuts.md)

## Related

- [Visualization Features](../features/visualization.md)
- [Export Images](export-images.md)
- [Keyboard Shortcuts](../reference/keyboard-shortcuts.md)
- [Troubleshooting](../troubleshooting.md)
