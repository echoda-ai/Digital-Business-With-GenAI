const express = require('express');
const router = express.Router();
const { jwtVerify: verifyToken } = require('../middleware/jwt-verify');
const { check, validationResult } = require('express-validator');
const { OrderRepository } = require('../repository/order');
const { safeError, safeResponse } = require('../utils/response.js');
const { generateUUID } = require('../utils/util');

const orderDTO = [
    check('products').isArray()
        .withMessage('Product must be an array'),
    check('products.*').isUUID()
        .withMessage('Each product ID must be a valid UUID'),
    check('totalAmount').isNumeric({ gt: 0 })
        .withMessage('Total amount must be a number greater than 0')
];

const orderRepository = new OrderRepository();

router.post('/', verifyToken, orderDTO, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return safeError(res, errors.array())
    }

    const requestBody = {
        ...req.body,
        orderID: generateUUID(),
        userID: req.userID

    }
    console.log(requestBody)
    orderRepository.create(requestBody)
        .then(order => safeResponse(res, { payload: order }))
        .catch(err => safeError(res, err))
});

module.exports = router;