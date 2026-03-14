const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove } = require('../controllers/songsController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', verifyToken, verifyAdmin, create);
router.put('/:id', verifyToken, verifyAdmin, update);
router.delete('/:id', verifyToken, verifyAdmin, remove);

module.exports = router;