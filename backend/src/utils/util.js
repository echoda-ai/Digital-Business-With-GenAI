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

const comparePassword = (password, hash) => {
    return hashPassword(password) === hash;
}

const jwtSign = (userId) => {
    const token = jwt.sign({ userId: userId },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRE }
    );
    const expiredDate = DateTime
        .local()
        .plus({ days: Number(JWT_EXPIRE.split(' ')[0]) });

    return { token, expiredDate }
}


module.exports = { hashPassword, comparePassword, jwtSign };