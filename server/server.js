const express = require('express');
const cors = require('cors');
const { initializeDb } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db;

// Initialize Database and Start Server
initializeDb().then(database => {
  db = database;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

// GET /api/courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await db.all('SELECT * FROM courses');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  
  try {
    await db.run(
      'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
    res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simple Mock login for Instructor
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  // For now, accept any non-empty input as successful local static auth
  if (username && password) {
    res.json({ success: true, token: 'mock-jwt-token-123', instructor: { name: 'John Doe', username } });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});
