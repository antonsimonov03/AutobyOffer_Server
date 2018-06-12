const User = require('../models/user.model');

exports.getUsers = async () => {
    try {

        return await User.find({}).select('-password -__v');

    } catch (error) {
        console.log(error);
        throw Error('Error while getting users');
    }
};

exports.getUser = async (id) => {

    try {
        return await User.findOne({_id: id}).select('-password -__v');

    } catch (error) {

        console.log(error);
        throw Error('Error while getting user');
    }
};

exports.update = async (id, userData) => {

    try {
        const user = await User.findOne({_id: id});

        let newUser = Object.assign(new User(user), { ...userData });

        return await newUser.save();

    } catch (error) {
        console.log(error);

        throw Error('Error while updating user');
    }

};