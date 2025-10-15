const pool = require('../pool');

/**
 * DAO para gestión de estudiantes.
 * Relaciona User ↔ Student ↔ EducationLevel
 * El trigger after_user_insert se encarga de crear filas automáticamente.
 */
const StudentDAO = {

  // Obtener todos los estudiantes con su nivel académico
  async getAll() {
    try {
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
    } catch (error) {
      console.error('❌ Error en StudentDAO.getAll:', error);
      throw error;
    }
  },

  // Obtener un estudiante por ID
  async getById(id) {
    try {
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
    } catch (error) {
      console.error('❌ Error en StudentDAO.getById:', error);
      throw error;
    }
  },

  // Actualizar nivel educativo o promedio
  async update(id, { levelId, average }) {
    try {
      const [result] = await pool.query(`
        UPDATE Student
        SET levelId = IFNULL(?, levelId),
            average = IFNULL(?, average)
        WHERE studentId = ?
      `, [levelId, average, id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('❌ Error en StudentDAO.update:', error);
      throw error;
    }
  },

  // Eliminar estudiante (elimina también su User por ON DELETE CASCADE)
  async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM User WHERE userId = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('❌ Error en StudentDAO.delete:', error);
      throw error;
    }
  }
};

module.exports = StudentDAO;
