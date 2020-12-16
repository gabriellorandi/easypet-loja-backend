const express = require('express');
const router = express.Router();

const produtoController = require('../controllers/produtoController');

router.get('/produto/',produtoController.getAll);

router.get('/produto/:id',produtoController.getById);

router.post('/produto/',produtoController.add);

router.patch('/produto/:id',produtoController.update);

router.delete('/produto/:id',produtoController.delete);

module.exports = router;