// routes/scoreRoutes.js
const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

// ✅ Calificaciones
router.get('/', scoreController.getAll);
router.get('/curso/:cursoId', scoreController.getByCourse);
router.post('/', scoreController.setScore);

module.exports = router;
