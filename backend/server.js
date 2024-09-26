const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./config/db'); // tu archivo de configuración de base de datos
const cors = require('cors');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
    credentials: true
}));

app.use(express.json());

// Ruta para crear un usuario (Registro)
app.post('/register', async (req, res) => {
    try {
        const { nombre, apellido, email, contraseña } = req.body;
        const userExists = await pool.query('SELECT * FROM "Usuarios" WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'El email ya está en uso' });
        }
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const newUser = await pool.query(
            'INSERT INTO "Usuarios" (nombre, apellido, email, contraseña) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, apellido, email, hashedPassword]
        );
        const token = jwt.sign({ id: newUser.rows[0].id, email: newUser.rows[0].email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        res.status(201).json({ message: 'Registro exitoso', token });
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
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para crear una nota con etiquetas
app.post('/api/notes', protect, async (req, res) => {
    const { title, content, etiquetas } = req.body; 
    const userId = req.user.id; 

    try {
        // Insertar la nota
        const newNote = await pool.query(
            'INSERT INTO "Notas" (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
            [userId, title, content]
        );

        const noteId = newNote.rows[0].id;

        // Asociar etiquetas (si las hay)
        if (etiquetas && etiquetas.length > 0) {
            const tagPromises = etiquetas.map(async (etiquetaId) => {
                await pool.query(
                    'INSERT INTO "NotaEtiqueta" (nota_id, etiqueta_id) VALUES ($1, $2)',
                    [noteId, etiquetaId]
                );
            });
            await Promise.all(tagPromises); 
        }

        res.status(201).json({
            message: 'Nota creada con éxito',
            note: newNote.rows[0]
        });
    } catch (error) {
        console.error('Error al crear la nota:', error); // Añadir más información sobre el error
        res.status(500).json({ error: 'Error al crear la nota en el servidor.' });
    }
});



// Ruta para crear una etiqueta
app.post('/api/tags', protect, async (req, res) => {
    try {
        const { tag_name } = req.body;
        const user_id = req.user.id; // Obtener el ID del usuario desde el token

        if (!tag_name) {
            return res.status(400).json({ message: 'El nombre de la etiqueta es obligatorio' });
        }

        // Insertar la etiqueta en la base de datos
        const newTag = await pool.query(
            'INSERT INTO "Etiquetas" (user_id, tag_name) VALUES ($1, $2) RETURNING *',
            [user_id, tag_name]
        );

        res.status(201).json(newTag.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener notas con sus etiquetas
app.get('/api/notes', protect, async (req, res) => {
    const userId = req.user.id;

    try {
        const notes = await pool.query(
            `SELECT n.id, n.title, n.content, COALESCE(array_agg(e.tag_name), '{}') AS etiquetas 
             FROM "Notas" n
             LEFT JOIN "NotaEtiqueta" ne ON n.id = ne.nota_id 
             LEFT JOIN "Etiquetas" e ON ne.etiqueta_id = e.id 
             WHERE n.user_id = $1 
             GROUP BY n.id`,
            [userId]
        );
        res.status(200).json(notes.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las notas' });
    }
});



app.get('/api/tags', protect, async (req, res) => {
    try {
        const userId = req.user.id; // Obtener el id del usuario autenticado
        const tags = await pool.query('SELECT * FROM "Etiquetas" WHERE user_id = $1', [userId]);
        res.status(200).json(tags.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
