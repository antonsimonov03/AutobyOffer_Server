const UserService = require('../services/user.service');

exports.getAll = async (req, res) => {
    try {
        const users = await UserService.getUsers();

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
        const user = await UserService.getUser(id);

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

        await UserService.update(id, req.body);

        return res.status(200).json(await UserService.getUser(id));

    } catch (error) {
        console.log(error);

        return res.status(500).send(error);
    }

};