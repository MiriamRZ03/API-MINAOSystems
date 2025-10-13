// routes/instructorRoutes.js
const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');
const authenticateJWT = require('../middleware/authenticateJWT'); // si ya lo tienes

// Rutas protegidas por JWT (puedes descomentar si ya implementaste auth)
router.get('/', authenticateJWT, instructorController.getAllInstructors);
router.get('/:id', authenticateJWT, instructorController.getInstructorById);
router.put('/:id', authenticateJWT, instructorController.updateInstructor);
router.delete('/:id', authenticateJWT, instructorController.deleteInstructor);

module.exports = router;
