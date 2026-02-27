export const MAX_COLLABORATORS_PER_ROOM = 7;

export const JSONDRAW_NODE_PADDING = 16;
export const JSONDRAW_ROW_HEIGHT = 24;
export const JSONDRAW_FONT_SIZE = 16;
export const JSONDRAW_HORIZONTAL_GAP = 200;
export const JSONDRAW_VERTICAL_GAP = 40;

export enum FileFormat {
  JSON = "json",
  YAML = "yaml",
  XML = "xml",
  CSV = "csv",
}

export enum TypeLanguage {
  TypeScript = "typescript",
  TypeScript_Combined = "typescript/typealias",
  Go = "go",
  JSON_SCHEMA = "json_schema",
  Kotlin = "kotlin",
  Rust = "rust",
}

export enum ViewMode {
  Graph = "graph",
  Tree = "tree",
  JsonDraw = "jsondraw",
}

export enum CollabType {
  Socket = "socket",
  Trystero = "trystero",
}

export const formats = [
  { value: FileFormat.JSON, label: "JSON" },
  { value: FileFormat.YAML, label: "YAML" },
  { value: FileFormat.XML, label: "XML" },
  { value: FileFormat.CSV, label: "CSV" },
];

export const typeOptions = [
  {
    label: "TypeScript",
    value: TypeLanguage.TypeScript,
    lang: "typescript",
  },
  {
    label: "TypeScript (merged)",
    value: TypeLanguage.TypeScript_Combined,
    lang: "typescript",
  },
  {
    label: "Go",
    value: TypeLanguage.Go,
    lang: "go",
  },
  {
    label: "JSON Schema",
    value: TypeLanguage.JSON_SCHEMA,
    lang: "json",
  },
  {
    label: "Kotlin",
    value: TypeLanguage.Kotlin,
    lang: "kotlin",
  },
  {
    label: "Rust",
    value: TypeLanguage.Rust,
    lang: "rust",
  },
];
