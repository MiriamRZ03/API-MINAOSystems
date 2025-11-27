const {Router} = require ('express');
const router = Router();
const{createCurso, setCourseState} = require('../controller/courseController');

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Gestión de cursos
 */

/**
 * @swagger
 * /courses/createCourse:
 *   post:
 *     summary: Crear un curso
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/NewCourse'
 *     responses:
 *       201:
 *         description: Creación de curso exitoso
 *       400:
 *         description: Información ya registrada o no válida
 *       500:
 *         description: Error del servidor
 */
router.post('/createCourse', createCurso);

/**
 * @swagger
 * /courses/setCourseState:
 *   patch:
 *     summary: Update the state of a course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cursoId
 *               - state
 *             properties:
 *               cursoId:
 *                 type: integer
 *                 description: ID of the course
 *               state:
 *                 type: string
 *                 description: New state of the course ("Activo" or "Inactivo")
 *     responses:
 *       200:
 *         description: Course state updated successfully
 *       400:
 *         description: Missing courseId or state
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.patch('/setCourseState', setCourseState);


module.exports = router;