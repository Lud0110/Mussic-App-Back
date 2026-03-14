const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    jwt.verify(token, process.env.JTW_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token invalido' });
        req.user = decoded;
        next();
    });
};

const verifyAdmin = (req, res, nest) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso solo para administradores' });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin };