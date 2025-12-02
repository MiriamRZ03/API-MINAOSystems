const connection = require("../pool");

const removeStudentFromCourse = async (cursoId, studentId) => {
    const dbConnection = await connection.getConnection();
    try {
        const [result] = await dbConnection.execute(
            `DELETE FROM Curso_Student 
             WHERE cursoId = ? AND studentId = ?`,
            [cursoId, studentId]
        );

        return result;
    } catch (error) {
        console.error("Error removing student from course:", error);
        throw error;
    } finally {
        dbConnection.release();
    }
};

module.exports = { removeStudentFromCourse };
