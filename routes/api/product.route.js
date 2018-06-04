const express = require('express');
const router = express.Router();

const ProductController = require('../../controllers/product.controller');

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
router.post('/', ProductController.addProduct);
router.put('/', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;