// api_rest/routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

// Casos de uso base
router.post('/register', UserController.register);
router.post('/validate', UserController.validate);
router.post('/login', UserController.login);

// Ruta protegida (ejemplo de perfil)
router.put('/profile', authenticateJWT, UserController.updateProfile);

module.exports = router;
