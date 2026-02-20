import pako from "pako";

/**
 * Encode current jsondraw elements and app state into a base64 compressed string
 */
export const encodeDataToUrlHash = (elements: any[], appState: any): string => {
  // We only keep the required fields from elements and appState
  // to minimize the URI length
  const data = {
    elements: elements.filter(el => !el.isDeleted).map(el => ({ ...el, isDeleted: undefined })),
    appState: {
      viewBackgroundColor: appState.viewBackgroundColor,
      theme: appState.theme,
    },
  };

  const jsonString = JSON.stringify(data);
  const compressed = pako.deflate(jsonString);

  // Convert Uint8Array to Binary String
  let binaryString = "";
  const chunkSize = 8000;
  for (let i = 0; i < compressed.length; i += chunkSize) {
    binaryString += String.fromCharCode.apply(null, Array.from(compressed.slice(i, i + chunkSize)));
  }

  // Base64 encode
  let base64 = typeof window !== "undefined" ? window.btoa(binaryString) : "";

  // Make base64 url-safe by replacing + with -, / with _, and removing trailing =
  base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  return `#data=${base64}`;
};

/**
 * Decode from window.location.hash
 */
export const decodeDataFromUrlHash = (hash: string) => {
  try {
    let base64 = hash.replace("#data=", "");

    // Backward compatibility: try to decode legacy encodeURIComponent strings
    try {
      base64 = decodeURIComponent(base64);
    } catch (e) {
      // Ignore
    }

    // Convert from url-safe base64 to standard base64
    base64 = base64.replace(/-/g, "+").replace(/_/g, "/");
    // Restore padding if necessary
    while (base64.length % 4) {
      base64 += "=";
    }

    const binaryString = window.atob(base64);

    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const decompressed = pako.inflate(bytes, { to: "string" });
    return JSON.parse(decompressed);
  } catch (error) {
    console.error("Failed to decode sharelink data", error);
    return null;
  }
};
