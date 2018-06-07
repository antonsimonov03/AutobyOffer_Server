const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user.controller');
const verifyToken = require('../../middlewares/token');

router.get('/', verifyToken, UserController.getAll);
router.get('/:id', verifyToken, UserController.getById);
router.put('/:id', verifyToken, UserController.update);

module.exports = router;