const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constant');

const jwtVerify = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No authorization token provided' });
    }

    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Authorization token has expired', err });
            }
            return res.status(401).json({ message: 'Invalid authorization token', err });
        }

        req.userID = decoded.userID;
        next();
    });
};

module.exports = { jwtVerify };