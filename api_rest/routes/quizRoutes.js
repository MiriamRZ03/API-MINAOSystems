// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// ✅ CRUD de cuestionarios
router.get('/', quizController.getAll);
router.get('/:id', quizController.getById);
router.post('/', quizController.create);
router.delete('/:id', quizController.delete);

module.exports = router;
