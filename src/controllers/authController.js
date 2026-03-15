const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    const userRole = role === 'admin' ? 'admin' : 'user';

    db.query(query, [username, email, hashedPassword, userRole], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'El usuario o email ya existe' });
            }
            return res.status(500).json({ message: 'Error al registrar usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    });
}; 

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password ) {
        return res.status(400).json({ message: 'Email y contaseña son requeridos' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error del servidor' });
        if (results.length === 0) return res.status(401).json({ message: 'Credenciales incorrectas' });

        const user = results[0];
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Credenciales incorrectas' });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24' }
        );

        res.json({
            message: 'Login exitoso',
            token,
            user: { id: user.id, username: user.username, email: user.email, role: user.role  }
        });
    });
};

module.exports = { register, login };