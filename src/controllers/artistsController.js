const db = require('../config/db');

const getAll = (req, res) => {
  db.query('SELECT * FROM artists', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener artistas' });
    res.json(results);
  });
};

const getById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM artists WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener artista' });
    if (results.length === 0) return res.status(404).json({ message: 'Artista no encontrado' });
    res.json(results[0]);
  });
};

const create = (req, res) => {
  const { name, genre, image_url } = req.body;
  if (!name) return res.status(400).json({ message: 'El nombre es requerido' });

  db.query('INSERT INTO artists (name, genre, image_url) VALUES (?, ?, ?)',
    [name, genre, image_url], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al crear artista' });
      res.status(201).json({ message: 'Artista creado', id: result.insertId });
    });
};

const update = (req, res) => {
  const { id } = req.params;
  const { name, genre, image_url } = req.body;

  db.query('UPDATE artists SET name = ?, genre = ?, image_url = ? WHERE id = ?',
    [name, genre, image_url, id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al actualizar artista' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Artista no encontrado' });
      res.json({ message: 'Artista actualizado' });
    });
};

const remove = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM artists WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al eliminar artista' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Artista no encontrado' });
    res.json({ message: 'Artista eliminado' });
  });
};
    
module.exports = { getAll, getById, create, update, remove };