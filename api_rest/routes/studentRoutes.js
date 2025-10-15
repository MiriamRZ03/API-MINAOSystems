/**
 * Rutas para gestión de estudiantes
 * Casos de uso:
 *  - CU-08 Consultar información de estudiante
 *  - CU-09 Actualizar nivel educativo / promedio
 *  - CU-10 Eliminar estudiante
 */
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authenticateJWT = require('../middleware/authenticateJWT');

// Listar todos los estudiantes
router.get('/', authenticateJWT, studentController.getAllStudents);

// Obtener estudiante por ID
router.get('/:id', authenticateJWT, studentController.getStudentById);

// Actualizar estudiante
router.put('/:id', authenticateJWT, studentController.updateStudent);

// Eliminar estudiante
router.delete('/:id', authenticateJWT, studentController.deleteStudent);

module.exports = router;
