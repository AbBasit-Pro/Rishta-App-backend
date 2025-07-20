const db = require('../config/db');

function saveUser(user, callback) {
  const query = 'INSERT INTO users (name, age, location, preferences, phone) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [user.name, user.age, user.location, user.preferences, user.phone], callback);
}

function getAllUsers(callback) {
  const query = 'SELECT * FROM users ORDER BY id DESC';
  db.query(query, callback);
}

module.exports = {
  saveUser,
  getAllUsers
};
