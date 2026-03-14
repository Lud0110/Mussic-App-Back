const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Music App API funcionando' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:' + PORT);
});