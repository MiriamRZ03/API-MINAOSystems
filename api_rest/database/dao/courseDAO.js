const pool = require('../pool');

const CourseDAO = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT c.*, u.userName AS instructorName
      FROM Curso c
      JOIN User u ON c.instructorId = u.userId
    `);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Curso WHERE cursoId = ?', [id]);
    return rows[0] || null;
  },

  async create({ name, description, category, startDate, endDate, state, instructorId }) {
    const [result] = await pool.query(`
      INSERT INTO Curso (name, description, category, startDate, endDate, state, instructorId)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [name, description, category, startDate, endDate, state, instructorId]);
    return result.insertId;
  },

  async update(id, { name, description, category, state }) {
    const [result] = await pool.query(`
      UPDATE Curso SET
        name = IFNULL(?, name),
        description = IFNULL(?, description),
        category = IFNULL(?, category),
        state = IFNULL(?, state)
      WHERE cursoId = ?
    `, [name, description, category, state, id]);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM Curso WHERE cursoId = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = CourseDAO;
