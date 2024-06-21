const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constant');

const jwtVerify = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.userId = decoded.userId;
        next();
    });
};

module.exports = { jwtVerify };