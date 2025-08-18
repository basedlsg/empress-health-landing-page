import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const conversations = sqliteTable('conversations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  conversationId: integer('conversation_id').references(() => conversations.id),
  speaker: text('speaker').notNull(),
  text: text('text').notNull(),
  timestamp: text('timestamp').notNull(),
  createdAt: text('created_at').notNull(),
});

export const affirmationSchedules = sqliteTable('affirmation_schedules', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull(),
  times: text('times', { mode: 'json' }).notNull(),
  tone: text('tone').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const checkins = sqliteTable('checkins', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull(),
  weekNumber: integer('week_number').notNull(),
  hotCount: integer('hot_count').notNull(),
  severity: integer('severity').notNull(),
  sleep: integer('sleep').notNull(),
  mood: integer('mood').notNull(),
  adherence: integer('adherence').notNull(),
  note: text('note'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const pods = sqliteTable('pods', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  topic: text('topic').notNull(),
  createdAt: text('created_at').notNull(),
});

export const podMemberships = sqliteTable('pod_memberships', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull(),
  podId: integer('pod_id').references(() => pods.id),
  joinedAt: text('joined_at').notNull(),
});

export const podPosts = sqliteTable('pod_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull(),
  podId: integer('pod_id').references(() => pods.id),
  text: text('text').notNull(),
  timestamp: text('timestamp').notNull(),
  createdAt: text('created_at').notNull(),
});

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  imageUrl: text('image_url').notNull(),
  price: real('price').notNull(),
  description: text('description'),
  createdAt: text('created_at').notNull(),
});

export const doctorsWaitlist = sqliteTable('doctors_waitlist', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  specialty: text('specialty').notNull(),
  createdAt: text('created_at').notNull(),
});