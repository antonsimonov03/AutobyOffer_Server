const User = require('../models/user.model');

exports.getAll = async (req, res) => {
    try {
        const users = await User.find({}).select('-password -__v');

        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({_id: id}).select('-password -__v');

        return res.status(200).send(user);
    } catch (error) {
        return res.status(404).json({
            error,
            message: 'User not found!'
        });
    }
};

exports.update = async (req, res) => {

    const id = req.params.id;

    try {
        const user = await User.findOne({_id: id});

        let newUser = Object.assign(new User(user), { ...req.body });

        await newUser.save();

        return res.status(200).json(await User.findOne({_id: newUser._id}).select('-password -__v'));

    } catch (error) {
        console.log(error);

        return res.status(500).send(error);
    }

};