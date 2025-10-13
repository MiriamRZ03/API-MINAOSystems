// api_rest/database/dao/userDAO.js
const pool = require('../pool');
const bcrypt = require('bcrypt');

const UserDAO = {
  async createUser({ name, email, password, role }) {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role, is_validated) VALUES (?, ?, ?, ?, 0)',
      [name, email, hashed, role]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  async validateUser(email) {
    await pool.query('UPDATE users SET is_validated = 1 WHERE email = ?', [email]);
  },

  async updateProfile(id, { name, password }) {
    const hashed = password ? await bcrypt.hash(password, 10) : null;
    const query = hashed
      ? 'UPDATE users SET name = ?, password = ? WHERE id = ?'
      : 'UPDATE users SET name = ? WHERE id = ?';
    const values = hashed ? [name, hashed, id] : [name, id];
    const [result] = await pool.query(query, values);
    return result;
  }
};

module.exports = UserDAO;
