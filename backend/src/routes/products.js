// router.js
const express = require('express');
const router = express.Router();
const ProductRepository = require('../repository/product');
const { safeResponse, safeError } = require('../utils/response');
const { jwtVerify: verifyToken } = require('../middleware/jwt-verify');

const productRepository = new ProductRepository();

router.get('/', (_req, res) => {
    productRepository.getProducts()
        .then(result => safeResponse(res, { payload: result }))
        .catch(error => safeError(res, { message: error.message }));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    productRepository.getProductById(id)
        .then(result => safeResponse(res, { payload: result }))
        .catch(error => safeError(res, { message: error.message }));
});

router.post('/get-product-by-ids', verifyToken, (req, res) => {
    const { body } = req;
    productRepository.findProductById(body.productIds)
        .then(result => safeResponse(res, { payload: result }))
        .catch(error => safeError(res, { message: error.message }));
});

module.exports = router;
