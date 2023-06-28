const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "Database/person.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the person database.");
  }
);

// Perform table creation and initialization
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT,
    password TEXT,
    sessionToken TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS plantAbout(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    name TEXT,
    type TEXT,
    color TEXT,
    conditions TEXT,
    season TEXT,
    description TEXT
  )`);

  db.run(
    "CREATE TABLE IF NOT EXISTS collection ( id_plant INTEGER, id_user INTEGER, FOREIGN KEY(id_plant) REFERENCES plantAbout(id), FOREIGN KEY(id_user) REFERENCES users(id))"
  );
});

module.exports = db;
