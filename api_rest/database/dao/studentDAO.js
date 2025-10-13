// dao/studentDAO.js
const pool = require('../config/database');

/**
 * DAO para gestión de estudiantes.
 * Relaciona User ↔ Student ↔ EducationLevel
 * El trigger after_user_insert se encarga de crear filas automáticamente.
 */
const StudentDAO = {

  // Obtener todos los estudiantes con su nivel académico
  async getAll() {
    const [rows] = await pool.query(`
      SELECT 
        u.userId,
        u.userName,
        u.paternalSurname,
        u.maternalSurname,
        u.email,
        e.levelName,
        s.average
      FROM Student s
      INNER JOIN User u ON s.studentId = u.userId
      INNER JOIN EducationLevel e ON s.levelId = e.levelId
      ORDER BY u.userName ASC
    `);
    return rows;
  },

  // Obtener un estudiante por ID
  async getById(id) {
    const [rows] = await pool.query(`
      SELECT 
        u.userId,
        u.userName,
        u.paternalSurname,
        u.maternalSurname,
        u.email,
        e.levelName,
        s.average
      FROM Student s
      INNER JOIN User u ON s.studentId = u.userId
      INNER JOIN EducationLevel e ON s.levelId = e.levelId
      WHERE s.studentId = ?
    `, [id]);
    return rows[0] || null;
  },

  // Actualizar nivel educativo o promedio
  async update(id, { levelId, average }) {
    const [result] = await pool.query(`
      UPDATE Student
      SET levelId = IFNULL(?, levelId),
          average = IFNULL(?, average)
      WHERE studentId = ?
    `, [levelId, average, id]);
    return result.affectedRows > 0;
  },

  // Eliminar estudiante (elimina también su User por ON DELETE CASCADE)
  async delete(id) {
    const [result] = await pool.query('DELETE FROM User WHERE userId = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = StudentDAO;
