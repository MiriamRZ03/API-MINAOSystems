const connection = require("../pool");

const getInstructorById = async (instructorId) => {
    const dbConnection = await connection.getConnection();
    try {
        const [rows] = await dbConnection.execute(
            `SELECT 
                u.userName, 
                u.paternalSurname, 
                u.maternalSurname, 
                i.biography, 
                t.titleName 
             FROM User u 
             INNER JOIN Instructor i 
                ON u.userId = i.instructorId
             INNER JOIN Title t 
                ON i.titleId = t.titleId 
             WHERE i.instructorId = ?`,
            [instructorId]
        );

        return rows;
    } catch (error) {
        console.error("Error retrieving instructor data", error);
        throw error;
    } finally {
        dbConnection.release();
    }
};

/**
 * Actualización parcial:
 * solo se actualizan los campos enviados.
 */
const updateInstructorProfile = async (instructorId, fields) => {
    const dbConnection = await connection.getConnection();

    try {
        const updates = [];
        const values = [];

        if (fields.titleId) {
            updates.push("titleId = ?");
            values.push(fields.titleId);
        }
        if (fields.biography !== undefined) {
            updates.push("biography = ?");
            values.push(fields.biography);
        }

        if (updates.length === 0) return { affectedRows: 0 };

        const sql = `
            UPDATE Instructor
            SET ${updates.join(", ")}
            WHERE instructorId = ?
        `;

        values.push(instructorId);

        const [result] = await dbConnection.execute(sql, values);
        return result;

    } catch (error) {
        console.error("Error updating instructor data", error);
        throw error;
    } finally {
        dbConnection.release();
    }
};

module.exports = { 
    getInstructorById, 
    updateInstructorProfile 
};
