import pako from "pako";
import { exportToBackend, importFromBackend } from "./shareBackend";

interface ShareSceneData {
  elements: any[];
  appState: any;
  files?: Record<string, any>;
}

const pickUsedFiles = (elements: any[], files?: Record<string, any>) => {
  if (!files) {
    return undefined;
  }

  const fileIds = new Set<string>();
  for (const el of elements) {
    if (el && typeof el === "object" && "fileId" in el && el.fileId) {
      fileIds.add(el.fileId);
    }
  }

  if (fileIds.size === 0) {
    return undefined;
  }

  const usedFiles: Record<string, any> = {};
  for (const fileId of fileIds) {
    if (files[fileId]) {
      usedFiles[fileId] = files[fileId];
    }
  }

  return Object.keys(usedFiles).length ? usedFiles : undefined;
};

// ─── Backend-based share link ────────────────────────────────────────

/**
 * Create a shareable link by uploading encrypted data to the backend.
 * Returns a short URL like: https://jsonviz.online/draw#json=<id>,<key>
 */
export const createShareLink = async (
  elements: any[],
  appState: any,
  files?: Record<string, any>
): Promise<string> => {
  const nonDeletedElements = elements
    .filter(el => !el.isDeleted)
    .map(el => ({ ...el, isDeleted: undefined }));

  const data = {
    elements: nonDeletedElements,
    files: pickUsedFiles(nonDeletedElements, files),
    appState: {
      viewBackgroundColor: appState.viewBackgroundColor,
      theme: appState.theme,
    },
  };

  const jsonString = JSON.stringify(data);
  const compressed = pako.deflate(new TextEncoder().encode(jsonString));

  const { id, encryptionKey } = await exportToBackend(compressed);

  // Key is stored in hash → never sent to server → end-to-end encrypted
  const hash = `#json=${id},${encryptionKey}`;
  return `${window.location.origin}${window.location.pathname}${hash}`;
};

/**
 * Load scene data from a share link.
 * Hash format: #json=<id>,<key>
 */
export const loadFromShareLink = async (hash: string): Promise<ShareSceneData | null> => {
  const match = hash.match(/^#json=([a-zA-Z0-9_-]+),([a-zA-Z0-9_-]+)$/);
  if (!match) return null;

  const [, id, encryptionKey] = match;

  const decrypted = await importFromBackend(id, encryptionKey);
  if (!decrypted) return null;

  try {
    const jsonString = pako.inflate(decrypted, { to: "string" });
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to decompress share link data:", error);
    return null;
  }
};

/**
 * Check if the current URL hash is a backend share link
 */
export const isBackendShareLink = (hash: string): boolean => {
  return /^#json=([a-zA-Z0-9_-]+),([a-zA-Z0-9_-]+)$/.test(hash);
};

// ─── Legacy URL-based share link (backward compatibility) ─────────────

/**
 * Decode legacy #data= format (base64 in URL).
 * Kept for backward compatibility with old shared links.
 * @deprecated Use loadFromShareLink instead for new links.
 */
export const decodeDataFromUrlHash = (hash: string) => {
  try {
    let base64 = hash.replace("#data=", "");

    // Backward compatibility: try to decode legacy encodeURIComponent strings
    try {
      base64 = decodeURIComponent(base64);
    } catch {
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
    console.error("Failed to decode legacy sharelink data", error);
    return null;
  }
};
