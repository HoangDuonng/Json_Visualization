import type { NonDeletedJsonDrawElement } from "@jsondraw/element/types";
import { newElement, newTextElement, newFrameElement } from "@jsondraw/element";
import { measureText, normalizeText } from "@jsondraw/element/textMeasurements";
import { getFontString, getLineHeight } from "@jsondraw/common";
import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from "@jsondraw/common";

const CELL_PADDING = 12;
const FRAME_PADDING = 12;
const CELL_MIN_WIDTH = 60;
const CELL_MIN_HEIGHT = 28;
const ROW_GAP = 0;
const COL_GAP = 0;

/** Parse markdown table into 2D array of cell text. Returns null if not a valid table. */
function parseMarkdownTable(md: string): string[][] | null {
  const lines = md.trim().split("\n");
  const rows: string[][] = [];

  for (const line of lines) {
    if (!line.trim().startsWith("|")) continue;

    const cells = line
      .split("|")
      .map(c => c.trim())
      .filter((_, i, arr) => i > 0 && i < arr.length - 1);

    if (cells.length === 0) continue;

    const isSeparator = cells.every(c => /^:?-+:?$/.test(c.replace(/\s/g, "")));
    if (isSeparator) continue;

    rows.push(cells);
  }

  return rows.length > 0 ? rows : null;
}


/** Convert markdown table to JsonDraw elements (rectangles + text) - editable like Mermaid */
export function convertMarkdownTableToElements(
  md: string
): NonDeletedJsonDrawElement[] {
  const rows = parseMarkdownTable(md);
  if (!rows || rows.length === 0) return [];

  const fontSize = 14;
  const fontFamily = DEFAULT_FONT_FAMILY;
  const lineHeight = getLineHeight(fontFamily);
  const fontString = getFontString({ fontFamily, fontSize });

  const colCount = Math.max(...rows.map(r => r.length));
  const cellTexts: string[][] = rows.map(row => {
    const padded = [...row];
    while (padded.length < colCount) padded.push("");
    return padded;
  });

  const colWidths: number[] = [];
  for (let c = 0; c < colCount; c++) {
    let maxW = CELL_MIN_WIDTH;
    for (let r = 0; r < cellTexts.length; r++) {
      const { width } = measureText(
        normalizeText(cellTexts[r][c]),
        fontString,
        lineHeight
      );
      maxW = Math.max(maxW, width + CELL_PADDING * 2);
    }
    colWidths.push(maxW);
  }

  const rowHeights: number[] = cellTexts.map(row => {
    let maxH = CELL_MIN_HEIGHT;
    for (const cell of row) {
      const { height } = measureText(
        normalizeText(cell),
        fontString,
        lineHeight
      );
      maxH = Math.max(maxH, height + CELL_PADDING * 2);
    }
    return maxH;
  });

  const elements: NonDeletedJsonDrawElement[] = [];
  let offsetX = 0;
  let offsetY = 0;

  for (let r = 0; r < cellTexts.length; r++) {
    offsetX = 0;
    for (let c = 0; c < colCount; c++) {
      const w = colWidths[c];
      const h = rowHeights[r];
      const text = cellTexts[r][c] || " ";
      const isHeader = r === 0;

      const rect = newElement({
        type: "rectangle",
        x: offsetX,
        y: offsetY,
        width: w,
        height: h,
        strokeColor: "#1e1e1e",
        backgroundColor: isHeader ? "#f0f0f0" : "#ffffff",
        fillStyle: "solid",
        strokeWidth: 1,
        roundness: null,
      }) as NonDeletedJsonDrawElement;

      const textMetrics = measureText(
        normalizeText(text),
        fontString,
        lineHeight
      );

      const textEl = newTextElement({
        x: offsetX + w / 2,
        y: offsetY + h / 2,
        text,
        fontSize: isHeader ? 15 : fontSize,
        fontFamily,
        textAlign: "center",
        verticalAlign: "middle",
        strokeColor: "#1e1e1e",
        backgroundColor: "transparent",
      }) as NonDeletedJsonDrawElement;

      elements.push(rect, textEl);
      offsetX += w + COL_GAP;
    }
    offsetY += rowHeights[r] + ROW_GAP;
  }

  const totalWidth = colWidths.reduce((a, b) => a + b, 0) + (colCount - 1) * COL_GAP;
  const totalHeight = rowHeights.reduce((a, b) => a + b, 0) + (cellTexts.length - 1) * ROW_GAP;

  const frame = newFrameElement({
    x: -FRAME_PADDING,
    y: -FRAME_PADDING,
    width: totalWidth + FRAME_PADDING * 2,
    height: totalHeight + FRAME_PADDING * 2,
    name: "Table",
  }) as NonDeletedJsonDrawElement;

  for (const el of elements) {
    (el as NonDeletedJsonDrawElement & { frameId?: string }).frameId = frame.id;
  }

  return [...elements, frame];
}
