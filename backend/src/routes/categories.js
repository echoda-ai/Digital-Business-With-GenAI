const express = require('express');
const CategoryRepository = require('../repository/category.js');
const router = express.Router();
const { safeError, safeResponse } = require('../utils/response.js');
const ProductRepository = require('../repository/product.js');

const categoryRepository = new CategoryRepository()
const productRepository = new ProductRepository()

router.get('/', (_req, res) => {
    categoryRepository.findAll()
        .then(categories => safeResponse(res, { payload: categories }))
        .catch((error) => safeError(res, { message: error.message }))
})

router.get('/:categoryID/products', (req, res) => productRepository.getProductByCategoryID(req.params.categoryID)
    .then(products => safeResponse(res, { payload: products }))
    .catch((error) => safeError(res, { message: error.message }))
);

module.exports = router;