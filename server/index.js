import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { initDb, openDb } from './db.js';
import { signToken, verifyToken, hashPassword, comparePassword } from './auth.js';

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-prod';

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }

  const token = authHeader.slice(7);
  try {
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'name,email,password required' });

  try {
    const db = await openDb();
    const existing = await db.get('SELECT id FROM users WHERE email = ?', email);
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const password_hash = await hashPassword(password);
    const result = await db.run('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', name, email, password_hash, role || 'instructor');
    const user = await db.get('SELECT id, name, email, role FROM users WHERE id = ?', result.lastID);
    const token = signToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email,password required' });
  try {
    const db = await openDb();
    const user = await db.get('SELECT * FROM users WHERE email = ?', email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await comparePassword(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken(user);
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/courses', async (_, res) => {
  try {
    const db = await openDb();
    const courses = await db.all('SELECT * FROM courses');
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/instructors', async (_, res) => {
  try {
    const db = await openDb();
    const instructors = await db.all('SELECT * FROM instructors');
    res.json(instructors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/resources', async (_, res) => {
  try {
    const db = await openDb();
    const resources = await db.all('SELECT * FROM resources');
    res.json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/me', authenticateJWT, async (req, res) => {
  try {
    const db = await openDb();
    const user = await db.get('SELECT id, name, email, role FROM users WHERE id = ?', req.user.id);
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/courses', authenticateJWT, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'title+description required' });
    const db = await openDb();
    const result = await db.run('INSERT INTO courses (title, description) VALUES (?, ?)', title, description);
    const course = await db.get('SELECT * FROM courses WHERE id = ?', result.lastID);
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to initialize DB', err);
  process.exit(1);
});
