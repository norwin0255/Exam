
const express = require('express');
const cors = require('cors');

const pool = require('./db'); //database

const app = express();
app.use(cors());
app.use(express.json());

// GET function where show all result based on query
app.get('/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST create new item
app.post('/items', async (req, res) => {
  try {
    const { title, is_done = false} = req.body;   
    const result = await pool.query(
      'INSERT INTO todos (title, is_done) VALUES ($1,$2) RETURNING *',
      [title, is_done]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE delete item, id based
app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
