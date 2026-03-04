import type { NonDeletedJsonDrawElement } from "@jsondraw/element/types";
import type { LocalPoint } from "@jsondraw/math";
import { newElement, newTextElement, newLinearElement, newFrameElement } from "@jsondraw/element";
import { measureText, normalizeText } from "@jsondraw/element/textMeasurements";
import { getFontString, getLineHeight } from "@jsondraw/common";
import { DEFAULT_FONT_FAMILY, FONT_FAMILY } from "@jsondraw/common";
import { pointFrom } from "@jsondraw/math";

const FRAME_PADDING = 16;
const BLOCK_GAP = 16;

const CELL_PADDING = 10;
const CELL_MIN_WIDTH = 50;
const CELL_MIN_HEIGHT = 24;

const CODE_BLOCK_PADDING_X = 16;
const CODE_BLOCK_PADDING_Y = 12;

const BLOCKQUOTE_BAR_WIDTH = 4;
const BLOCKQUOTE_GAP = 10;

// ─── Markdown block parser ───────────────────────────────────────────────────

type MdBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "blockquote"; text: string }
  | { type: "table"; rows: string[][] }
  | { type: "hr" };

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url) → text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1") // images
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // bold
    .replace(/(\*|_)(.*?)\1/g, "$2") // italic
    .replace(/~~(.*?)~~/g, "$1") // strikethrough
    .replace(/`([^`]+)`/g, "$1"); // inline code
}

function parseMarkdownBlocks(md: string): MdBlock[] {
  const lines = md.split("\n");
  const blocks: MdBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // fenced code block
    const codeMatch = line.match(/^```(\w*)/);
    if (codeMatch) {
      const lang = codeMatch[1] || "";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: "code", lang, code: codeLines.join("\n") });
      continue;
    }

    // heading
    const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: stripInlineMarkdown(headingMatch[2]),
      });
      i++;
      continue;
    }

    // hr
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line.trim())) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // table (starts with |)
    if (line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows: string[][] = [];
      for (const tl of tableLines) {
        const cells = tl
          .split("|")
          .map(c => c.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (cells.length === 0) continue;
        const isSep = cells.every(c => /^:?-+:?$/.test(c.replace(/\s/g, "")));
        if (isSep) continue;
        rows.push(cells.map(stripInlineMarkdown));
      }
      if (rows.length > 0) {
        blocks.push({ type: "table", rows });
      }
      continue;
    }

    // blockquote
    if (line.trimStart().startsWith(">")) {
      const bqLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith(">")) {
        bqLines.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      blocks.push({ type: "blockquote", text: stripInlineMarkdown(bqLines.join("\n")) });
      continue;
    }

    // unordered list
    if (/^\s*[-*+]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*+]\s/.test(lines[i])) {
        items.push(stripInlineMarkdown(lines[i].replace(/^\s*[-*+]\s+/, "")));
        i++;
      }
      blocks.push({ type: "list", ordered: false, items });
      continue;
    }

    // ordered list
    if (/^\s*\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s/.test(lines[i])) {
        items.push(stripInlineMarkdown(lines[i].replace(/^\s*\d+\.\s+/, "")));
        i++;
      }
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    // paragraph (collect contiguous non-empty non-special lines)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].match(/^(#{1,6})\s/) &&
      !lines[i].trim().startsWith("|") &&
      !lines[i].trim().startsWith(">") &&
      !/^\s*[-*+]\s/.test(lines[i]) &&
      !/^\s*\d+\.\s/.test(lines[i]) &&
      !lines[i].startsWith("```") &&
      !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "paragraph", text: stripInlineMarkdown(paraLines.join(" ")) });
    }
  }

  return blocks;
}

// ─── Measurement helpers ────────────────────────────────────────────────────

function measure(text: string, fontSize: number, fontFamily: number) {
  const lineHeight = getLineHeight(fontFamily);
  const fontString = getFontString({ fontFamily, fontSize });
  return measureText(normalizeText(text), fontString, lineHeight);
}

// ─── Block → Elements converters ────────────────────────────────────────────

function createHeadingElements(
  block: Extract<MdBlock, { type: "heading" }>,
  offsetY: number,
): { elements: NonDeletedJsonDrawElement[]; height: number; width: number } {
  const fontSizeMap: Record<number, number> = { 1: 28, 2: 24, 3: 20, 4: 18, 5: 16, 6: 14 };
  const fontSize = fontSizeMap[block.level] || 20;
  const fontFamily = DEFAULT_FONT_FAMILY;
  const m = measure(block.text, fontSize, fontFamily);
  const lineWidth = m.width + 8;

  const elements: NonDeletedJsonDrawElement[] = [];

  elements.push(
    newTextElement({
      x: 0,
      y: offsetY,
      text: block.text,
      fontSize,
      fontFamily,
      textAlign: "left",
      verticalAlign: "top",
      strokeColor: "#1e1e1e",
      backgroundColor: "transparent",
    }) as NonDeletedJsonDrawElement,
  );

  let totalHeight = m.height;

  if (block.level <= 2) {
    const lineY = offsetY + m.height + 4;
    elements.push(
      newLinearElement({
        type: "line",
        x: 0,
        y: lineY,
        width: lineWidth,
        height: 0,
        points: [pointFrom<LocalPoint>(0, 0), pointFrom<LocalPoint>(lineWidth, 0)],
        strokeColor: "#cccccc",
        strokeWidth: 1,
      }) as NonDeletedJsonDrawElement,
    );
    totalHeight = m.height + 6;
  }

  return { elements, height: totalHeight, width: Math.max(lineWidth, m.width) };
}

function createParagraphElements(
  block: Extract<MdBlock, { type: "paragraph" }>,
  offsetY: number,
): { elements: NonDeletedJsonDrawElement[]; height: number; width: number } {
  const fontSize = 16;
  const fontFamily = DEFAULT_FONT_FAMILY;
  const m = measure(block.text, fontSize, fontFamily);

  const el = newTextElement({
    x: 0,
    y: offsetY,
    text: block.text,
    fontSize,
    fontFamily,
    textAlign: "left",
    verticalAlign: "top",
    strokeColor: "#1e1e1e",
    backgroundColor: "transparent",
  }) as NonDeletedJsonDrawElement;

  return { elements: [el], height: m.height, width: m.width };
}

function createListElements(
  block: Extract<MdBlock, { type: "list" }>,
  offsetY: number,
): { elements: NonDeletedJsonDrawElement[]; height: number; width: number } {
  const fontSize = 16;
  const fontFamily = DEFAULT_FONT_FAMILY;
  const elements: NonDeletedJsonDrawElement[] = [];
  let y = offsetY;
  let maxW = 0;

  block.items.forEach((item, idx) => {
    const prefix = block.ordered ? `${idx + 1}. ` : "• ";
    const text = prefix + item;
    const m = measure(text, fontSize, fontFamily);

    elements.push(
      newTextElement({
        x: 0,
        y,
        text,
        fontSize,
        fontFamily,
        textAlign: "left",
        verticalAlign: "top",
        strokeColor: "#1e1e1e",
        backgroundColor: "transparent",
      }) as NonDeletedJsonDrawElement,
    );

    maxW = Math.max(maxW, m.width);
    y += m.height + 4;
  });

  return { elements, height: y - offsetY - 4, width: maxW };
}

function createCodeElements(
  block: Extract<MdBlock, { type: "code" }>,
  offsetY: number,
): { elements: NonDeletedJsonDrawElement[]; height: number; width: number } {
  const fontSize = 14;
  const fontFamily = FONT_FAMILY.Cascadia;
  const m = measure(block.code, fontSize, fontFamily);
  const w = m.width + CODE_BLOCK_PADDING_X * 2;
  const h = m.height + CODE_BLOCK_PADDING_Y * 2;

  const elements: NonDeletedJsonDrawElement[] = [];

  elements.push(
    newElement({
      type: "rectangle",
      x: 0,
      y: offsetY,
      width: w,
      height: h,
      strokeColor: "#d0d0d0",
      backgroundColor: "#f5f5f5",
      fillStyle: "solid",
      strokeWidth: 1,
      roundness: { type: 3 },
    }) as NonDeletedJsonDrawElement,
  );

  elements.push(
    newTextElement({
      x: CODE_BLOCK_PADDING_X,
      y: offsetY + CODE_BLOCK_PADDING_Y,
      text: block.code,
      fontSize,
      fontFamily,
      textAlign: "left",
      verticalAlign: "top",
      strokeColor: "#1e1e1e",
      backgroundColor: "transparent",
    }) as NonDeletedJsonDrawElement,
  );

  return { elements, height: h, width: w };
}

function createBlockquoteElements(
  block: Extract<MdBlock, { type: "blockquote" }>,
  offsetY: number,
): { elements: NonDeletedJsonDrawElement[]; height: number; width: number } {
  const fontSize = 16;
  const fontFamily = DEFAULT_FONT_FAMILY;
  const m = measure(block.text, fontSize, fontFamily);
  const h = m.height + 8;

  const elements: NonDeletedJsonDrawElement[] = [];

  // vertical bar
  elements.push(
    newElement({
      type: "rectangle",
      x: 0,
      y: offsetY,
      width: BLOCKQUOTE_BAR_WIDTH,
      height: h,
      strokeColor: "transparent",
      backgroundColor: "#6c63ff",
      fillStyle: "solid",
      strokeWidth: 0,
      roundness: null,
    }) as NonDeletedJsonDrawElement,
  );

  elements.push(
    newTextElement({
      x: BLOCKQUOTE_BAR_WIDTH + BLOCKQUOTE_GAP,
      y: offsetY + 4,
      text: block.text,
      fontSize,
      fontFamily,
      textAlign: "left",
      verticalAlign: "top",
      strokeColor: "#555555",
      backgroundColor: "transparent",
    }) as NonDeletedJsonDrawElement,
  );

  return { elements, height: h, width: BLOCKQUOTE_BAR_WIDTH + BLOCKQUOTE_GAP + m.width };
}

function createTableElements(
  block: Extract<MdBlock, { type: "table" }>,
  offsetY: number,
): { elements: NonDeletedJsonDrawElement[]; height: number; width: number } {
  const { rows } = block;
  const fontSize = 14;
  const fontFamily = DEFAULT_FONT_FAMILY;
  const lineHeight = getLineHeight(fontFamily);
  const fontString = getFontString({ fontFamily, fontSize });

  const colCount = Math.max(...rows.map(r => r.length));
  const cellTexts = rows.map(row => {
    const padded = [...row];
    while (padded.length < colCount) padded.push("");
    return padded;
  });

  const colWidths: number[] = [];
  for (let c = 0; c < colCount; c++) {
    let maxW = CELL_MIN_WIDTH;
    for (const row of cellTexts) {
      const { width } = measureText(normalizeText(row[c]), fontString, lineHeight);
      maxW = Math.max(maxW, width + CELL_PADDING * 2);
    }
    colWidths.push(maxW);
  }

  const rowHeights = cellTexts.map(row => {
    let maxH = CELL_MIN_HEIGHT;
    for (const cell of row) {
      const { height } = measureText(normalizeText(cell), fontString, lineHeight);
      maxH = Math.max(maxH, height + CELL_PADDING * 2);
    }
    return maxH;
  });

  const elements: NonDeletedJsonDrawElement[] = [];
  let curY = offsetY;

  for (let r = 0; r < cellTexts.length; r++) {
    let curX = 0;
    for (let c = 0; c < colCount; c++) {
      const w = colWidths[c];
      const h = rowHeights[r];
      const text = cellTexts[r][c] || " ";
      const isHeader = r === 0;

      elements.push(
        newElement({
          type: "rectangle",
          x: curX,
          y: curY,
          width: w,
          height: h,
          strokeColor: "#1e1e1e",
          backgroundColor: isHeader ? "#f0f0f0" : "#ffffff",
          fillStyle: "solid",
          strokeWidth: 1,
          roundness: null,
        }) as NonDeletedJsonDrawElement,
      );

      elements.push(
        newTextElement({
          x: curX + w / 2,
          y: curY + h / 2,
          text,
          fontSize: isHeader ? 15 : fontSize,
          fontFamily,
          textAlign: "center",
          verticalAlign: "middle",
          strokeColor: "#1e1e1e",
          backgroundColor: "transparent",
        }) as NonDeletedJsonDrawElement,
      );

      curX += w;
    }
    curY += rowHeights[r];
  }

  const totalW = colWidths.reduce((a, b) => a + b, 0);
  const totalH = rowHeights.reduce((a, b) => a + b, 0);

  return { elements, height: totalH, width: totalW };
}

function createHrElements(
  offsetY: number,
  contentWidth: number,
): { elements: NonDeletedJsonDrawElement[]; height: number; width: number } {
  const lineWidth = Math.max(contentWidth, 200);
  const el = newLinearElement({
    type: "line",
    x: 0,
    y: offsetY,
    width: lineWidth,
    height: 0,
    points: [pointFrom<LocalPoint>(0, 0), pointFrom<LocalPoint>(lineWidth, 0)],
    strokeColor: "#cccccc",
    strokeWidth: 1,
  }) as NonDeletedJsonDrawElement;

  return { elements: [el], height: 2, width: lineWidth };
}

// ─── Main export ────────────────────────────────────────────────────────────

export function convertMarkdownToElements(md: string): NonDeletedJsonDrawElement[] {
  const blocks = parseMarkdownBlocks(md);
  if (blocks.length === 0) return [];

  const allElements: NonDeletedJsonDrawElement[] = [];
  let curY = 0;
  let maxWidth = 0;

  // First pass: measure max width for HR lines
  for (const block of blocks) {
    if (block.type === "table") {
      const colCount = Math.max(...block.rows.map(r => r.length));
      const fontFamily = DEFAULT_FONT_FAMILY;
      const fontSize = 14;
      const lineHeight = getLineHeight(fontFamily);
      const fontString = getFontString({ fontFamily, fontSize });
      let tableW = 0;
      for (let c = 0; c < colCount; c++) {
        let maxW = CELL_MIN_WIDTH;
        for (const row of block.rows) {
          if (row[c]) {
            const { width } = measureText(normalizeText(row[c]), fontString, lineHeight);
            maxW = Math.max(maxW, width + CELL_PADDING * 2);
          }
        }
        tableW += maxW;
      }
      maxWidth = Math.max(maxWidth, tableW);
    } else if (block.type === "paragraph") {
      const m = measure(block.text, 16, DEFAULT_FONT_FAMILY);
      maxWidth = Math.max(maxWidth, m.width);
    } else if (block.type === "heading") {
      const fontSizeMap: Record<number, number> = { 1: 28, 2: 24, 3: 20, 4: 18, 5: 16, 6: 14 };
      const m = measure(block.text, fontSizeMap[block.level] || 20, DEFAULT_FONT_FAMILY);
      maxWidth = Math.max(maxWidth, m.width);
    }
  }

  // Second pass: create elements
  for (const block of blocks) {
    let result: { elements: NonDeletedJsonDrawElement[]; height: number; width: number };

    switch (block.type) {
      case "heading":
        result = createHeadingElements(block, curY);
        break;
      case "paragraph":
        result = createParagraphElements(block, curY);
        break;
      case "list":
        result = createListElements(block, curY);
        break;
      case "code":
        result = createCodeElements(block, curY);
        break;
      case "blockquote":
        result = createBlockquoteElements(block, curY);
        break;
      case "table":
        result = createTableElements(block, curY);
        break;
      case "hr":
        result = createHrElements(curY, maxWidth);
        break;
    }

    allElements.push(...result.elements);
    maxWidth = Math.max(maxWidth, result.width);
    curY += result.height + BLOCK_GAP;
  }

  const totalHeight = curY - BLOCK_GAP;

  // Wrap everything in a frame
  const frame = newFrameElement({
    x: -FRAME_PADDING,
    y: -FRAME_PADDING,
    width: maxWidth + FRAME_PADDING * 2,
    height: totalHeight + FRAME_PADDING * 2,
    name: "Markdown",
  }) as NonDeletedJsonDrawElement;

  for (const el of allElements) {
    (el as NonDeletedJsonDrawElement & { frameId?: string }).frameId = frame.id;
  }

  return [...allElements, frame];
}

/** @deprecated Use convertMarkdownToElements instead */
export const convertMarkdownTableToElements = convertMarkdownToElements;
