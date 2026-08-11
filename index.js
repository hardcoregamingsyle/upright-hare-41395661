const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Database = require('better-sqlite3');
const { z } = require('zod');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-in-production';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '1h';

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
}));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(express.json({ limit: '10kb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many authentication attempts.' }
});

// Database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Validation schemas
const registerSchema = z.object({
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(8).max(128)
});

const loginSchema = z.object({
  username: z.string().min(1).max(50),
  password: z.string().min(1).max(128)
});

const itemSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional()
});

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  if (err instanceof z.ZodError) {
    return res.status(400).json({ error: 'Validation failed', details: err.errors });
  }
  res.status(500).json({ error: 'Internal server error' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Register
app.post('/api/register', authLimiter, (req, res) => {
  try {
    const { username, password } = registerSchema.parse(req.body);
    const passwordHash = bcrypt.hashSync(password, 12);
    const stmt = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)');
    const result = stmt.run(username, passwordHash);
    res.status(201).json({ id: result.lastInsertRowid, username });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      return res.status(409).json({ error: 'Username already exists' });
    }
    throw err;
  }
});

// Login
app.post('/api/login', authLimiter, (req, res) => {
  const { username, password } = loginSchema.parse(req.body);
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  res.json({ token, expires_in: JWT_EXPIRY });
});

// Get items (protected)
app.get('/api/items', authenticateToken, (req, res) => {
  const items = db.prepare('SELECT * FROM items WHERE user_id = ?').all(req.user.id);
  res.json(items);
});

// Create item (protected)
app.post('/api/items', authenticateToken, (req, res) => {
  const { name, description } = itemSchema.parse(req.body);
  const stmt = db.prepare('INSERT INTO items (user_id, name, description) VALUES (?, ?, ?)');
  const result = stmt.run(req.user.id, name, description || '');
  res.status(201).json({ id: result.lastInsertRowid, name, description });
});

// Delete item (protected)
app.delete('/api/items/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid item ID' });
  const stmt = db.prepare('DELETE FROM items WHERE id = ? AND user_id = ?');
  const result = stmt.run(id, req.user.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Item not found' });
  res.status(204).send();
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
