const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

// Read all
exports.getAllHouseboats = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM houseboats', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Create
exports.addHouseboat = (boat) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO houseboats (name, description, price) VALUES (?, ?, ?)',
      [boat.name, boat.description, boat.price],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
  });
};

// Update
exports.updateHouseboat = (id, boat) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE houseboats SET name = ?, description = ?, price = ? WHERE id = ?',
      [boat.name, boat.description, boat.price, id],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

// Delete
exports.deleteHouseboat = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM houseboats WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};
