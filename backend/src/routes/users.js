const express = require('express');
const router = express.Router();
const UserRepository = require('../repository/user');
const { jwtVerify } = require('../middleware/jwt-verify');
const { safeError, safeResponse } = require('../utils/response.js');

const userRepository = new UserRepository();

router.get('/profile', jwtVerify, (req, res) => userRepository
    .findUserById(req.userID)
    .then(users => safeResponse(res, { payload: users }))
    .catch((error) => safeError(res, { message: error.message }))
);

module.exports = router;
