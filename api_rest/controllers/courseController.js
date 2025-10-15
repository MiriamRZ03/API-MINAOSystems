// controllers/courseController.js
const CourseDAO = require('../database/dao/courseDAO');

exports.getAll = async (req, res) => {
  try {
    const courses = await CourseDAO.getAll();
    res.json(courses);
  } catch (error) {
    console.error('❌ Error al obtener cursos:', error);
    res.status(500).json({ message: 'Error al obtener cursos' });
  }
};

exports.getById = async (req, res) => {
  try {
    const course = await CourseDAO.getById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });
    res.json(course);
  } catch (error) {
    console.error('❌ Error al obtener curso:', error);
    res.status(500).json({ message: 'Error al obtener curso' });
  }
};

exports.create = async (req, res) => {
  try {
    const id = await CourseDAO.create(req.body);
    res.status(201).json({ message: 'Curso creado correctamente', id });
  } catch (error) {
    console.error('❌ Error al crear curso:', error);
    res.status(500).json({ message: 'Error al crear curso' });
  }
};

exports.update = async (req, res) => {
  try {
    const ok = await CourseDAO.update(req.params.id, req.body);
    if (!ok) return res.status(404).json({ message: 'Curso no encontrado' });
    res.json({ message: 'Curso actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar curso:', error);
    res.status(500).json({ message: 'Error al actualizar curso' });
  }
};

exports.delete = async (req, res) => {
  try {
    const ok = await CourseDAO.delete(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Curso no encontrado' });
    res.json({ message: 'Curso eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar curso:', error);
    res.status(500).json({ message: 'Error al eliminar curso' });
  }
};
