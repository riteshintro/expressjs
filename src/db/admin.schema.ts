import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  email: text('email').unique(),
  password: text('password'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});


export const boards = pgTable('boards', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    status: text('status').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  });