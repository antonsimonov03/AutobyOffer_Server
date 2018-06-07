const express = require('express');
const router = express.Router();

const products = require('./api/product.route');
const user = require('./api/user.route');

const AuthController = require('../controllers/auth.controller');

router.use('/products', products);
router.use('/user', user);

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/me', AuthController.me);

module.exports = router;