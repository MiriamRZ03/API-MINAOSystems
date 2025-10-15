const pool = require('../../database');

const ChatDAO = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT ch.*, cu.name AS cursoName, u.userName AS creator
      FROM Chat ch
      JOIN User u ON ch.createdBy = u.userId
      LEFT JOIN Curso cu ON ch.cursoId = cu.cursoId
      ORDER BY ch.createdAt DESC
    `);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Chat WHERE chatId = ?', [id]);
    return rows[0] || null;
  },

  async create({ titulo, cursoId, createdBy }) {
    const [result] = await pool.query(`
      INSERT INTO Chat (titulo, cursoId, createdBy)
      VALUES (?, ?, ?)
    `, [titulo, cursoId, createdBy]);
    return result.insertId;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM Chat WHERE chatId = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = ChatDAO;
