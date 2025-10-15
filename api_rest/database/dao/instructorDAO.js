const pool = require('../pool');

/**
 * DAO para gestión de instructores.
 * Relaciona User ↔ Instructor ↔ Title
 * El trigger after_user_insert se encarga de crear filas automáticamente.
 */
const InstructorDAO = {

  // Obtener todos los instructores con su información general
  async getAll() {
    try {
      const [rows] = await pool.query(`
        SELECT 
          u.userId,
          u.userName,
          u.paternalSurname,
          u.maternalSurname,
          u.email,
          i.biography,
          t.titleName
        FROM Instructor i
        INNER JOIN User u ON i.instructorId = u.userId
        LEFT JOIN Title t ON i.titleId = t.titleId
        ORDER BY u.userName ASC
      `);
      return rows;
    } catch (error) {
      console.error('❌ Error en InstructorDAO.getAll:', error);
      throw error;
    }
  },

  // Obtener un instructor por ID
  async getById(id) {
    try {
      const [rows] = await pool.query(`
        SELECT 
          u.userId,
          u.userName,
          u.paternalSurname,
          u.maternalSurname,
          u.email,
          i.biography,
          t.titleName
        FROM Instructor i
        INNER JOIN User u ON i.instructorId = u.userId
        LEFT JOIN Title t ON i.titleId = t.titleId
        WHERE i.instructorId = ?
      `, [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('❌ Error en InstructorDAO.getById:', error);
      throw error;
    }
  },

  // Actualizar biografía o título
  async update(id, { biography, titleId }) {
    try {
      const [result] = await pool.query(`
        UPDATE Instructor
        SET biography = IFNULL(?, biography),
            titleId = IFNULL(?, titleId)
        WHERE instructorId = ?
      `, [biography, titleId, id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('❌ Error en InstructorDAO.update:', error);
      throw error;
    }
  },

  // Eliminar instructor (elimina también su User por ON DELETE CASCADE)
  async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM User WHERE userId = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('❌ Error en InstructorDAO.delete:', error);
      throw error;
    }
  }
};

module.exports = InstructorDAO;
