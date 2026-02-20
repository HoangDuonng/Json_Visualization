import { initializeApp, getApps } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const dbConfig = {
  apiKey: process.env.NEXT_PUBLIC_DB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_DB_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DB_URL,
  projectId: process.env.NEXT_PUBLIC_DB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_DB_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_DB_APP_ID,
};

let _db: Database | null = null;

/**
 * Get database instance lazily — only initializes on first call.
 * This prevents the app from crashing if config is missing.
 */
export const getDb = (): Database => {
  if (_db) return _db;

  if (!dbConfig.databaseURL || !dbConfig.projectId) {
    throw new Error(
      "Database configuration is missing. Please set NEXT_PUBLIC_DB_* environment variables."
    );
  }

  const app = getApps().length === 0 ? initializeApp(dbConfig) : getApps()[0];
  _db = getDatabase(app);
  return _db;
};
