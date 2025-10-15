const pool = require('../../database');

const ContentDAO = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT c.*, cu.name AS cursoName
      FROM Content c
      JOIN Curso cu ON c.cursoId = cu.cursoId
    `);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Content WHERE contentId = ?', [id]);
    return rows[0] || null;
  },

  async create({ title, type, descripcion, cursoId }) {
    const [result] = await pool.query(`
      INSERT INTO Content (title, type, descripcion, cursoId)
      VALUES (?, ?, ?, ?)
    `, [title, type, descripcion, cursoId]);
    return result.insertId;
  },

  async update(id, { title, type, descripcion }) {
    const [result] = await pool.query(`
      UPDATE Content SET 
        title = IFNULL(?, title),
        type = IFNULL(?, type),
        descripcion = IFNULL(?, descripcion)
      WHERE contentId = ?
    `, [title, type, descripcion, id]);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM Content WHERE contentId = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = ContentDAO;
