const mongoose = require('mongoose');

const user = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},

    houseNumber: {type: Number, required: false},
    street: {type: String, required: false},
    city: {type: String, required: false},
    country: {type: String, required: false},
    postalCode: {type: String, required: false}
});

module.exports = mongoose.model('User', user);