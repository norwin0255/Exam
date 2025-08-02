//   import { db } from './db.js';
//   import { todos } from './schema.js';
//   import { eq } from 'drizzle-orm';

//   async function getUsers() {
//     const allUsers = await db.select().from(todos);
//     console.log(allUsers);
//   }

//   async function createUser(title: string, is_done: boolean) {
//     await db.insert(todos).values({title, is_done});
//   }

//   async function deleteUser(id: number) {
//     await db.delete(todos).where(eq(todos.id, id));
//   }

import { Config } from 'drizzle-kit';

export default {
   schema: './schema.ts', // Path to your schema file
   out: './drizzle', // Output directory for migrations
   dbCredentials: {
      host: "localhost",
      port: '5432',
      user: "postgres",
      password: "password",
      database: "exam_db",
      ssl: false
   }, dialect: "postgresql",
};


