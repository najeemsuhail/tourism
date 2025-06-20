const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS listing_categories`);
  db.run(`DROP TABLE IF EXISTS listings`);
  db.run(`DROP TABLE IF EXISTS categories`);

  // Create categories table with image column
  db.run(`
    CREATE TABLE categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      parent_id INTEGER,
      image TEXT,
      FOREIGN KEY (parent_id) REFERENCES categories(id)
    )
  `);

  // Create listings table
  db.run(`
    CREATE TABLE listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price TEXT,
      image TEXT
    )
  `);

  // Create join table
  db.run(`
    CREATE TABLE listing_categories (
      listing_id INTEGER,
      category_id INTEGER,
      PRIMARY KEY (listing_id, category_id),
      FOREIGN KEY (listing_id) REFERENCES listings(id),
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  // Insert categories with images
  db.run(`INSERT INTO categories (name, parent_id, image) VALUES ('Houseboat', NULL, 'houseboat.jpg')`);
  db.run(`INSERT INTO categories (name, parent_id, image) VALUES ('Shikara', NULL, 'shikara.jpg')`);
  db.run(`INSERT INTO categories (name, parent_id, image) VALUES ('Guest House', NULL, 'guesthouse.jpg')`);
  db.run(`INSERT INTO categories (name, parent_id, image) VALUES ('Taxi', NULL, 'taxi.jpg')`);
  db.run(`INSERT INTO categories (name, parent_id, image) VALUES ('Kayaking', NULL, 'kayaking.jpg')`);

  db.run(`INSERT INTO categories (name, parent_id, image) VALUES ('Luxury', 1, 'luxury.jpg')`);
  db.run(`INSERT INTO categories (name, parent_id, image) VALUES ('Deluxe', 1, 'deluxe.jpg')`);

// Insert listings
db.run(`INSERT INTO listings (name, description, price, image) 
        VALUES ('Royal Boat', 'Luxury Houseboat', '5000', 'royalboat.jpg')`);
db.run(`INSERT INTO listings (name, description, price, image) 
        VALUES ('Backwater Breeze', 'Deluxe and Luxury Boat', '3000', 'backwaterbreeze.jpg')`);
db.run(`INSERT INTO listings (name, description, price, image) 
        VALUES ('Sunset Paradise', 'Romantic sunset houseboat package', '4500', 'sunsetparadise.jpg')`);
db.run(`INSERT INTO listings (name, description, price, image) 
        VALUES ('Alleppey Queen', 'Premium family boat stay', '5200', 'alleppeyqueen.jpg')`);
db.run(`INSERT INTO listings (name, description, price, image) 
        VALUES ('Lagoon Dreams', 'Scenic ride through Vembanad lake', '4800', 'lagoondreams.jpg')`);
db.run(`INSERT INTO listings (name, description, price, image) 
        VALUES ('River Whisper', 'Quiet and relaxing trip', '3200', 'riverwhisper.jpg')`);
db.run(`INSERT INTO listings (name, description, price, image) 
        VALUES ('Golden Shikara', 'Luxury shikara experience', '2600', 'goldenshikara.jpg')`);
db.run(`INSERT INTO listings (name, description, price, image) 
        VALUES ('Coconut Bay Cruise', 'All-day cruise with meals', '5500', 'coconutbaycruise.jpg')`);
db.run(`INSERT INTO listings (name, description, price, image) 
        VALUES ('Backwater Bliss', 'Budget-friendly backwater cruise', '2800', 'backwaterbliss.jpg')`);

  // Associate listings with multiple categories
  db.run(`INSERT INTO listing_categories (listing_id, category_id) VALUES (1, 6)`); // Royal -> Luxury
  db.run(`INSERT INTO listing_categories (listing_id, category_id) VALUES (2, 6)`); // Backwater -> Luxury
  db.run(`INSERT INTO listing_categories (listing_id, category_id) VALUES (2, 7)`); // Backwater -> Deluxe
});


db.close();
