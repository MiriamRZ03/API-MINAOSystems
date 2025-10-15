const StudentDAO = require('../database/dao/studentDAO');

/**
 * Controlador para gestión de estudiantes
 * CRUD básico: listar, consultar, actualizar, eliminar
 * Casos de uso asociados:
 *  - CU-08: Consultar información de estudiante
 *  - CU-09: Actualizar nivel educativo / promedio
 *  - CU-10: Eliminar estudiante
 */

exports.getAllStudents = async (req, res) => {
  try {
    const students = await StudentDAO.getAll();
    res.json(students);
  } catch (error) {
    console.error('❌ Error al obtener estudiantes:', error);
    res.status(500).json({ message: 'Error al obtener estudiantes' });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await StudentDAO.getById(id);
    if (!student) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json(student);
  } catch (error) {
    console.error('❌ Error al obtener estudiante:', error);
    res.status(500).json({ message: 'Error al obtener estudiante' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { levelId, average } = req.body;
    const updated = await StudentDAO.update(id, { levelId, average });
    if (!updated) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json({ message: 'Estudiante actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar estudiante:', error);
    res.status(500).json({ message: 'Error al actualizar estudiante' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await StudentDAO.delete(id);
    if (!deleted) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json({ message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar estudiante:', error);
    res.status(500).json({ message: 'Error al eliminar estudiante' });
  }
};
