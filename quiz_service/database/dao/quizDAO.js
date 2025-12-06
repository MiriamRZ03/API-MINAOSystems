const connection = require("../pool");

 const createQuiz = async (quiz) => {
    const dbConnection = await connection.getConnection();
    try {
        await dbConnection.beginTransaction();

        const [quizResult] = await dbConnection.execute(
            `INSERT INTO Quiz (title, description, numberQuestion, weighing, cursoId) 
             VALUES (?, ?, ?, ?, ?)`,
            [
                quiz.title,
                quiz.description ?? 'Añada una escripción',
                quiz.questions.length,
                quiz.weighing ?? 0,
                quiz.cursoId
            ]
        );

        const quizId = quizResult.insertId;

        for (const question of quiz.questions) {

            const [questionResult] = await dbConnection.execute(
                `INSERT INTO Question (quizId, questionText)
                 VALUES (?, ?)`,
                [quizId, question.text] 
            );

            const questionId = questionResult.insertId;

            for (const option of question.options) {

                await dbConnection.execute(
                    `INSERT INTO OptionAnswer (questionId, optionText, isCorrect)
                     VALUES (?, ?, ?)`,
                    [questionId, option.text, option.isCorrect ? 1 : 0] 
                );
            }
        }

        await dbConnection.commit();
        return { success: true, quizId };

    } catch (error) {
        await dbConnection.rollback();
        console.error("Quiz creating error:", error);
        throw error;
    } finally {
        dbConnection.release();
    }
};

module.exports = {createQuiz};