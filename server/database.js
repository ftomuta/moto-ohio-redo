const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

const DB_PATH = path.resolve(__dirname, 'database.db');

async function getDb() {
  return open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });
}

const seedCourses = [
  {
    code: 'BRC',
    title: 'Basic RiderCourse (BRC)',
    level: 'Beginner',
    tag_color: 'tag-red',
    description: 'The starting point for every new rider. Combines a self-paced online eCourse with two days of hands-on range training. Upon completion, take your certificate to the BMV to skip the riding skills test.',
    duration: '2 days (range)',
    requirements: '16+ years old',
    price_range: '$50 – $150',
    icon: '🏍️'
  },
  {
    code: 'BRC2',
    title: 'Basic RiderCourse 2 (BRC2)',
    level: 'Beginner',
    tag_color: 'tag-red',
    description: 'A refresher / returning-rider course. No eCourse pre-work required. One range day that revisits foundational skills for riders returning after a long break.',
    duration: '1 day (range)',
    requirements: 'Valid license req.',
    price_range: '$50 – $100',
    icon: '🔁'
  },
  {
    code: 'ARC',
    title: 'Advanced RiderCourse (ARC)',
    level: 'Intermediate',
    tag_color: 'tag-gold',
    description: 'Take your skills to the next level with higher-speed exercises, precision braking, evasive swerving, and cornering. Bring your own street-legal bike.',
    duration: '1 day',
    requirements: 'Valid M-endorsement',
    price_range: '$75 – $125',
    icon: '⚡'
  },
  {
    code: '3WBRC',
    title: '3-Wheel Basic RiderCourse',
    level: '3-Wheel',
    tag_color: 'tag-navy',
    description: 'Specifically tailored for trikes, Can-Am Spyders, and sidecar rigs. Covers fundamentals, slow-speed maneuvers, and handling characteristics unique to 3-wheeled vehicles.',
    duration: '2 days',
    requirements: 'No experience needed',
    price_range: '$50 – $150',
    icon: '🛺'
  },
  {
    code: 'SSP',
    title: 'Street Skills Practice',
    level: 'Intermediate',
    tag_color: 'tag-gold',
    description: 'An on-road supplement to the ARC. Small-group coaching on public streets with an experienced coach following behind and providing audio feedback via radio.',
    duration: '4 hours',
    requirements: 'BRC or ARC grad',
    price_range: '$60 – $90',
    icon: '🛣️'
  },
  {
    code: 'DBS',
    title: 'Dirt Bike School (Youth)',
    level: 'Youth',
    tag_color: 'tag-navy',
    description: 'Ages 6–15. Introduces safe off-road riding habits, basic control skills, and protective gear usage in a structured, fun environment.',
    duration: '1 day',
    requirements: 'Ages 6–15',
    price_range: '$40 – $80',
    icon: '🏕️'
  }
];

async function initializeDb() {
  const db = await getDb();

  // Create Courses Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE,
      title TEXT,
      level TEXT,
      tag_color TEXT,
      description TEXT,
      duration TEXT,
      requirements TEXT,
      price_range TEXT,
      icon TEXT
    )
  `);

  // Create Messages Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      subject TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed Courses if empty
  const countRow = await db.get('SELECT COUNT(*) as count FROM courses');
  if (countRow.count === 0) {
    console.log('Seeding courses database...');
    const stmt = await db.prepare(
      'INSERT INTO courses (code, title, level, tag_color, description, duration, requirements, price_range, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    for (const course of seedCourses) {
      await stmt.run(course.code, course.title, course.level, course.tag_color, course.description, course.duration, course.requirements, course.price_range, course.icon);
    }
    await stmt.finalize();
    console.log('Database seeded successfully.');
  }

  return db;
}

module.exports = { getDb, initializeDb };
