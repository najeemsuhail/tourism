const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

exports.getAllListings = () => {
  return new Promise((resolve, reject) => {
    const listingsSql = `SELECT * FROM listings`;
    db.all(listingsSql, [], (err, listings) => {
      if (err) return reject(err);

      const listIds = listings.map(l => l.id);
      if (listIds.length === 0) return resolve(listings);

      const placeholders = listIds.map(() => '?').join(',');
      const catSql = `
        SELECT listing_id, category_id FROM listing_categories
        WHERE listing_id IN (${placeholders})
      `;

      db.all(catSql, listIds, (err2, rows) => {
        if (err2) return reject(err2);

        const catMap = {};
        for (const row of rows) {
          if (!catMap[row.listing_id]) catMap[row.listing_id] = [];
          catMap[row.listing_id].push(row.category_id);
        }

        for (const listing of listings) {
          listing.categoryIds = catMap[listing.id] || [];
        }

        resolve(listings);
      });
    });
  });
};

exports.addListing = (listing, categoryIds = []) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `INSERT INTO listings (name, description, price, image) VALUES (?, ?, ?, ?)`,
        [listing.name, listing.description, listing.price, listing.image],
        function (err) {
          if (err) return reject(err);
          const listingId = this.lastID;

          if (categoryIds.length > 0) {
            const stmt = db.prepare(`INSERT INTO listing_categories (listing_id, category_id) VALUES (?, ?)`);
            for (const catId of categoryIds) {
              stmt.run(listingId, catId);
            }
            stmt.finalize();
          }

          resolve(listingId);
        }
      );
    });
  });
};

exports.updateListing = (id, listing, categoryIds = []) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `UPDATE listings SET name = ?, description = ?, price = ?, image = ? WHERE id = ?`,
        [listing.name, listing.description, listing.price, listing.image, id],
        function (err) {
          if (err) return reject(err);

          db.run(`DELETE FROM listing_categories WHERE listing_id = ?`, [id], (err2) => {
            if (err2) return reject(err2);

            if (categoryIds.length > 0) {
              const stmt = db.prepare(`INSERT INTO listing_categories (listing_id, category_id) VALUES (?, ?)`);
              for (const catId of categoryIds) {
                stmt.run(id, catId);
              }
              stmt.finalize();
            }

            resolve();
          });
        }
      );
    });
  });
};

exports.deleteListing = (id) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`DELETE FROM listing_categories WHERE listing_id = ?`, [id]);
      db.run(`DELETE FROM listings WHERE id = ?`, [id], function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  });
};

exports.getAllCategories = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM categories', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};


exports.getListingsByCategory = (category, subcategory = null) => {
  return new Promise((resolve, reject) => {
    const sqlWithSub = `
      SELECT DISTINCT l.*
      FROM listings l
      JOIN listing_categories lc ON l.id = lc.listing_id
      JOIN categories sub ON lc.category_id = sub.id
      JOIN categories parent ON sub.parent_id = parent.id
      WHERE parent.name = ? AND sub.name = ?
    `;
    const sqlTopOnly = `
      SELECT DISTINCT l.*
      FROM listings l
      JOIN listing_categories lc ON l.id = lc.listing_id
      JOIN categories c ON lc.category_id = c.id
      WHERE c.name = ? AND c.parent_id IS NULL
    `;

    const sql = subcategory ? sqlWithSub : sqlTopOnly;
    const params = subcategory ? [category, subcategory] : [category];

    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
