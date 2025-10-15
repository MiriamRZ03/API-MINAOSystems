// controllers/chatController.js
const ChatDAO = require('../database/dao/chatDAO');

exports.getAll = async (req, res) => {
  try {
    const chats = await ChatDAO.getAll();
    res.json(chats);
  } catch (error) {
    console.error('❌ Error al obtener chats:', error);
    res.status(500).json({ message: 'Error al obtener chats' });
  }
};

exports.getById = async (req, res) => {
  try {
    const chat = await ChatDAO.getById(req.params.id);
    if (!chat) return res.status(404).json({ message: 'Chat no encontrado' });
    res.json(chat);
  } catch (error) {
    console.error('❌ Error al obtener chat:', error);
    res.status(500).json({ message: 'Error al obtener chat' });
  }
};

exports.create = async (req, res) => {
  try {
    const id = await ChatDAO.create(req.body);
    res.status(201).json({ message: 'Chat creado correctamente', id });
  } catch (error) {
    console.error('❌ Error al crear chat:', error);
    res.status(500).json({ message: 'Error al crear chat' });
  }
};

exports.delete = async (req, res) => {
  try {
    const ok = await ChatDAO.delete(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Chat no encontrado' });
    res.json({ message: 'Chat eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar chat:', error);
    res.status(500).json({ message: 'Error al eliminar chat' });
  }
};
