import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const dbConfig = {
  apiKey: process.env.NEXT_PUBLIC_DB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_DB_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DB_URL,
  projectId: process.env.NEXT_PUBLIC_DB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_DB_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_DB_APP_ID,
};

// Initialize database connection (singleton)
const app = getApps().length === 0 ? initializeApp(dbConfig) : getApps()[0];

export const db = getDatabase(app);
export default app;
