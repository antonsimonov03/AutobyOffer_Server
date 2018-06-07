const express = require('express');
const router = express.Router();

const ProductController = require('../../controllers/product.controller');

const verifyToken = require('../../middlewares/token');

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
router.post('/', verifyToken, ProductController.addProduct);
router.put('/', verifyToken, ProductController.updateProduct);
router.delete('/:id', verifyToken, ProductController.deleteProduct);

module.exports = router;