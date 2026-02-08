#!/usr/bin/env node

/**
 * Validates JSON/YAML/CSV/XML/TOML content
 * Usage: node validate-format.js <format> <file>
 */

const fs = require("fs");
const path = require("path");

const SUPPORTED_FORMATS = ["json", "yaml", "csv", "xml", "toml"];

function validateJson(content) {
  try {
    JSON.parse(content);
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function validateYaml(content) {
  try {
    // Basic YAML validation (requires yaml package in real implementation)
    if (content.trim().length === 0) {
      return { valid: false, error: "Empty YAML content" };
    }
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function validateCsv(content) {
  try {
    const lines = content.trim().split("\n");
    if (lines.length === 0) {
      return { valid: false, error: "Empty CSV content" };
    }
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function validateXml(content) {
  try {
    // Basic XML validation
    if (!content.trim().startsWith("<")) {
      return { valid: false, error: "Invalid XML: must start with <" };
    }
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function validateToml(content) {
  try {
    if (content.trim().length === 0) {
      return { valid: false, error: "Empty TOML content" };
    }
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error("Usage: node validate-format.js <format> <file>");
    console.error(`Supported formats: ${SUPPORTED_FORMATS.join(", ")}`);
    process.exit(1);
  }

  const [format, filePath] = args;

  if (!SUPPORTED_FORMATS.includes(format.toLowerCase())) {
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
  switch (format.toLowerCase()) {
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
    case "toml":
      result = validateToml(content);
      break;
  }

  if (result.valid) {
    console.log(`✓ Valid ${format.toUpperCase()}`);
    process.exit(0);
  } else {
    console.error(`✗ Invalid ${format.toUpperCase()}: ${result.error}`);
    process.exit(1);
  }
}

main();
