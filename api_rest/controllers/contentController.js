// controllers/contentController.js
const ContentDAO = require('../database/dao/contentDAO');

exports.getAll = async (req, res) => {
  try {
    const content = await ContentDAO.getAll();
    res.json(content);
  } catch (error) {
    console.error('❌ Error al obtener contenidos:', error);
    res.status(500).json({ message: 'Error al obtener contenidos' });
  }
};

exports.getById = async (req, res) => {
  try {
    const content = await ContentDAO.getById(req.params.id);
    if (!content) return res.status(404).json({ message: 'Contenido no encontrado' });
    res.json(content);
  } catch (error) {
    console.error('❌ Error al obtener contenido:', error);
    res.status(500).json({ message: 'Error al obtener contenido' });
  }
};

exports.create = async (req, res) => {
  try {
    const id = await ContentDAO.create(req.body);
    res.status(201).json({ message: 'Contenido creado correctamente', id });
  } catch (error) {
    console.error('❌ Error al crear contenido:', error);
    res.status(500).json({ message: 'Error al crear contenido' });
  }
};

exports.update = async (req, res) => {
  try {
    const ok = await ContentDAO.update(req.params.id, req.body);
    if (!ok) return res.status(404).json({ message: 'Contenido no encontrado' });
    res.json({ message: 'Contenido actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar contenido:', error);
    res.status(500).json({ message: 'Error al actualizar contenido' });
  }
};

exports.delete = async (req, res) => {
  try {
    const ok = await ContentDAO.delete(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Contenido no encontrado' });
    res.json({ message: 'Contenido eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar contenido:', error);
    res.status(500).json({ message: 'Error al eliminar contenido' });
  }
};
