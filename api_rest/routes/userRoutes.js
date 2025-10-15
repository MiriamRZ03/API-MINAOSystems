/**
 * Rutas de usuario
 * Casos de uso:
 *  - CU-01 Registrar usuario
 *  - CU-02 Validar usuario
 *  - CU-03 Iniciar sesión
 *  - CU-04 Editar perfil (protegido con JWT)
 */
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');

// Registro, validación y login
router.post('/register', UserController.register);
router.post('/validate', UserController.validate);
router.post('/login', UserController.login);

// Perfil protegido
router.put('/profile', authenticateJWT, UserController.updateProfile);

module.exports = router;
