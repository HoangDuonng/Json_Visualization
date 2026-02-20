import { ref, set, get } from "firebase/database";
import { getDb } from "../../../../lib/db";

/**
 * Convert Uint8Array to base64 string (without spread operator for TS compat)
 */
const uint8ToBase64 = (bytes: Uint8Array): string => {
  let binary = "";
  const chunkSize = 8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.slice(i, i + chunkSize)));
  }
  return btoa(binary);
};

/**
 * Convert base64 string to Uint8Array
 */
const base64ToUint8 = (base64: string): Uint8Array => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

/**
 * Generate a short random ID for share links (URL-safe, 20 chars)
 */
const generateId = (): string => {
  const array = new Uint8Array(15);
  crypto.getRandomValues(array);
  const base64 = uint8ToBase64(array);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

/**
 * Generate an AES-GCM encryption key and return it as a base64url string
 */
export const generateEncryptionKey = async (): Promise<string> => {
  const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 128 }, true, [
    "encrypt",
    "decrypt",
  ]);
  const exported = await crypto.subtle.exportKey("raw", key);
  const bytes = new Uint8Array(exported);
  const base64 = uint8ToBase64(bytes);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

/**
 * Import an AES-GCM key from a base64url string
 */
const importKey = async (keyStr: string): Promise<CryptoKey> => {
  // Convert base64url back to standard base64
  let base64 = keyStr.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";

  const raw = base64ToUint8(base64);
  return crypto.subtle.importKey("raw", raw.buffer as ArrayBuffer, { name: "AES-GCM" }, false, [
    "encrypt",
    "decrypt",
  ]);
};

/**
 * Encrypt data using AES-GCM.
 * Returns a Uint8Array with IV prepended to ciphertext.
 */
const encryptData = async (data: Uint8Array, keyStr: string): Promise<Uint8Array> => {
  const key = await importKey(keyStr);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data.buffer as ArrayBuffer
  );
  // Prepend IV to ciphertext
  const result = new Uint8Array(iv.length + encrypted.byteLength);
  result.set(iv);
  result.set(new Uint8Array(encrypted), iv.length);
  return result;
};

/**
 * Decrypt data using AES-GCM.
 * Expects IV prepended to ciphertext.
 */
const decryptData = async (data: Uint8Array, keyStr: string): Promise<Uint8Array> => {
  const key = await importKey(keyStr);
  const iv = data.slice(0, 12);
  const ciphertext = data.slice(12);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext.buffer as ArrayBuffer
  );
  return new Uint8Array(decrypted);
};

/**
 * Upload encrypted + compressed scene data to the backend.
 * Returns { id, encryptionKey } for the share link.
 */
export const exportToBackend = async (
  compressedData: Uint8Array
): Promise<{ id: string; encryptionKey: string }> => {
  const id = generateId();
  const encryptionKey = await generateEncryptionKey();

  // Encrypt the compressed data
  const encrypted = await encryptData(compressedData, encryptionKey);

  // Convert to base64 for storage (DB stores strings)
  const base64Data = uint8ToBase64(encrypted);

  // Store in database
  const dbRef = ref(getDb(), `shared/${id}`);
  await set(dbRef, {
    data: base64Data,
    createdAt: Date.now(),
  });

  return { id, encryptionKey };
};

/**
 * Download and decrypt scene data from the backend.
 * Returns decrypted data as Uint8Array, or null if not found.
 */
export const importFromBackend = async (
  id: string,
  encryptionKey: string
): Promise<Uint8Array | null> => {
  try {
    const dbRef = ref(getDb(), `shared/${id}`);
    const snapshot = await get(dbRef);

    if (!snapshot.exists()) {
      console.error("Share link data not found:", id);
      return null;
    }

    const { data: base64Data } = snapshot.val();

    // Convert base64 back to Uint8Array
    const encrypted = base64ToUint8(base64Data);

    // Decrypt
    const decrypted = await decryptData(encrypted, encryptionKey);

    return decrypted;
  } catch (error) {
    console.error("Failed to import shared data:", error);
    return null;
  }
};
