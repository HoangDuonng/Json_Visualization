/*
  JSON-to-Dart
  A utility to translate JSON into Dart class definitions
  with fromJson and toJson methods.
*/

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toCamelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, char => char.toLowerCase());
}

function toPascalCase(str: string): string {
  const camel = toCamelCase(str);
  return capitalize(camel);
}

function getDartType(value: unknown, key: string, classes: Map<string, object>): string {
  if (value === null || value === undefined) return "dynamic";
  if (typeof value === "string") return "String";
  if (typeof value === "number") {
    return Number.isInteger(value) ? "int" : "double";
  }
  if (typeof value === "boolean") return "bool";

  if (Array.isArray(value)) {
    if (value.length === 0) return "List<dynamic>";
    const first = value[0];
    const itemType = getDartType(first, key, classes);
    return `List<${itemType}>`;
  }

  if (typeof value === "object") {
    const className = toPascalCase(key);
    classes.set(className, value as object);
    return className;
  }

  return "dynamic";
}

function generateClass(
  className: string,
  obj: object,
  classes: Map<string, object>,
  generated: Set<string>
): string {
  if (generated.has(className)) return "";
  generated.add(className);

  const entries = Object.entries(obj);
  const fields: { key: string; fieldName: string; dartType: string }[] = [];

  for (const [key, value] of entries) {
    const fieldName = toCamelCase(key);
    let actualValue = value;

    if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
      const itemClassName = toPascalCase(key);
      classes.set(itemClassName, value[0] as object);
    }

    const dartType = getDartType(actualValue, key, classes);
    fields.push({ key, fieldName, dartType });
  }

  let result = `class ${className} {\n`;

  for (const { fieldName, dartType } of fields) {
    result += `  ${dartType}? ${fieldName};\n`;
  }

  result += `\n  ${className}({`;
  result += fields.map(({ fieldName }) => `this.${fieldName}`).join(", ");
  result += "});\n";

  result += `\n  ${className}.fromJson(Map<String, dynamic> json) {\n`;
  for (const { key, fieldName, dartType } of fields) {
    if (dartType.startsWith("List<")) {
      const innerType = dartType.slice(5, -1);
      const isPrimitive = ["String", "int", "double", "bool", "dynamic"].includes(innerType);

      if (isPrimitive) {
        result += `    ${fieldName} = json['${key}'] != null ? List<${innerType}>.from(json['${key}']) : null;\n`;
      } else {
        result += `    if (json['${key}'] != null) {\n`;
        result += `      ${fieldName} = <${innerType}>[];\n`;
        result += `      json['${key}'].forEach((v) {\n`;
        result += `        ${fieldName}!.add(${innerType}.fromJson(v));\n`;
        result += `      });\n`;
        result += `    }\n`;
      }
    } else if (
      !["String", "int", "double", "bool", "dynamic"].includes(dartType)
    ) {
      result += `    ${fieldName} = json['${key}'] != null ? ${dartType}.fromJson(json['${key}']) : null;\n`;
    } else {
      result += `    ${fieldName} = json['${key}'];\n`;
    }
  }
  result += "  }\n";

  result += `\n  Map<String, dynamic> toJson() {\n`;
  result += `    final Map<String, dynamic> data = <String, dynamic>{};\n`;
  for (const { key, fieldName, dartType } of fields) {
    if (dartType.startsWith("List<")) {
      const innerType = dartType.slice(5, -1);
      const isPrimitive = ["String", "int", "double", "bool", "dynamic"].includes(innerType);

      if (isPrimitive) {
        result += `    data['${key}'] = ${fieldName};\n`;
      } else {
        result += `    if (${fieldName} != null) {\n`;
        result += `      data['${key}'] = ${fieldName}!.map((v) => v.toJson()).toList();\n`;
        result += `    }\n`;
      }
    } else if (
      !["String", "int", "double", "bool", "dynamic"].includes(dartType)
    ) {
      result += `    if (${fieldName} != null) {\n`;
      result += `      data['${key}'] = ${fieldName}!.toJson();\n`;
      result += `    }\n`;
    } else {
      result += `    data['${key}'] = ${fieldName};\n`;
    }
  }
  result += `    return data;\n`;
  result += "  }\n";
  result += "}\n";

  return result;
}

export default function jsonToDart(json: string, rootClassName = "Root"): string {
  let data: unknown;

  try {
    data = JSON.parse(json);
  } catch {
    return "// Invalid JSON";
  }

  if (typeof data !== "object" || data === null) {
    return "// JSON root must be an object or array of objects";
  }

  const classes = new Map<string, object>();
  const generated = new Set<string>();
  const results: string[] = [];

  if (Array.isArray(data)) {
    if (data.length > 0 && typeof data[0] === "object") {
      classes.set(rootClassName, data[0] as object);
    } else {
      return "// JSON array does not contain objects";
    }
  } else {
    classes.set(rootClassName, data as object);
  }

  while (classes.size > generated.size) {
    for (const [className, obj] of classes) {
      if (!generated.has(className)) {
        const classCode = generateClass(className, obj, classes, generated);
        if (classCode) results.push(classCode);
      }
    }
  }

  return results.join("\n");
}
