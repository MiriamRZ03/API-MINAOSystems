const pool = require('../pool');

const MessageDAO = {
  async getByChat(chatId) {
    const [rows] = await pool.query(`
      SELECT m.*, u.userName
      FROM Message m
      JOIN User u ON m.userId = u.userId
      WHERE m.chatId = ?
      ORDER BY m.dateSent ASC
    `, [chatId]);
    return rows;
  },

  async send({ chatId, userId, content }) {
    const [result] = await pool.query(`
      INSERT INTO Message (chatId, userId, content)
      VALUES (?, ?, ?)
    `, [chatId, userId, content]);
    return result.insertId;
  }
};

module.exports = MessageDAO;
