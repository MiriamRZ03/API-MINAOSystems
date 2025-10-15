// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// ✅ Mensajes dentro de un chat
router.get('/:chatId', messageController.getByChat);
router.post('/', messageController.send);

module.exports = router;
