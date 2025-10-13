// controllers/instructorController.js
const instructorDAO = require('../database/dao/instructorDAO');


/**
 * Controlador para gestionar instructores
 * CRUD básico: listar, consultar, actualizar, eliminar
 */

exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await InstructorDAO.getAll();
    res.json(instructors);
  } catch (error) {
    console.error('❌ Error al obtener instructores:', error);
    res.status(500).json({ message: 'Error al obtener instructores' });
  }
};

exports.getInstructorById = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await InstructorDAO.getById(id);
    if (!instructor) return res.status(404).json({ message: 'Instructor no encontrado' });
    res.json(instructor);
  } catch (error) {
    console.error('❌ Error al obtener instructor:', error);
    res.status(500).json({ message: 'Error al obtener instructor' });
  }
};

exports.updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { biography, titleId } = req.body;
    const updated = await InstructorDAO.update(id, { biography, titleId });
    if (!updated) return res.status(404).json({ message: 'Instructor no encontrado' });
    res.json({ message: 'Instructor actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar instructor:', error);
    res.status(500).json({ message: 'Error al actualizar instructor' });
  }
};

exports.deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await InstructorDAO.delete(id);
    if (!deleted) return res.status(404).json({ message: 'Instructor no encontrado' });
    res.json({ message: 'Instructor eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar instructor:', error);
    res.status(500).json({ message: 'Error al eliminar instructor' });
  }
};
