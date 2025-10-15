// controllers/quizController.js
const QuizDAO = require('../database/dao/quizDAO');

exports.getAll = async (req, res) => {
  try {
    const quizzes = await QuizDAO.getAll();
    res.json(quizzes);
  } catch (error) {
    console.error('❌ Error al obtener cuestionarios:', error);
    res.status(500).json({ message: 'Error al obtener cuestionarios' });
  }
};

exports.getById = async (req, res) => {
  try {
    const quiz = await QuizDAO.getById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Cuestionario no encontrado' });
    res.json(quiz);
  } catch (error) {
    console.error('❌ Error al obtener cuestionario:', error);
    res.status(500).json({ message: 'Error al obtener cuestionario' });
  }
};

exports.create = async (req, res) => {
  try {
    const id = await QuizDAO.create(req.body);
    res.status(201).json({ message: 'Cuestionario creado correctamente', id });
  } catch (error) {
    console.error('❌ Error al crear cuestionario:', error);
    res.status(500).json({ message: 'Error al crear cuestionario' });
  }
};

exports.delete = async (req, res) => {
  try {
    const ok = await QuizDAO.delete(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Cuestionario no encontrado' });
    res.json({ message: 'Cuestionario eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar cuestionario:', error);
    res.status(500).json({ message: 'Error al eliminar cuestionario' });
  }
};
