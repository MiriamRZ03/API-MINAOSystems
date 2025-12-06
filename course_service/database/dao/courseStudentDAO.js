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

const getStudentCountInCourse = async (cursoId) => {
    const dbConnection = await connection.getConnection();
    try {
        const [rows] = await dbConnection.execute(
            `SELECT COUNT(*) AS studentCount FROM Curso_Student WHERE cursoId = ?`,
            [cursoId]
        );
        return rows[0].studentCount; 
    } catch (err) {
        console.error("Error in getStudentCountInCourse DAO:", err);
        return 0;
    } finally {
        dbConnection.release();
    }
};
module.exports = { removeStudentFromCourse, getStudentCountInCourse };
