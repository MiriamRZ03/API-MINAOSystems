// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// ✅ Reportes
router.get('/', reportController.getAll);
router.post('/', reportController.create);

module.exports = router;
