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
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Datos incompletos.' });
      }

      const existing = await UserDAO.findByEmail(email);
      if (existing) {
        return res.status(409).json({ message: 'El correo ya está registrado.' });
      }

      const userId = await UserDAO.createUser({ name, email, password, role });
      res.status(201).json({ message: 'Registro exitoso.', userId });
    } catch (error) {
      console.error('❌ Error en register:', error);
      res.status(500).json({ message: 'Error del servidor.' });
    }
  },

  // CU-02 Validar usuario
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
      const { email, password } = req.body;
      const user = await UserDAO.findByEmail(email);
      if (!user) return res.status(401).json({ message: 'Credenciales inválidas.' });
      if (!user.is_validated) return res.status(403).json({ message: 'Cuenta no validada.' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ message: 'Credenciales inválidas.' });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
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
      const userId = req.user.id; // vendrá del middleware JWT
      const { name, password } = req.body;
      await UserDAO.updateProfile(userId, { name, password });
      res.json({ message: 'Perfil actualizado.' });
    } catch (error) {
      console.error('❌ Error en updateProfile:', error);
      res.status(500).json({ message: 'Error del servidor.' });
    }
  }
};

module.exports = UserController;
