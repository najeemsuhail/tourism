const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

exports.getAllCategories = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM categories', [], (err, rows) => {
      if (err) return reject(err);

      const parentCategories = rows.filter(cat => !cat.parent_id);
      const subcategories = rows.filter(cat => cat.parent_id);

      const result = parentCategories.map(parent => {
        return {
          ...parent,
          subcategories: subcategories.filter(sub => sub.parent_id === parent.id)
        };
      });

      resolve(result);
    });
  });
};
