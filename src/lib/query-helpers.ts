import { getDb } from '@/db';
import { messages, pods, products } from '@/db/schema';
import { eq, like, or, desc, asc } from 'drizzle-orm';

// Helper to build messages query with optional conversation filter
export async function getMessages(options: {
  conversationId?: string;
  limit?: number;
  offset?: number;
}) {
  const { conversationId, limit = 10, offset = 0 } = options;

  const db = getDb();
    const baseQuery = db.select({
    id: messages.id,
    conversationId: messages.conversationId,
    speaker: messages.speaker,
    text: messages.text,
    timestamp: messages.timestamp,
    createdAt: messages.createdAt
  }).from(messages);

  if (conversationId) {
    return await baseQuery
      .where(eq(messages.conversationId, parseInt(conversationId)))
      .orderBy(desc(messages.timestamp))
      .limit(limit)
      .offset(offset);
  }

  return await baseQuery
    .orderBy(desc(messages.timestamp))
    .limit(limit)
    .offset(offset);
}

// Helper to build pods query with optional search
export async function getPods(options: {
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const { search, limit = 10, offset = 0 } = options;

  const db = getDb();
    const baseQuery = db.select().from(pods);

  if (search) {
    return await baseQuery
      .where(
        or(
          like(pods.name, `%${search}%`),
          like(pods.topic, `%${search}%`)
        )
      )
      .orderBy(desc(pods.createdAt))
      .limit(limit)
      .offset(offset);
  }

  return await baseQuery
    .orderBy(desc(pods.createdAt))
    .limit(limit)
    .offset(offset);
}

// Helper to build products query with optional search
export async function getProducts(options: {
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const { search, limit = 10, offset = 0 } = options;

  const db = getDb();
    const baseQuery = db.select().from(products);

  if (search) {
    return await baseQuery
      .where(
        or(
          like(products.title, `%${search}%`),
          like(products.description, `%${search}%`)
        )
      )
      .orderBy(desc(products.createdAt))
      .limit(limit)
      .offset(offset);
  }

  return await baseQuery
    .orderBy(desc(products.createdAt))
    .limit(limit)
    .offset(offset);
}
