const { response } = require("express");
const { deleteQuiz, submitQuizAnswers, getQuizScore } = require("../database/dao/quizDAO");
const HttpStatusCodes = require('../utils/enums');

// CU-12: Eliminar cuestionario
const deleteQuizController = async (req, res = response) => {
    const { quizId } = req.params;

    if (!quizId) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            statusCode: HttpStatusCodes.BAD_REQUEST,
            details: "El id es requerido"
        });
    }

    try {
        const result = await deleteQuiz(quizId);
        if (result.affectedRows === 0) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                error: true,
                statusCode: HttpStatusCodes.NOT_FOUND,
                details: "No encontramos el cuestionario"
            });
        }
        return res.status(HttpStatusCodes.OK).json({
            message: "Se eliminó el cuestionario"
        });
    } catch (error) {
        console.error(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            details: "Error al eliminar"
        });
    }
};

// CU-13: Contestar cuestionario
const submitQuizController = async (req, res = response) => {
    const { quizId } = req.params;
    const { studentUserId, answers } = req.body;  // Respuestas del estudiante

    if (!quizId || !studentUserId || !answers) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            statusCode: HttpStatusCodes.BAD_REQUEST,
            details: "Se requieren las respuestas"
        });
    }

    try {
        const result = await submitQuizAnswers(quizId, studentUserId, answers);
        return res.status(HttpStatusCodes.CREATED).json({
            message: "Las respuestas fueron enviadas"
        });
    } catch (error) {
        console.error(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            details: "Error al enviar las respuestas"
        });
    }
};

// CU-14: Ver calificación
const getQuizScoreController = async (req, res = response) => {
    const { quizId } = req.params;
    const { studentUserId } = req.query;  // Calificación del estudiante

    if (!quizId || !studentUserId) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            statusCode: HttpStatusCodes.BAD_REQUEST,
            details: "Error al obtener la calificación"
        });
    }

    try {
        const result = await getQuizScore(quizId, studentUserId);
        if (!result) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                error: true,
                statusCode: HttpStatusCodes.NOT_FOUND,
                details: "Calificación no encontrada"
            });
        }
        return res.status(HttpStatusCodes.OK).json({
            score: result.score
        });
    } catch (error) {
        console.error(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            details: "Error obteniendo la calificación"
        });
    }
};

module.exports = {
    deleteQuizController,
    submitQuizController,
    getQuizScoreController
};
