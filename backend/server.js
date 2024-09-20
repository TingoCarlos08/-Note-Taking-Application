const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./config/db');
const cors = require('cors');
const { protect } = require('./middleware/authMiddleware'); // Importar el middleware de autenticación

dotenv.config();

const app = express();
const port = process.env.PORT;

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permitir solicitudes solo desde el frontend
    methods: 'GET,POST', // Métodos HTTP permitidos
    credentials: true // Permitir que el navegador envíe cookies con solicitudes
}));

app.use(express.json());

// Ruta para crear un usuario (Registro)
app.post('/register', async (req, res) => {
    try {
        const { nombre, apellido, email, contraseña } = req.body;

        // Verificar si el email ya está en uso
        const userExists = await pool.query('SELECT * FROM "Usuarios" WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'El email ya está en uso' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Insertar el nuevo usuario en la base de datos
        const newUser = await pool.query(
            'INSERT INTO "Usuarios" (nombre, apellido, email, contraseña) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, apellido, email, hashedPassword]
        );

        // Crear el token JWT
        const token = jwt.sign({ id: newUser.rows[0].id, email: newUser.rows[0].email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.status(201).json({
            message: 'Registro exitoso',
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para iniciar sesión y generar JWT
app.post('/login', async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        const user = await pool.query('SELECT * FROM "Usuarios" WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(contraseña, user.rows[0].contraseña);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

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
});

// Ruta para logout
app.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logout exitoso' });
});

// Ruta protegida de ejemplo
app.get('/api/protected', protect, (req, res) => {
    res.status(200).json({ message: 'Acceso concedido', user: req.user });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
