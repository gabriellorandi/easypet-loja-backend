const express = require('express');
const router = express.Router();

const compraController = require('../controllers/compraController');

router.get('/user/:id/compra',compraController.getAll);

router.get('/user/:id/compra/:id',compraController.getById);

router.post('/user/:id/compra/',compraController.add);

router.patch('/user/:id/compra/:id',compraController.update);

router.delete('/user/:id/compra/:id',compraController.delete);

module.exports = router;