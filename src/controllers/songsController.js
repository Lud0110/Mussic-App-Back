const db = require('../config/db');

const getAll = (req, res) => {
  const { genre } = req.query;
  let query = `
    SELECT songs.*, artists.name as artist_name 
    FROM songs 
    JOIN artists ON songs.artist_id = artists.id
  `;
  const params = [];

  if (genre && genre !== 'Todos') {
    query += ' WHERE songs.genre = ?';
    params.push(genre);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener canciones' });
    res.json(results);
  });
};

const getById = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT songs.*, artists.name as artist_name 
    FROM songs 
    JOIN artists ON songs.artist_id = artists.id
    WHERE songs.id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener canción' });
    if (results.length === 0) return res.status(404).json({ message: 'Canción no encontrada' });
    res.json(results[0]);
  });
};

const create = (req, res) => {
  const { title, artist_id, genre, image_url, duration } = req.body;
  if (!title || !artist_id) {
    return res.status(400).json({ message: 'Título y artista son requeridos' });
  }

  db.query('INSERT INTO songs (title, artist_id, genre, image_url, duration) VALUES (?, ?, ?, ?, ?)',
    [title, artist_id, genre, image_url, duration], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al crear canción' });
      res.status(201).json({ message: 'Canción creada', id: result.insertId });
    });
};

const update = (req, res) => {
  const { id } = req.params;
  const { title, artist_id, genre, image_url, duration } = req.body;

  db.query('UPDATE songs SET title = ?, artist_id = ?, genre = ?, image_url = ?, duration = ? WHERE id = ?',
    [title, artist_id, genre, image_url, duration, id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al actualizar canción' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Canción no encontrada' });
      res.json({ message: 'Canción actualizada' });
    });
};

const remove = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM songs WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al eliminar canción' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Canción no encontrada' });
    res.json({ message: 'Canción eliminada' });
  });
};

module.exports = { getAll, getById, create, update, remove };