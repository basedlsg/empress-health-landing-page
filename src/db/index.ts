import { drizzle } from 'drizzle-orm/libsql';
import { createClient, Client } from '@libsql/client';
import * as schema from '@/db/schema';

let _db: ReturnType<typeof drizzle<Client>> | null = null;

export function getDb() {
  if (_db) return _db;

  const url = process.env.TURSO_CONNECTION_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error('TURSO_CONNECTION_URL is not set.');
  }
  if (!authToken) {
    throw new Error('TURSO_AUTH_TOKEN is not set.');
  }

  const client = createClient({ url, authToken });
  _db = drizzle(client, { schema });
  return _db;
}

// Keep a type alias for consumers
export type Database = ReturnType<typeof getDb>;