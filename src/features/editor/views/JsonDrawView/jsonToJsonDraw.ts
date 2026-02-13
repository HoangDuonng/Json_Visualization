/**
 * Converter: JSON NodeData/EdgeData → JsonDraw Elements
 *
 * Maps the existing graph model (from jsonParser) into JsonDraw-compatible
 * element format so JSON data can be visualized on the JsonDraw whiteboard.
 */
import { FONT_FAMILY } from "@jsondraw/common";
import type { NodeData, EdgeData } from "../../../../types/graph";

// JsonDraw element types (simplified)
interface JsonDrawBaseElement {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: 0;
  strokeColor: string;
  backgroundColor: string;
  fillStyle: "solid" | "hachure" | "cross-hatch";
  strokeWidth: number;
  roughness: number;
  opacity: number;
  groupIds: string[];
  roundness: { type: number } | null;
  seed: number;
  version: number;
  versionNonce: number;
  isDeleted: false;
  boundElements: { id: string; type: "text" | "arrow" }[] | null;
  index: string | null;
  updated: number;
  link: null;
  locked: false;
  frameId: null;
}

interface JsonDrawRectangleElement extends JsonDrawBaseElement {
  type: "rectangle";
}

interface JsonDrawTextElement extends JsonDrawBaseElement {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily: number;
  textAlign: "left" | "center" | "right";
  verticalAlign: "top" | "middle" | "bottom";
  containerId: string | null;
  originalText: string;
  autoResize: boolean;
  lineHeight: number;
}

// Keeping local interface for now or import?
// The file defined JsonDrawArrowElement locally but extended Base.
// Wait, the original file had `interface JsonDrawArrowElement extends JsonDrawBaseElement`.
// But it imported `JsonDrawArrowElement` type from packages/element/types?
// Step 905 line 7: `import type { JsonDrawArrowElement } from ...`
// But line 54 defines `interface JsonDrawArrowElement extends ...`.
// This is shadowing or extending? TS allows interface merging but here it likely conflicts if imported as type.
// Ah, line 7 imports it, but line 54 re-declares it?
// Actually line 7 imports `JsonDrawArrowElement`.
// And line 54 defines `interface JsonDrawArrowElement`.
// This would be a specialized version or augmentation?
// No, line 7 in Step 905 is: `import type { NodeData, EdgeData } from "../../../../types/graph";`
// Wait. Line 7 is NodeData/EdgeData.
// Where is JsonDrawArrowElement imported?
// Ah, Step 900 replaced import but failed.
// Step 905 shows the file content.
// It does NOT import JsonDrawArrowElement in lines 1-10.
// Let me check imports again.
// Line 7: `import type { NodeData, EdgeData } ...`
// Line 9: `// JsonDraw element types (simplified)`
// Line 54: `interface JsonDrawArrowElement extends JsonDrawBaseElement`.
// So it defines them LOCALLY. It does not import them (except maybe `JsonDrawElement` type at line 74 union).
// Line 74: `type JsonDrawElement = ...`
// So this file defines its OWN types that match JsonDraw's structure.
// So I should rename these LOCAL interfaces to JsonDraw...
// And I don't need to import `JsonDrawArrowElement` if I define it here.
// But `jsonToJsonDrawElements` returns `JsonDrawElement[]`.
// Use the local type.
// So I will rename all local interfaces and the return type.

interface JsonDrawArrowElement extends JsonDrawBaseElement {
  type: "arrow";
  points: [number, number][];
  startBinding: {
    elementId: string;
    focus: number;
    gap: number;
    fixedPoint: [number, number];
  } | null;
  endBinding: {
    elementId: string;
    focus: number;
    gap: number;
    fixedPoint: [number, number];
  } | null;
  startArrowhead: null;
  endArrowhead: "arrow";
  elbowed: boolean;
}

type JsonDrawElement = JsonDrawRectangleElement | JsonDrawTextElement | JsonDrawArrowElement;

// Simple random seed generator
const randomSeed = () => Math.floor(Math.random() * 2000000000);
const randomNonce = () => Math.floor(Math.random() * 2000000000);

const NODE_PADDING = 16;
const ROW_HEIGHT = 24;
const FONT_SIZE = 16;
const HORIZONTAL_GAP = 200;
const VERTICAL_GAP = 40;

/**
 * Format node text content for display inside JsonDraw rectangle
 */
const formatNodeText = (node: NodeData): string => {
  if (!node.text || node.text.length === 0) return "";

  return node.text
    .map(row => {
      if (row.key !== null && row.key !== undefined) {
        if (row.type === "object") return `${row.key}: {${row.childrenCount ?? 0} keys}`;
        if (row.type === "array") return `${row.key}: [${row.childrenCount ?? 0} items]`;
        if (row.value === null) return `${row.key}: null`;
        return `${row.key}: ${row.value}`;
      }
      return `${row.value ?? ""}`;
    })
    .join("\n");
};

/**
 * Layout nodes using a simple layered approach (BFS by depth from root).
 * Returns map of nodeId → { x, y }.
 */
const layoutNodes = (
  nodes: NodeData[],
  edges: EdgeData[]
): Map<string, { x: number; y: number }> => {
  const positions = new Map<string, { x: number; y: number }>();

  if (nodes.length === 0) return positions;

  // Build adjacency list (parent → children)
  const children = new Map<string, string[]>();
  const hasParent = new Set<string>();

  for (const edge of edges) {
    const ch = children.get(edge.from) ?? [];
    ch.push(edge.to);
    children.set(edge.from, ch);
    hasParent.add(edge.to);
  }

  // Find root nodes (no incoming edges)
  const roots = nodes.filter(n => !hasParent.has(n.id)).map(n => n.id);
  if (roots.length === 0 && nodes.length > 0) {
    roots.push(nodes[0].id);
  }

  // BFS to assign layers
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  const layers: string[][] = [];
  const visited = new Set<string>();
  let queue = [...roots];

  while (queue.length > 0) {
    const layer: string[] = [];
    const nextQueue: string[] = [];

    for (const id of queue) {
      if (visited.has(id)) continue;
      visited.add(id);
      layer.push(id);

      const ch = children.get(id) ?? [];
      for (const childId of ch) {
        if (!visited.has(childId)) nextQueue.push(childId);
      }
    }

    if (layer.length > 0) layers.push(layer);
    queue = nextQueue;
  }

  // Also add any orphan nodes (not connected via edges)
  const orphans = nodes.filter(n => !visited.has(n.id)).map(n => n.id);
  if (orphans.length > 0) layers.push(orphans);

  // Assign positions by layer (horizontal layout: layers go right)
  let currentX = 50;

  for (const layer of layers) {
    let maxWidth = 0;
    let currentY = 50;

    for (const nodeId of layer) {
      const node = nodeMap.get(nodeId);
      if (!node) continue;

      positions.set(nodeId, { x: currentX, y: currentY });
      currentY += node.height + VERTICAL_GAP;
      maxWidth = Math.max(maxWidth, node.width);
    }

    currentX += maxWidth + HORIZONTAL_GAP;
  }

  return positions;
};

/**
 * Convert Json-viz NodeData[] + EdgeData[] → JsonDraw elements
 */
export const jsonToJsonDrawElements = (nodes: NodeData[], edges: EdgeData[]): JsonDrawElement[] => {
  const elements: JsonDrawElement[] = [];
  const positions = layoutNodes(nodes, edges);

  const now = Date.now();
  let indexCounter = 0;
  const getNextIndex = () => `a${(indexCounter++).toString().padStart(6, "0")}`;

  // Map to track rectangle element IDs for arrow bindings
  const rectIds = new Map<string, string>();

  // Create rectangle + text for each node
  for (const node of nodes) {
    const pos = positions.get(node.id) ?? { x: 0, y: 0 };
    const rectId = `rect-${node.id}`;
    const textId = `text-${node.id}`;
    const text = formatNodeText(node);

    rectIds.set(node.id, rectId);

    const width = Math.max(node.width + NODE_PADDING * 2, 120);
    const textRows = node.text?.length ?? 1;
    const height = Math.max(textRows * ROW_HEIGHT + NODE_PADDING * 2, 50);

    // Collect arrow bindings for this rectangle
    const boundElements: { id: string; type: "text" | "arrow" }[] = [{ id: textId, type: "text" }];

    for (const edge of edges) {
      if (edge.from === node.id || edge.to === node.id) {
        boundElements.push({ id: `arrow-${edge.id}`, type: "arrow" });
      }
    }

    // Rectangle element
    const rect: JsonDrawRectangleElement = {
      id: rectId,
      type: "rectangle",
      x: pos.x,
      y: pos.y,
      width,
      height,
      angle: 0,
      strokeColor: "#1e1e1e",
      backgroundColor: "transparent",
      fillStyle: "solid",
      strokeWidth: 1,
      roughness: 1,
      opacity: 100,
      groupIds: [],
      roundness: { type: 3 },
      seed: randomSeed(),
      version: 1,
      versionNonce: randomNonce(),
      isDeleted: false,
      boundElements,
      index: getNextIndex(),
      updated: now,
      link: null,
      locked: false,
      frameId: null,
    };
    elements.push(rect);

    // Text element (bound to rectangle)
    const textEl: JsonDrawTextElement = {
      id: textId,
      type: "text",
      x: pos.x + NODE_PADDING,
      y: pos.y + NODE_PADDING,
      width: width - NODE_PADDING * 2,
      height: height - NODE_PADDING * 2,
      angle: 0,
      strokeColor: "#1e1e1e",
      backgroundColor: "transparent",
      fillStyle: "solid",
      strokeWidth: 1,
      roughness: 1,
      opacity: 100,
      groupIds: [],
      roundness: null,
      seed: randomSeed(),
      version: 1,
      versionNonce: randomNonce(),
      isDeleted: false,
      boundElements: null,
      index: getNextIndex(),
      updated: now,
      link: null,
      locked: false,
      frameId: null,
      text,
      fontSize: FONT_SIZE,
      fontFamily: FONT_FAMILY.Excalifont,
      textAlign: "left",
      verticalAlign: "top",
      containerId: rectId,
      originalText: text,
      autoResize: true,
      lineHeight: 1.25,
    };
    elements.push(textEl);
  }

  // Create arrows for each edge
  for (const edge of edges) {
    const fromRectId = rectIds.get(edge.from);
    const toRectId = rectIds.get(edge.to);
    if (!fromRectId || !toRectId) continue;

    const fromPos = positions.get(edge.from);
    const toPos = positions.get(edge.to);
    if (!fromPos || !toPos) continue;

    const fromNode = nodes.find(n => n.id === edge.from);
    const toNode = nodes.find(n => n.id === edge.to);
    if (!fromNode || !toNode) continue;

    const fromWidth = Math.max(fromNode.width + NODE_PADDING * 2, 120);
    const fromHeight = Math.max((fromNode.text?.length ?? 1) * ROW_HEIGHT + NODE_PADDING * 2, 50);
    const toHeight = Math.max((toNode.text?.length ?? 1) * ROW_HEIGHT + NODE_PADDING * 2, 50);

    // Arrow starts from right edge of source, ends at left edge of target
    const startX = fromPos.x + fromWidth;
    const startY = fromPos.y + fromHeight / 2;
    const endX = toPos.x;
    const endY = toPos.y + toHeight / 2;

    const arrow: JsonDrawArrowElement = {
      id: `arrow-${edge.id}`,
      type: "arrow",
      x: startX,
      y: startY,
      width: Math.abs(endX - startX),
      height: Math.abs(endY - startY),
      angle: 0,
      strokeColor: "#1e1e1e",
      backgroundColor: "transparent",
      fillStyle: "solid",
      strokeWidth: 1,
      roughness: 1,
      opacity: 100,
      groupIds: [],
      roundness: { type: 2 },
      seed: randomSeed(),
      version: 1,
      versionNonce: randomNonce(),
      isDeleted: false,
      boundElements: null,
      index: getNextIndex(),
      updated: now,
      link: null,
      locked: false,
      frameId: null,
      points: [
        [0, 0],
        [endX - startX, endY - startY],
      ],
      startBinding: {
        elementId: fromRectId,
        focus: 0,
        gap: 5,
        fixedPoint: [1, 0.5],
      },
      endBinding: {
        elementId: toRectId,
        focus: 0,
        gap: 5,
        fixedPoint: [0, 0.5],
      },
      startArrowhead: null,
      endArrowhead: "arrow",
      elbowed: false,
    };
    elements.push(arrow);
  }

  return elements;
};
