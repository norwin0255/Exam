// db.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// You can use the same credentials as in drizzle.config.ts
const client = postgres({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'exam_db',
  ssl: false
});

export const db = drizzle(client);
