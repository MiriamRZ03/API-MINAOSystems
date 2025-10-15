// api_rest/database/dao/userDAO.js
const pool = require('../pool');
const bcrypt = require('bcrypt');

const UserDAO = {
  // Crear nuevo usuario
  async createUser({
    userName,
    paternalSurname,
    maternalSurname,
    email,
    userPassword,
    userType
  }) {
    // Ya viene encriptada desde el controlador, pero mantenemos compatibilidad
    const hashed = userPassword || await bcrypt.hash(userPassword, 10);
    const [result] = await pool.query(
      `INSERT INTO User 
        (userName, paternalSurname, maternalSurname, email, userPassword, userType)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userName, paternalSurname, maternalSurname, email, hashed, userType]
    );
    return result.insertId;
  },

  // Buscar usuario por correo
  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
    return rows[0];
  },

  // Validar usuario (opcional)
  async validateUser(email) {
    // No existe campo "is_validated" en la BD MINAO
    // Puedes dejarlo como función vacía para compatibilidad futura
    return true;
  },

  // Actualizar perfil
  async updateProfile(userId, { userName, paternalSurname, maternalSurname, userPassword }) {
    const hashed = userPassword ? await bcrypt.hash(userPassword, 10) : null;

    // Construir consulta dinámica sin eliminar campos opcionales
    const fields = [];
    const values = [];

    if (userName) {
      fields.push('userName = ?');
      values.push(userName);
    }
    if (paternalSurname) {
      fields.push('paternalSurname = ?');
      values.push(paternalSurname);
    }
    if (maternalSurname) {
      fields.push('maternalSurname = ?');
      values.push(maternalSurname);
    }
    if (hashed) {
      fields.push('userPassword = ?');
      values.push(hashed);
    }

    if (fields.length === 0) return null; // nada que actualizar

    const query = `UPDATE User SET ${fields.join(', ')} WHERE userId = ?`;
    values.push(userId);

    const [result] = await pool.query(query, values);
    return result;
  }
};

module.exports = UserDAO;
