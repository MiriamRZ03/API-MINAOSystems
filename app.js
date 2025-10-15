// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// === Middlewares ===
app.use(cors());
app.use(express.json());

// === Controladores de usuario ===
const UserController = require('./api_rest/controllers/userController.js');


// === Rutas de usuarios ===
const instructorRoutes = require('./api_rest/routes/instructorRoutes');
const studentRoutes = require('./api_rest/routes/studentRoutes');

// === Rutas académicas (MINAO) ===
const courseRoutes = require('./api_rest/routes/courseRoutes');
const contentRoutes = require('./api_rest/routes/contentRoutes');
const quizRoutes = require('./api_rest/routes/quizRoutes');
const chatRoutes = require('./api_rest/routes/chatRoutes');
const messageRoutes = require('./api_rest/routes/messageRoutes');
const scoreRoutes = require('./api_rest/routes/scoreRoutes');
const reportRoutes = require('./api_rest/routes/reportRoutes');
const userRoutes = require('./api_rest/routes/userRoutes');



// === Módulo: Usuarios ===
app.use('/api/users', userRoutes);
app.use('/api/users/instructors', instructorRoutes);
app.use('/api/users/students', studentRoutes);
app.post('/api/users/register', UserController.register);
app.post('/api/users/validate', UserController.validate);
app.post('/api/users/login', UserController.login);
app.put('/api/users/profile', UserController.updateProfile);

// === Módulo: Cursos, Contenido, Cuestionarios ===
app.use('/api/courses', courseRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/quizzes', quizRoutes);

// === Módulo: Comunicación ===
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

// === Módulo: Calificaciones y Reportes ===
app.use('/api/scores', scoreRoutes);
app.use('/api/reports', reportRoutes);

// === Puerto y arranque del servidor ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
