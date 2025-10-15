// controllers/messageController.js
const MessageDAO = require('../database/dao/messageDAO');

exports.getByChat = async (req, res) => {
  try {
    const messages = await MessageDAO.getByChat(req.params.chatId);
    res.json(messages);
  } catch (error) {
    console.error('❌ Error al obtener mensajes:', error);
    res.status(500).json({ message: 'Error al obtener mensajes' });
  }
};

exports.send = async (req, res) => {
  try {
    const id = await MessageDAO.send(req.body);
    res.status(201).json({ message: 'Mensaje enviado correctamente', id });
  } catch (error) {
    console.error('❌ Error al enviar mensaje:', error);
    res.status(500).json({ message: 'Error al enviar mensaje' });
  }
};
