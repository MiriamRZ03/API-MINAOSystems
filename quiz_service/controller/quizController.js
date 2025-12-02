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
            details: "quizId is required"
        });
    }

    try {
        const result = await deleteQuiz(quizId);
        if (result.affectedRows === 0) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                error: true,
                statusCode: HttpStatusCodes.NOT_FOUND,
                details: "Quiz not found"
            });
        }
        return res.status(HttpStatusCodes.OK).json({
            message: "Quiz deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            details: "Error deleting quiz"
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
            details: "quizId, studentUserId, and answers are required"
        });
    }

    try {
        const result = await submitQuizAnswers(quizId, studentUserId, answers);
        return res.status(HttpStatusCodes.CREATED).json({
            message: "Quiz answers submitted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            details: "Error submitting quiz answers"
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
            details: "quizId and studentUserId are required"
        });
    }

    try {
        const result = await getQuizScore(quizId, studentUserId);
        if (!result) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                error: true,
                statusCode: HttpStatusCodes.NOT_FOUND,
                details: "Score not found"
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
            details: "Error fetching quiz score"
        });
    }
};

module.exports = {
    deleteQuizController,
    submitQuizController,
    getQuizScoreController
};
