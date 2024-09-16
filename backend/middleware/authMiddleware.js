const jwt = require('jsonwebtoken');

// Middleware para proteger rutas
exports.protect = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No autorizado, token no proporcionado' });
    }

    try {
        // Verificar el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardar los datos del usuario en el request
        next(); // Continuar con la siguiente función
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
