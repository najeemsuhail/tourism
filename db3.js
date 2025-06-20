const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS listing_images`);
  db.run(`
    CREATE TABLE listing_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      listing_id INTEGER,
      image_path TEXT NOT NULL,
      FOREIGN KEY (listing_id) REFERENCES listings(id)
    )
  `);

  // Add example images
  db.run(`INSERT INTO listing_images (listing_id, image_path) VALUES (1, 'royalboat1.jpg')`);
  db.run(`INSERT INTO listing_images (listing_id, image_path) VALUES (1, 'royalboat2.jpg')`);
  db.run(`INSERT INTO listing_images (listing_id, image_path) VALUES (2, 'backwaterbreeze1.jpg')`);
});

db.close();
