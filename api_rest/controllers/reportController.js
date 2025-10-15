// controllers/reportController.js
const ReportDAO = require('../database/dao/reportDAO');

exports.getAll = async (req, res) => {
  try {
    const reports = await ReportDAO.getAll();
    res.json(reports);
  } catch (error) {
    console.error('❌ Error al obtener reportes:', error);
    res.status(500).json({ message: 'Error al obtener reportes' });
  }
};

exports.create = async (req, res) => {
  try {
    const id = await ReportDAO.create(req.body);
    res.status(201).json({ message: 'Reporte generado correctamente', id });
  } catch (error) {
    console.error('❌ Error al generar reporte:', error);
    res.status(500).json({ message: 'Error al generar reporte' });
  }
};
