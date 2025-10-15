// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// ✅ CRUD de chats de curso
router.get('/', chatController.getAll);
router.get('/:id', chatController.getById);
router.post('/', chatController.create);
router.delete('/:id', chatController.delete);

module.exports = router;
