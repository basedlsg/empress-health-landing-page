import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';

// Lazily initialize the database client to avoid build-time crashes when env vars are missing.
let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!dbInstance) {
    const url = process.env.TURSO_CONNECTION_URL || process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN;

    if (!url) {
      throw new Error(
        'Database URL is not set. Please set TURSO_CONNECTION_URL or TURSO_DATABASE_URL (or DATABASE_URL) in your environment.'
      );
    }

    const client = createClient({
      url,
      authToken,
    });

    dbInstance = drizzle(client, { schema });
  }
  return dbInstance;
}

export type Database = ReturnType<typeof getDb>;