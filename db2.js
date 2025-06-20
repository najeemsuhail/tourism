const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS listing_attributes`);
  db.run(`DROP TABLE IF EXISTS attributes`);

  // Create attributes table with image support
  db.run(`
    CREATE TABLE attributes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image TEXT
    )
  `);

  db.run(`
    CREATE TABLE listing_attributes (
      listing_id INTEGER,
      attribute_id INTEGER,
      PRIMARY KEY (listing_id, attribute_id),
      FOREIGN KEY (listing_id) REFERENCES listings(id),
      FOREIGN KEY (attribute_id) REFERENCES attributes(id)
    )
  `);

  const attributes = [
    { name: 'WiFi', image: 'wifi.png' },
    { name: 'Air Conditioning', image: 'ac.png' },
    { name: 'Breakfast Included', image: 'breakfast.png' },
    { name: 'Private Bathroom', image: 'bathroom.png' },
    { name: 'Television', image: 'tv.png' },
    { name: 'Hot Water', image: 'hotwater.png' },
    { name: 'Lake View', image: 'lakeview.png' },
    { name: '24/7 Service', image: 'service.png' }
  ];

  const stmt = db.prepare(`INSERT INTO attributes (name, image) VALUES (?, ?)`);
  for (const a of attributes) {
    stmt.run(a.name, a.image);
  }
  stmt.finalize();

  db.run(`INSERT INTO listing_attributes (listing_id, attribute_id) VALUES (1, 1)`); // Royal Boat -> WiFi
  db.run(`INSERT INTO listing_attributes (listing_id, attribute_id) VALUES (1, 2)`); // Royal Boat -> AC
  db.run(`INSERT INTO listing_attributes (listing_id, attribute_id) VALUES (2, 3)`); // Backwater Breeze -> Breakfast
});

db.close();
