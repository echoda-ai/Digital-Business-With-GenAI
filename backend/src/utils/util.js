const crypto = require('crypto');
const { JWT_SECRET, JWT_EXPIRE } = require('../constant');
const jwt = require('jsonwebtoken');
const { DateTime } = require('luxon');

const hashPassword = (password) => {
    const hash = crypto.createHmac('sha256', '59XfXkeKxV')
        .update(password)
        .digest('hex');
    return hash;
};

const comparePassword = (password, hash) => hashPassword(password) === hash;

const jwtSign = (userID) => {
    console.log("userID", userID)
    const expiresIn = Number(JWT_EXPIRE.split(' ')[0]) * 24 * 60 * 60; // Convert days to seconds

    const token = jwt.sign({ userID: userID },
        JWT_SECRET,
        { expiresIn: expiresIn }
    );
    const expiredDate = DateTime
        .local()
        .plus({ expiresIn });

    return { token, expiredDate }
}

const generateUUID = () => crypto.randomUUID()


module.exports = { hashPassword, comparePassword, jwtSign, generateUUID };