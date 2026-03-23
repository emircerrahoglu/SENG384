const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

app.get('/api/people', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM people ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) { res.status(500).json({ error: 'SERVER_ERROR' }); }
});

app.get('/api/people/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM people WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'NOT_FOUND' });
    res.status(200).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: 'SERVER_ERROR' }); }
});

app.post('/api/people', async (req, res) => {
  const { full_name, email } = req.body;
  if (!full_name || !email) return res.status(400).json({ error: 'MISSING_FIELDS' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'INVALID_EMAIL' });
  try {
    const result = await pool.query('INSERT INTO people (full_name, email) VALUES ($1, $2) RETURNING *', [full_name, email]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'EMAIL_ALREADY_EXISTS' });
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

app.put('/api/people/:id', async (req, res) => {
  const { full_name, email } = req.body;
  if (!full_name || !email) return res.status(400).json({ error: 'MISSING_FIELDS' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'INVALID_EMAIL' });
  try {
    const result = await pool.query('UPDATE people SET full_name = $1, email = $2 WHERE id = $3 RETURNING *', [full_name, email, req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'NOT_FOUND' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'EMAIL_ALREADY_EXISTS' });
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});

app.delete('/api/people/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM people WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'NOT_FOUND' });
    res.status(200).json({ message: 'DELETED' });
  } catch (err) { res.status(500).json({ error: 'SERVER_ERROR' }); }
});

app.listen(process.env.PORT || 5000);