// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar controladores y rutas
const { UserController } = require('./api_rest/controllers/userController.js');
const instructorRoutes = require('./api_rest/routes/instructorRoutes');
const studentRoutes = require('./api_rest/routes/studentRoutes');

// Rutas de usuario
app.use('/api/users/instructors', instructorRoutes);
app.use('/api/users/students', studentRoutes);

app.post('/api/users/register', UserController.register);
app.post('/api/users/validate', UserController.validate);
app.post('/api/users/login', UserController.login);
app.put('/api/users/profile', UserController.updateProfile);

// Puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
