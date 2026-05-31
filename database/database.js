import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('music.db');

export function initializeDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS music (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      instrument TEXT,
      imageUri TEXT
    );
  `);
}

export function addMusic(title, instrument, imageUri) {
  db.runSync(
    `
      INSERT INTO music
      (title, instrument, imageUri)
      VALUES (?, ?, ?)
    `,
    [title, instrument, imageUri]
  );
}

export function getMusic() {
  return db.getAllSync(
    'SELECT * FROM music ORDER BY title ASC'
  );
}