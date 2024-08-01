// router.js
const express = require('express');
const router = express.Router();
const ProductRepository = require('../repository/product');
const { safeResponse, safeError } = require('../utils/response');
const { jwtVerify: verifyToken } = require('../middleware/jwt-verify');
const OrderProductRepository = require('../repository/order-product');

const productRepository = new ProductRepository();
const orderProductRepository = new OrderProductRepository();

router.get('/', (_req, res) => {
    productRepository.getProducts()
        .then(result => safeResponse(res, { payload: result }))
        .catch(error => safeError(res, { message: error.message }));
});

router.get('/top-sale', (_req, res) => {
    orderProductRepository.getTopSale()
        .then(result => {
            const productIds = result.map(item => item.productID);
            return productRepository.findProductById(productIds);
        })
        .then(products => safeResponse(res, { payload: products }))
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
