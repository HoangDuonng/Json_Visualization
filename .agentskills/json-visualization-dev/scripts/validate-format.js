#!/usr/bin/env node

/**
 * Validates JSON/YAML/CSV/XML content.
 * Usage: node validate-format.js <format> <file>
 */

const fs = require("fs");

const SUPPORTED_FORMATS = ["json", "yaml", "csv", "xml"];

function validateJson(content) {
  try {
    JSON.parse(content);
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function validateYaml(content) {
  if (content.trim().length === 0) {
    return { valid: false, error: "Empty YAML content" };
  }

  return { valid: true };
}

function validateCsv(content) {
  const lines = content.trim().split("\n").filter(Boolean);
  if (lines.length === 0) {
    return { valid: false, error: "Empty CSV content" };
  }

  return { valid: true };
}

function validateXml(content) {
  if (!content.trim().startsWith("<")) {
    return { valid: false, error: "Invalid XML: must start with <" };
  }

  return { valid: true };
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error("Usage: node validate-format.js <format> <file>");
    console.error(`Supported formats: ${SUPPORTED_FORMATS.join(", ")}`);
    process.exit(1);
  }

  const [format, filePath] = args;
  const normalizedFormat = format.toLowerCase();

  if (!SUPPORTED_FORMATS.includes(normalizedFormat)) {
    console.error(`Unsupported format: ${format}`);
    console.error(`Supported formats: ${SUPPORTED_FORMATS.join(", ")}`);
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, "utf-8");

  let result;
  switch (normalizedFormat) {
    case "json":
      result = validateJson(content);
      break;
    case "yaml":
      result = validateYaml(content);
      break;
    case "csv":
      result = validateCsv(content);
      break;
    case "xml":
      result = validateXml(content);
      break;
  }

  if (result.valid) {
    console.log(`OK: Valid ${normalizedFormat.toUpperCase()}`);
    process.exit(0);
  }

  console.error(`ERROR: Invalid ${normalizedFormat.toUpperCase()}: ${result.error}`);
  process.exit(1);
}

main();
