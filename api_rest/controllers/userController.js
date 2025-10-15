// api_rest/controllers/userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const UserDAO = require('../database/dao/userDAO');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

const UserController = {
  // CU-01 Registrar usuario
  async register(req, res) {
    try {
      const {
        userName,
        paternalSurname,
        maternalSurname,
        email,
        userPassword,
        userType
      } = req.body;

      // Validar datos requeridos
      if (!userName || !paternalSurname || !maternalSurname || !email || !userPassword || !userType) {
        return res.status(400).json({ message: 'Datos incompletos.' });
      }

      // Verificar existencia del correo
      const existing = await UserDAO.findByEmail(email);
      if (existing) {
        return res.status(409).json({ message: 'El correo ya está registrado.' });
      }

      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(userPassword, 10);

      // Crear usuario
      const userId = await UserDAO.createUser({
        userName,
        paternalSurname,
        maternalSurname,
        email,
        userPassword: hashedPassword,
        userType
      });

      res.status(201).json({ message: 'Registro exitoso.', userId });
    } catch (error) {
      console.error('❌ Error en register:', error);
      res.status(500).json({ message: 'Error del servidor.' });
    }
  },

  // CU-02 Validar usuario (opcional si usas confirmación por correo)
  async validate(req, res) {
    try {
      const { email } = req.body;
      const user = await UserDAO.findByEmail(email);
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

      await UserDAO.validateUser(email);
      res.json({ message: 'Usuario validado correctamente.' });
    } catch (error) {
      console.error('❌ Error en validate:', error);
      res.status(500).json({ message: 'Error del servidor.' });
    }
  },

  // CU-03 Iniciar sesión
  async login(req, res) {
    try {
      const { email, userPassword } = req.body;
      const user = await UserDAO.findByEmail(email);
      if (!user) return res.status(401).json({ message: 'Credenciales inválidas.' });

      const valid = await bcrypt.compare(userPassword, user.userPassword);
      if (!valid) return res.status(401).json({ message: 'Credenciales inválidas.' });

      const token = jwt.sign(
        {
          id: user.userId,
          email: user.email,
          userType: user.userType,
          name: `${user.userName} ${user.paternalSurname}`
        },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

      res.json({ message: 'Inicio de sesión exitoso.', token });
    } catch (error) {
      console.error('❌ Error en login:', error);
      res.status(500).json({ message: 'Error del servidor.' });
    }
  },

  // Editar perfil (requiere JWT)
  async updateProfile(req, res) {
    try {
      const userId = req.user.id; // viene del middleware JWT
      const {
        userName,
        paternalSurname,
        maternalSurname,
        userPassword
      } = req.body;

      const dataToUpdate = {};

      if (userName) dataToUpdate.userName = userName;
      if (paternalSurname) dataToUpdate.paternalSurname = paternalSurname;
      if (maternalSurname) dataToUpdate.maternalSurname = maternalSurname;
      if (userPassword) dataToUpdate.userPassword = await bcrypt.hash(userPassword, 10);

      await UserDAO.updateProfile(userId, dataToUpdate);
      res.json({ message: 'Perfil actualizado correctamente.' });
    } catch (error) {
      console.error('❌ Error en updateProfile:', error);
      res.status(500).json({ message: 'Error del servidor.' });
    }
  }
};

module.exports = UserController;
