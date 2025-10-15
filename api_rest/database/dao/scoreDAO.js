const pool = require('../pool');

const ScoreDAO = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT s.*, u.userName, cu.name AS cursoName
      FROM Score s
      JOIN Student st ON s.studentId = st.studentId
      JOIN User u ON st.studentId = u.userId
      JOIN Curso cu ON s.cursoId = cu.cursoId
    `);
    return rows;
  },

  async getByCourse(cursoId) {
    const [rows] = await pool.query('SELECT * FROM Score WHERE cursoId = ?', [cursoId]);
    return rows;
  },

  async setScore({ cursoId, studentId, score }) {
    const [result] = await pool.query(`
      INSERT INTO Score (cursoId, studentId, score)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE score = VALUES(score)
    `, [cursoId, studentId, score]);
    return result.affectedRows > 0;
  }
};

module.exports = ScoreDAO;
