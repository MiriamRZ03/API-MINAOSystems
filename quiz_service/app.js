const express = require('express');
const app = express();
const port = process.env.QUIZ_SERVICE_PORT || 3001;

// Rutas básicas para prueba
app.get('/', (req, res) => {
  res.send('Quiz service is running!');
});

app.listen(port, () => {
  console.log(`Quiz service listening at http://localhost:${port}`);
});
