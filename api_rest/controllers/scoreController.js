// controllers/scoreController.js
const ScoreDAO = require('../database/dao/scoreDAO');

exports.getAll = async (req, res) => {
  try {
    const scores = await ScoreDAO.getAll();
    res.json(scores);
  } catch (error) {
    console.error('❌ Error al obtener calificaciones:', error);
    res.status(500).json({ message: 'Error al obtener calificaciones' });
  }
};

exports.getByCourse = async (req, res) => {
  try {
    const scores = await ScoreDAO.getByCourse(req.params.cursoId);
    res.json(scores);
  } catch (error) {
    console.error('❌ Error al obtener calificaciones del curso:', error);
    res.status(500).json({ message: 'Error al obtener calificaciones del curso' });
  }
};

exports.setScore = async (req, res) => {
  try {
    const ok = await ScoreDAO.setScore(req.body);
    res.status(201).json({ message: 'Calificación registrada', ok });
  } catch (error) {
    console.error('❌ Error al asignar calificación:', error);
    res.status(500).json({ message: 'Error al asignar calificación' });
  }
};
