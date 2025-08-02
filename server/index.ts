import { db } from './db';
import { todos } from './schema';
import { eq } from 'drizzle-orm';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// GET function where show all result based on query
app.get('/items', async (req, res) => {
   try {
      const result = await db.select().from(todos).orderBy();
      res.json(result);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});

// POST create new item
app.post('/items', async (req, res) => {
   try {
      const { title, is_done = false } = req.body;
      const result = await db.insert(todos).values({
         title: title,
         is_done: is_done
      }).returning();
      res.status(201).json(result);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});

// DELETE delete item, id based
app.delete('/items/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const result = await db
         .delete(todos)
         .where(eq(todos.id, id));

      res.status(201).json(result);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});

const PORT = 5000;
app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});