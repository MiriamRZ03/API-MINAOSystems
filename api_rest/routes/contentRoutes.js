// routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// ✅ CRUD de contenidos
router.get('/', contentController.getAll);
router.get('/:id', contentController.getById);
router.post('/', contentController.create);
router.put('/:id', contentController.update);
router.delete('/:id', contentController.delete);

module.exports = router;
