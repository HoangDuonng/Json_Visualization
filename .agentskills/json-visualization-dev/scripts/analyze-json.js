#!/usr/bin/env node

/**
 * Analyzes JSON structure and provides statistics
 * Usage: node analyze-json.js <file>
 */

const fs = require("fs");

function analyzeJson(obj, depth = 0, stats = { objects: 0, arrays: 0, primitives: 0, maxDepth: 0, keys: new Set() }) {
  stats.maxDepth = Math.max(stats.maxDepth, depth);

  if (obj === null || obj === undefined) {
    stats.primitives++;
    return stats;
  }

  if (Array.isArray(obj)) {
    stats.arrays++;
    obj.forEach(item => analyzeJson(item, depth + 1, stats));
  } else if (typeof obj === "object") {
    stats.objects++;
    Object.keys(obj).forEach(key => {
      stats.keys.add(key);
      analyzeJson(obj[key], depth + 1, stats);
    });
  } else {
    stats.primitives++;
  }

  return stats;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: node analyze-json.js <file>");
    process.exit(1);
  }

  const filePath = args[0];

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(content);
    const stats = analyzeJson(json);

    console.log("JSON Structure Analysis");
    console.log("======================");
    console.log(`Objects:    ${stats.objects}`);
    console.log(`Arrays:     ${stats.arrays}`);
    console.log(`Primitives: ${stats.primitives}`);
    console.log(`Max Depth:  ${stats.maxDepth}`);
    console.log(`Unique Keys: ${stats.keys.size}`);
    console.log(`Total Nodes: ${stats.objects + stats.arrays + stats.primitives}`);

    if (stats.keys.size > 0) {
      console.log("\nTop 10 Keys:");
      Array.from(stats.keys).slice(0, 10).forEach(key => {
        console.log(`  - ${key}`);
      });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
