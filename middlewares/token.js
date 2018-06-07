const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            errorCode: 4,
            message: 'Unauthorized'
        });
    }

    // Expecting header to look like 'Bearer <token>'
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'SECRET', (err, payload) => {

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

        next();
    })

};

module.exports = verifyToken;