/**
 * Rutas para gestión de instructores
 * Casos de uso:
 *  - CU-05 Consultar información de instructor
 *  - CU-06 Actualizar perfil de instructor
 *  - CU-07 Eliminar instructor
 */
const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');
const authenticateJWT = require('../middleware/authenticateJWT');

// Listar todos los instructores
router.get('/', authenticateJWT, instructorController.getAllInstructors);

// Obtener instructor por ID
router.get('/:id', authenticateJWT, instructorController.getInstructorById);

// Actualizar instructor
router.put('/:id', authenticateJWT, instructorController.updateInstructor);

// Eliminar instructor
router.delete('/:id', authenticateJWT, instructorController.deleteInstructor);

module.exports = router;
