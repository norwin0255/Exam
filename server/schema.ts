import { pgTable, serial, text, boolean, timestamp  } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
   id: serial('id').primaryKey(),
   title: text('title').notNull(),
   created_at: timestamp('created_at').defaultNow(),
   is_done: boolean('is_done')
});
