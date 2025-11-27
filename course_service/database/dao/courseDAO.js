const connection = require("../pool");

const createCourse = async (course) => {
    const dbConnection = await connection.getConnection();
    try{
        await dbConnection.beginTransaction();
        const [courseResult] = await dbConnection.execute(
            `INSERT INTO Curso (name, description, category, startDate, endDate, state, instructorUserId) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [course.name, course.description, course.category, course.startDate, course.endDate, course.state, course.instructorUserId]
        );

        const cursoId = courseResult.insertId;

        await dbConnection.commit();

        return { success: true, cursoId };

    }catch(error){
        await dbConnection.rollback();
        console.error("Course creating error:", error);
        throw error;
    }
}

const updateCourseState = async (cursoId, newState) => {
    const dbConnection = await connection.getConnection();
    try {
        await dbConnection.beginTransaction();

        const validStates = ["Activo", "Inactivo"];
        const state = validStates.includes(newState) ? newState : "Activo";

        const [result] = await dbConnection.execute(
            `UPDATE Curso SET state = ? WHERE cursoId = ?`,
            [state, cursoId]
        );

        await dbConnection.commit();
        return result;
    } catch (error) {
        await dbConnection.rollback();
        console.error("Error updating course state:", error);
        throw error;
    } finally {
        dbConnection.release();
    }
};

module.exports = {createCourse, updateCourseState}