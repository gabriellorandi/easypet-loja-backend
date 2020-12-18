const express = require('express');
const router = express.Router();

const compraController = require('../controllers/compraController');

router.get('/compra/',compraController.getAll);

router.get('/compra/:id',compraController.getById);

router.post('/compra/',compraController.add);

router.patch('/compra/:id',compraController.update);

router.delete('/compra/:id',compraController.delete);

module.exports = router;