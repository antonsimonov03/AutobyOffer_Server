const express = require('express');
const router = express.Router();

const User = require('../../models/user.model');

// All users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, '_id, email');

        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
});

// User by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({_id: id}, '_id, email');

        return res.status(200).send(user);
    } catch (error) {
        return res.status(404).json({
            error,
            message: 'User not found!'
        });
    }
});

module.exports = router;