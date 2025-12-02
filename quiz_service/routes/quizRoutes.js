const { Router } = require('express');
const router = Router();
const {
    deleteQuizController,
    submitQuizController,
    getQuizScoreController
} = require('../controller/quizController');

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Gestión de cuestionarios
 */

/**
 * @swagger
 * /quizzes/{quizId}:
 *   delete:
 *     summary: Eliminar un cuestionario
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cuestionario eliminado exitosamente
 *       404:
 *         description: Cuestionario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:quizId', deleteQuizController);

/**
 * @swagger
 * /quizzes/{quizId}/answers:
 *   post:
 *     summary: Contestar un cuestionario
 *     tags: [Quizzes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentUserId:
 *                 type: integer
 *                 description: ID del estudiante
 *               answers:
 *                 type: object
 *                 description: Respuestas del cuestionario
 *     responses:
 *       201:
 *         description: Respuestas enviadas exitosamente
 *       400:
 *         description: Información faltante o inválida
 *       500:
 *         description: Error del servidor
 */
router.post('/:quizId/answers', submitQuizController);

/**
 * @swagger
 * /quizzes/{quizId}/score:
 *   get:
 *     summary: Ver calificación de un cuestionario
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: studentUserId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Calificación obtenida exitosamente
 *       400:
 *         description: Información faltante
 *       404:
 *         description: Calificación no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:quizId/score', getQuizScoreController);

module.exports = router;
