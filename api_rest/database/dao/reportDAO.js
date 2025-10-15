const pool = require('../pool');

const ReportDAO = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT r.*, cu.name AS cursoName
      FROM Report r
      JOIN Curso cu ON r.cursoId = cu.cursoId
      ORDER BY r.createdAt DESC
    `);
    return rows;
  },

  async create({ cursoId, studentId, type, data }) {
    const [result] = await pool.query(`
      INSERT INTO Report (cursoId, studentId, type, data)
      VALUES (?, ?, ?, ?)
    `, [cursoId, studentId, type, JSON.stringify(data)]);
    return result.insertId;
  }
};

module.exports = ReportDAO;
