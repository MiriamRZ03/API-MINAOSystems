const connection = require("../pool");

// CU-12: Eliminar cuestionario
const deleteQuiz = async (quizId) => {
    const dbConnection = await connection.getConnection();
    try {
        const [result] = await dbConnection.execute(
            `DELETE FROM Quiz WHERE quizId = ?`,
            [quizId]
        );
        return result;
    } catch (error) {
        console.error("Error deleting quiz:", error);
        throw error;
    } finally {
        dbConnection.release();
    }
};

// CU-13: Contestar cuestionario
const submitQuizAnswers = async (quizId, studentUserId, answers) => {
    const dbConnection = await connection.getConnection();
    try {
        // Aquí asumimos que 'answers' es un objeto con preguntas y respuestas.
        // Guardamos las respuestas del estudiante
        const query = `INSERT INTO Report (cursoId, studentUserId, type, data) VALUES (?, ?, ?, ?)`;
        const [result] = await dbConnection.execute(query, [
            quizId, studentUserId, "Por estudiante", JSON.stringify(answers)
        ]);
        return result;
    } catch (error) {
        console.error("Error submitting quiz answers:", error);
        throw error;
    } finally {
        dbConnection.release();
    }
};

// CU-14: Ver calificación
const getQuizScore = async (quizId, studentUserId) => {
    const dbConnection = await connection.getConnection();
    try {
        const query = `
            SELECT score
            FROM Score
            WHERE cursoId = ? AND studentUserId = ? AND quizId = ?
        `;
        const [rows] = await dbConnection.execute(query, [
            quizId, studentUserId
        ]);
        return rows[0];
    } catch (error) {
        console.error("Error fetching quiz score:", error);
        throw error;
    } finally {
        dbConnection.release();
    }
};

module.exports = {
    deleteQuiz,
    submitQuizAnswers,
    getQuizScore
};
