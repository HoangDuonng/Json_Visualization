import type { Locale } from "../config";
import { formatConversionTranslations } from "./docs/format-conversion";
import { formatValidateTranslations } from "./docs/format-validate";
import { visualizationTranslations } from "./docs/visualization";
import { typeGenerationTranslations } from "./docs/type-generation";
import { jsonSchemaTranslations } from "./docs/json-schema";
import { jqQueryTranslations } from "./docs/jq-query";
import { jsonPathTranslations } from "./docs/json-path";

export const docsTranslations = {
  // ==================== COMMON ====================
  common: {
    needHelp: {
      en: "Need Help?",
      vi: "Cần Trợ Giúp?",
    },
    needHelpText: {
      en: "If you encounter issues or have questions, visit our",
      vi: "Nếu bạn gặp vấn đề hoặc có câu hỏi, hãy truy cập",
    },
    documentation: {
      en: "Documentation",
      vi: "Tài Liệu",
    },
    orTry: {
      en: "or try the",
      vi: "hoặc thử",
    },
    directly: {
      en: "directly",
      vi: "trực tiếp",
    },
    editor: {
      en: "Editor",
      vi: "Trình Soạn Thảo",
    },
    tipsAndBestPractices: {
      en: "Tips & Best Practices",
      vi: "Mẹo & Thực Hành Tốt Nhất",
    },
    howToUse: {
      en: "How to Use",
      vi: "Cách Sử Dụng",
    },
    examples: {
      en: "Examples",
      vi: "Ví Dụ",
    },
    practicalExamples: {
      en: "Practical Examples",
      vi: "Ví Dụ Thực Tế",
    },
    supportedFormats: {
      en: "Supported Formats",
      vi: "Định Dạng Được Hỗ Trợ",
    },
  },

  // ==================== VISUALIZATION ====================
  visualization: visualizationTranslations,

  // ==================== FORMAT CONVERSION ====================
  formatConversion: formatConversionTranslations,

  // ==================== FORMAT & VALIDATE ====================
  formatValidate: formatValidateTranslations,

  // ==================== TYPE GENERATION ====================
  typeGeneration: typeGenerationTranslations,

  // ==================== JSON SCHEMA ====================
  jsonSchema: jsonSchemaTranslations,

  // ==================== JQ QUERY ====================
  jqQuery: jqQueryTranslations,

  // ==================== JSON PATH ====================
  jsonPath: jsonPathTranslations,
};

export function getDocsTranslation(key: string, locale: Locale): string {
  const keys = key.split(".");
  let value: any = docsTranslations;

  for (const k of keys) {
    value = value?.[k];
  }

  return value?.[locale] || value?.en || key;
}
