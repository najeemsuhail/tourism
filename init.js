const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS houseboats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      price TEXT
    )
  `);

  db.run(`DELETE FROM houseboats`);
  db.run(`INSERT INTO houseboats (name, description, price)
          VALUES ('Royal Boat', 'Luxury Houseboat', '₹5000'),
                 ('Backwater Breeze', 'Budget houseboat', '₹3000')`);
});

db.close();
