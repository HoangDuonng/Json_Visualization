# Visualization Features

Learn how JSON Visualization displays your data in interactive graphs and trees.

## Overview

JSON Visualization offers three view modes to explore your data structure:

- **Graph View**: Interactive node-edge diagram showing relationships
- **Tree View**: Hierarchical tree structure for nested data
- **JsonDraw View**: Freeform drawing canvas built from your JSON graph

## Graph View

The default visualization mode that displays data as an interactive graph.

### What You See

**Nodes** represent data elements:

- **Object nodes**: Blue rectangles with key-value pairs
- **Array nodes**: Green rectangles with indexed items
- **Primitive nodes**: Colored by type (orange for strings, purple for numbers, etc.)

**Edges** show relationships:

- Lines connecting parent to child nodes
- Labels show property names or array indices

### Node Types

| Type    | Color  | Icon  | Description                  |
| ------- | ------ | ----- | ---------------------------- |
| Object  | Blue   | `{}`  | JSON objects with properties |
| Array   | Green  | `[]`  | Arrays with indexed items    |
| String  | Orange | `"`   | Text values                  |
| Number  | Purple | `#`   | Numeric values               |
| Boolean | Red    | `✓/✗` | True/false values            |
| Null    | Gray   | `∅`   | Null values                  |

### Interacting with the Graph

**Zoom and Pan:**

- Mouse wheel to zoom in/out
- Click and drag to pan
- Pinch gesture on touch devices
- Zoom controls in bottom-right corner

**Node Selection:**

- Click a node to select it
- Selected node highlights in yellow
- Path from root to selected node highlights
- Node details appear in sidebar

**Collapse and Expand:**

- Click arrow icon on object/array nodes
- Collapsed nodes show `...` indicator
- Expand to reveal nested structure
- Useful for large datasets

**Search:**

- Press `Ctrl/Cmd + F` to open search
- Type key or value to find
- Matching nodes highlight
- Navigate with arrow keys

### Layout Options

Control how the graph is arranged:

**Algorithms:**

- **Hierarchical** (default): Top-to-bottom tree layout
- **Force-directed**: Physics-based organic layout
- **Radial**: Circular layout from center

**Spacing:**

- Adjust node spacing for clarity
- Increase for large graphs
- Decrease for compact view

**Direction:**

- Top-to-bottom (default)
- Left-to-right
- Bottom-to-top
- Right-to-left

Access via **View** → **Layout Options**.

### Graph Controls

**Zoom Controls** (bottom-right):

- `+` Zoom in
- `-` Zoom out
- `⊡` Fit to screen
- `↻` Reset view

**Options Menu** (top-right):

- Toggle node labels
- Show/hide edge labels
- Adjust animation speed
- Change color scheme

### Performance Tips

For large datasets:

- Collapse nested structures
- Use search to find specific nodes
- Adjust node limit in settings
- Consider Tree View for overview

**Node Limit:**

- Default: 1000 nodes
- Configurable via `.env` file
- Exceeding limit shows warning
- Collapse nodes to reduce count

## Tree View

Alternative visualization showing hierarchical structure.

### What You See

**Expandable tree structure:**

- Indented levels show nesting
- `▶` icon to expand/collapse
- Key-value pairs inline
- Arrays show item count

### When to Use Tree View

**Best for:**

- Deep nested structures
- Quick overview of data shape
- Reading key-value pairs
- Copying specific values

**Graph View is better for:**

- Understanding relationships
- Visual exploration
- Large datasets
- Complex structures

### Tree View Features

**Expand/Collapse:**

- Click `▶` to expand
- Click `▼` to collapse
- Shift+Click to expand all children
- Ctrl+Click to collapse all

**Copy Values:**

- Click value to copy
- Right-click for context menu
- Copy path to value
- Copy as JSON

**Search:**

- Same search as Graph View
- Matching items highlight
- Auto-expands to show results

## JsonDraw View

Freeform whiteboard built on top of your JSON graph.

### What You See

- JSON nodes converted into draggable shapes on a canvas
- Freehand and shape tools for annotations or custom layouts
- A drawing workspace that you can edit independently

### When to Use JsonDraw

**Best for:**

- Adding visual annotations or callouts
- Rearranging the graph into a presentation layout
- Sketching ideas around the data

**Graph/Tree is better for:**

- Live updates when data changes
- Fast exploration of large datasets

### Notes

- Your drawing auto-saves in the browser.
- Once you start drawing, JSON updates will not overwrite the canvas.
- Use the **Clear Drawing** action to reload a fresh visualization from JSON.

## Switching Views

Toggle between views anytime:

- Click **View** → **Tree View** or **Graph View**
- Click **View** → **JsonDraw** for the drawing canvas
- Keyboard: `Ctrl/Cmd + Shift + V` toggles Graph/Tree
- Your data persists across views

## Customization

### Theme

Choose your preferred theme:

- **Light mode**: Clean, bright interface
- **Dark mode**: Easy on the eyes

Toggle via theme icon in top-right or `Ctrl/Cmd + Shift + T`.

### Colors

Customize node colors:

1. Click **View** → **Customize Colors**
2. Select node type
3. Choose color
4. Apply changes

Colors persist in browser storage.

### Font Size

Adjust text size for readability:

- **View** → **Font Size**
- Options: Small, Medium, Large
- Affects both editor and graph

## Accessibility

**Keyboard Navigation:**

- Tab through nodes
- Arrow keys to navigate
- Enter to expand/collapse
- Escape to deselect

**Screen Readers:**

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard-accessible controls

**High Contrast:**

- Dark mode for better contrast
- Customizable colors
- Clear focus indicators

## Examples

### Simple Object

```json
{
  "name": "Alice",
  "age": 25
}
```

**Graph View**: 3 nodes (1 object, 2 primitives)  
**Tree View**: 2 lines (expandable object)

### Nested Structure

```json
{
  "user": {
    "profile": {
      "name": "Bob",
      "email": "bob@example.com"
    },
    "settings": {
      "theme": "dark",
      "notifications": true
    }
  }
}
```

**Graph View**: Shows relationships between nested objects  
**Tree View**: Indented hierarchy with expand/collapse

### Array of Objects

```json
{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" },
    { "id": 3, "name": "Charlie" }
  ]
}
```

**Graph View**: Array node with 3 object children  
**Tree View**: Expandable array showing items

## Next Steps

- **Export Images**: Learn how to [export visualizations](export.md)
- **Customize View**: See [how to customize](../how-to/customize-view.md)
- **Large Files**: Tips for [handling large datasets](../troubleshooting.md#large-files)

## Related

- [Getting Started](../getting-started.md) - Basic usage
- [How to Customize View](../how-to/customize-view.md) - Detailed customization
- [Keyboard Shortcuts](../reference/keyboard-shortcuts.md) - All shortcuts
