const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const products = require('./api/product.route');
const user = require('./api/user.route');

const User = require('../models/user.model');

router.use('/products', products);
router.use('/user', user);



router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        else {

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                lastName: req.body.lastName,
                firstName: req.body.firstName,
            });

            try {

                const newUser = await user.save();

                const JWTToken = await jwt.sign({
                        _id: newUser._id
                    },
                    'SECRET',
                    {
                        expiresIn: '3h'
                    });

                return res.status(200).json({
                    token: JWTToken
                });
            }

            catch (error) {

                if (error.code === 11000) {
                    return res.status(400).json({
                        errorCode: 2,
                        message: 'Email already in use!'
                    });
                }

                return res.status(500).json({
                    error
                });
            }

        }
    });
});

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email})
        .exec()
        .then( (user) => {
            bcrypt.compare(req.body.password, user.password, async (err, result) => {
                if (err) {

                    return res.status(403).json({
                        failed: 'Unauthorized Access'
                    });
                }

                if (result) {
                    const JWTToken = await jwt.sign({
                            _id: user._id
                        },
                        'SECRET',
                        {
                            expiresIn: '3h'
                        });

                    return res.status(200).json({
                        token: JWTToken
                    });
                }

                return res.status(400).json({
                    errorCode: 1,
                    message: 'Invalid email or password'
                });

            });
        })
        .catch( (error) => {
            return res.status(400).json({
                errorCode: 1,
                message: 'Invalid email or password'
            });
        });
});

router.get('/me', (req, res) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            errorCode: 3,
            message: 'Unauthorized'
        });
    }

    // Expecting header to look like 'Bearer <token>'
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, 'SECRET', async (err, decoded) => {
        if (err) {
            if (err.message.includes('malformed')) {
                return res.status(401).json({
                    errorCode: 3,
                    message: 'Unauthorized'
                });
            } else if (err.message.includes('invalid')) {
                return res.status(401).json({
                    errorCode: 1,
                    message: 'Token is invalid'
                });
            } else if (err.message.includes('expired')) {
                return res.status(401).json({
                    errorCode: 2,
                    message: 'Token has expired'
                });
            } else return res.sendStatus(401);
        }

        const user = await User.findOne({_id: decoded._id}).select('-password -_id -__v');

        return res.status(200).send(user);
    });


});

module.exports = router;