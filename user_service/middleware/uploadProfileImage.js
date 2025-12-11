const uploadProfileImage = multer({
    storage,
    limits: { fileSize: MAX_SIZE_BYTES },
    fileFilter
}).single('profileImage'); // nombre del campo de archivo

// Middleware para manejar la carga de la imagen
const uploadProfileImageMiddleware = (req, res, next) => {
    uploadProfileImage(req, res, function (err) {
        if (err) {
            console.error("Error al cargar la imagen:", err);
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    error: true,
                    message: "El tamaño de la imagen no debe superar los 5 MB."
                });
            }
            if (err.code === 'INVALID_FORMAT') {
                return res.status(400).json({
                    error: true,
                    message: "Solo se permiten imágenes en formato JPEG y PNG."
                });
            }
            return res.status(500).json({
                error: true,
                message: "Error al cargar la imagen. Intenta de nuevo más tarde."
            });
        }
        next(); // Si no hay error, continúa con el siguiente middleware
    });
};

module.exports = uploadProfileImageMiddleware;
