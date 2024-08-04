const express = require('express');
const router = express.Router();
const UserRepository = require('../repository/user');
const { check, validationResult } = require('express-validator');
const { hashPassword, comparePassword, jwtSign, generateUUID } = require('../utils/util');
const { safeResponse, safeError } = require('../utils/response');

const registerDto = [
    check('username').isString().withMessage('Username must be a string'),
    check('password').isString().withMessage('Password must be a string'),
    check('gender').isIn(['Male', 'Female']).withMessage('Gender must be either Male or Female'),
    check('gender').isString().withMessage('Gender must be a string'),
    check('address').isString().withMessage('Address must be a string'),
    check('phone').isString().withMessage('Phone must be a string'),
    check('zip').isString().withMessage('Zip must be a string'),
];

const loginDto = [
    check('email').isString().withMessage('Email must be a string'),
    check('password').isString().withMessage('Password must be a string'),
];
const userRepository = new UserRepository();

router.post('/register', registerDto, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return safeError(res, errors.array())
    }

    userRepository.findUserByEmail(req.body.email)
        .then(existedUser => {
            if (existedUser) {
                return safeResponse(res, { message: 'The email is already taken' })
            }

            const user = {
                ...req.body,
                userID: generateUUID(),
                roleId: req.body.roleId || 1,
                password: hashPassword(req.body.password),
            }

            return userRepository.saveUser(user)
                .then(() => {
                    const token = jwtSign(user.userID);
                    return safeResponse(res, { payload: token });
                });
        })
        .catch(error => {
            return safeError(res, { message: error.message });
        });
});

router.post('/login', loginDto, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return safeError(res, errors.array())
    }

    userRepository.findUserByEmail(req.body.email)
        .then(user => {
            if (!user) {
                return safeError(res, { message: 'The email is not found' })
            }

            const isPasswordMatched = comparePassword(req.body.password, user.password);
            if (!isPasswordMatched) {
                return safeError(res, { message: 'The password is not correct' })
            }

            const token = jwtSign(user.userID);
            return safeResponse(res, { payload: token });
        })
        .catch(error => {
            return safeError(res, { message: error.message });
        });
});


module.exports = router;