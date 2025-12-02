CREATE DATABASE IF NOT EXISTS minao_quiz;
USE minao_quiz;

-- Tabla de Cuestionarios (Quiz)
CREATE TABLE IF NOT EXISTS Quiz (
    quizId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(300),
    creationDate DATE,
    numberQuestion INT,
    weighing DECIMAL(5,2),
    cursoId INT NOT NULL,
    contentId INT NOT NULL,
    FOREIGN KEY (cursoId) REFERENCES Curso(cursoId) ON DELETE CASCADE,
    FOREIGN KEY (contentId) REFERENCES Content(contentId) ON DELETE CASCADE
);

-- Tabla de Reportes
CREATE TABLE IF NOT EXISTS Report (
    reportId INT AUTO_INCREMENT PRIMARY KEY,
    cursoId INT NOT NULL,
    studentUserId INT,
    type ENUM('General','Por estudiante') NOT NULL,
    data JSON,
    FOREIGN KEY (cursoId) REFERENCES Curso(cursoId) ON DELETE CASCADE
);

-- Tabla de Calificaciones (Score)
CREATE TABLE IF NOT EXISTS Score (
    scoreId INT AUTO_INCREMENT PRIMARY KEY,
    cursoId INT NOT NULL,
    studentUserId INT NOT NULL,
    score DECIMAL(5,2),
    UNIQUE KEY unique_curso_student (cursoId, studentUserId),
    FOREIGN KEY (cursoId) REFERENCES Curso(cursoId) ON DELETE CASCADE
);
