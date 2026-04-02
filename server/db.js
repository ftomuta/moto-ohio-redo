import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';

export async function openDb() {
  return open({
    filename: './moto-ohio.db',
    driver: sqlite3.Database,
  });
}

export async function initDb() {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS instructors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT,
      location TEXT,
      bio TEXT,
      avatar TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      url TEXT,
      type TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'instructor',
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  const courseCount = await db.get('SELECT COUNT(*) AS count FROM courses');
  if (!courseCount || courseCount.count === 0) {
    const courseSeed = [
      { title: 'Beginner Rider Training', description: 'Learn the basics of motorcycle control.' },
      { title: 'Advanced Safety Tactics', description: 'Master defensive riding techniques for Ohio roads.' },
      { title: 'Group Riding and Maintenance', description: 'Ride with confidence and keep your bike running.' },
    ];
    const stmt = await db.prepare('INSERT INTO courses (title, description) VALUES (?, ?)');
    for (const course of courseSeed) {
      await stmt.run(course.title, course.description);
    }
    await stmt.finalize();
  }

  const instructorCount = await db.get('SELECT COUNT(*) AS count FROM instructors');
  if (!instructorCount || instructorCount.count === 0) {
    const instructorSeed = [
      { name: 'Mike Torres', title: 'BRC / ARC Instructor', location: 'Central OH', bio: '15 years teaching, former MSF Trainer', avatar: '👨‍🦱' },
      { name: 'Sandra Okafor', title: 'BRC / 3-Wheel Instructor', location: 'NE OH', bio: 'Adaptive instruction specialist', avatar: '👩‍🦳' },
      { name: 'James "JD" Decker', title: 'ARC Instructor', location: 'SW OH', bio: '20+ years of riding and mentoring', avatar: '👨‍🦲' },
    ];
    const stmt = await db.prepare('INSERT INTO instructors (name, title, location, bio, avatar) VALUES (?, ?, ?, ?, ?)');
    for (const ins of instructorSeed) {
      await stmt.run(ins.name, ins.title, ins.location, ins.bio, ins.avatar);
    }
    await stmt.finalize();
  }

  const resourceCount = await db.get('SELECT COUNT(*) AS count FROM resources');
  if (!resourceCount || resourceCount.count === 0) {
    const resourceSeed = [
      { title: 'Instructor Candidate Application', description: 'Required for all new candidates.', url: '#', type: 'form' },
      { title: 'Course Completion Roster', description: 'Submit within 48 hours of course end.', url: '#', type: 'form' },
      { title: 'Annual Recertification Form', description: 'Due Dec 31 each year.', url: '#', type: 'form' },
      { title: 'Incident / Injury Report', description: 'Submit after any on-range incident.', url: '#', type: 'report' },
    ];
    const stmt = await db.prepare('INSERT INTO resources (title, description, url, type) VALUES (?, ?, ?, ?)');
    for (const res of resourceSeed) {
      await stmt.run(res.title, res.description, res.url, res.type);
    }
    await stmt.finalize();
  }

  const userCount = await db.get('SELECT COUNT(*) AS count FROM users');
  if (!userCount || userCount.count === 0) {
    const hashedPassword = await bcrypt.hash('test1234', 10);
    await db.run('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', 'Demo Instructor', 'instructor@localhost', hashedPassword, 'instructor');
  }

  return db;
}

