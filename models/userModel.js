const db = require('../config/db');

const saveUser = (data, callback) => {
  const sql = 'INSERT INTO users SET ?';
  db.query(sql, data, callback);
};

module.exports = { saveUser };
