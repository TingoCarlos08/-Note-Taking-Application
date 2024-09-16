const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

// Registro de usuario
exports.register = async (req, res) => {
    const { nombre, email, contraseña } = req.body;

    try {
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Insertar el nuevo usuario en la base de datos
        const newUser = await pool.query(
            'INSERT INTO usuarios (nombre, email, contraseña) VALUES ($1, $2, $3) RETURNING *',
            [nombre, email, hashedPassword]
        );

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: newUser.rows[0]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña
        const validPassword = await bcrypt.compare(contraseña, user.rows[0].contraseña);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Crear el token JWT
        const token = jwt.sign({ id: user.rows[0].id, email: user.rows[0].email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
