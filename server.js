// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2');

// Initialize app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rest_api_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

// Routes

// --- Product Routes ---
// Get all products
app.get('/products', (req, res) => {
  const { name, category } = req.query;
  let query = 'SELECT * FROM products';
  const params = [];

  if (name || category) {
    query += ' WHERE';
    if (name) {
      query += ' name LIKE ?';
      params.push(`%${name}%`);
    }
    if (category) {
      query += params.length ? ' AND' : '';
      query += ' category = ?';
      params.push(category);
    }
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get a product by ID
app.get('/products/:id', (req, res) => {
  db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Product not found');
    res.json(results[0]);
  });
});

// Create a product
app.post('/products', (req, res) => {
  const { name, category, price } = req.body;
  if (!name || !category || !price) return res.status(400).send('Missing required fields');

  const newProduct = { id: uuidv4(), name, category, price };
  db.query('INSERT INTO products SET ?', newProduct, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json(newProduct);
  });
});

// Update a product
app.put('/products/:id', (req, res) => {
  db.query('UPDATE products SET ? WHERE id = ?', [req.body, req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) return res.status(404).send('Product not found');
    res.json({ id: req.params.id, ...req.body });
  });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) return res.status(404).send('Product not found');
    res.status(204).send();
  });
});

// --- Consumer Routes ---
// Get all consumers
app.get('/consumers', (req, res) => {
  db.query('SELECT * FROM consumers', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get a consumer by ID
app.get('/consumers/:id', (req, res) => {
  db.query('SELECT * FROM consumers WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Consumer not found');
    res.json(results[0]);
  });
});

// Create a consumer
app.post('/consumers', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).send('Missing required fields');

  const newConsumer = { id: uuidv4(), name, email };
  db.query('INSERT INTO consumers SET ?', newConsumer, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json(newConsumer);
  });
});

// Update a consumer
app.put('/consumers/:id', (req, res) => {
  db.query('UPDATE consumers SET ? WHERE id = ?', [req.body, req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) return res.status(404).send('Consumer not found');
    res.json({ id: req.params.id, ...req.body });
  });
});

// Delete a consumer
app.delete('/consumers/:id', (req, res) => {
  db.query('DELETE FROM consumers WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) return res.status(404).send('Consumer not found');
    res.status(204).send();
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
