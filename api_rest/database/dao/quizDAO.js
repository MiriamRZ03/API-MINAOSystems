const pool = require('../pool');

const QuizDAO = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT q.*, cu.name AS cursoName
      FROM Quiz q
      JOIN Curso cu ON q.cursoId = cu.cursoId
    `);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Quiz WHERE quizId = ?', [id]);
    return rows[0] || null;
  },

  async create({ title, description, numberQuestion, weighing, cursoId, contentId }) {
    const [result] = await pool.query(`
      INSERT INTO Quiz (title, description, numberQuestion, weighing, cursoId, contentId)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [title, description, numberQuestion, weighing, cursoId, contentId]);
    return result.insertId;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM Quiz WHERE quizId = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = QuizDAO;
