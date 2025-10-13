// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authenticateJWT = require('../middleware/authenticateJWT'); // si ya lo tienes

router.get('/', authenticateJWT, studentController.getAllStudents);
router.get('/:id', authenticateJWT, studentController.getStudentById);
router.put('/:id', authenticateJWT, studentController.updateStudent);
router.delete('/:id', authenticateJWT, studentController.deleteStudent);

module.exports = router;
