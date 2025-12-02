const { Router } = require('express');
const router = Router();
const { getStudent } = require('../controllers/studentController');
const { updateStudentProfileController } = require("../controllers/profileController");

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Gestión de estudiantes
 */

/**
 * @swagger
 * /students/{studentId}:
 *   get:
 *     summary: Obtener información de un estudiante por ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante
 *     responses:
 *       200:
 *         description: Información del estudiante obtenida correctamente
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:studentId', getStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Actualizar perfil del estudiante (nivel educativo, nombre, etc.)
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               educationalLevel:
 *                 type: string
 *                 example: "Licenciatura"
 *               fullName:
 *                 type: string
 *                 example: "Juan Pérez"
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', updateStudentProfileController);

module.exports = router;
