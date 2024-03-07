const express = require('express');

const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/', productController.getAll);
router.post('/create', productController.create);
router.put('/id/:id', productController.updateByName);
router.delete('/id/:id', productController.deleteByName);

module.exports = router;