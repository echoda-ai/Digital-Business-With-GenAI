const express = require('express');
const CategoryRepository = require('../repository/category.js');
const router = express.Router();
const { safeError, safeResponse } = require('../utils/response.js');

const categoryRepository = new CategoryRepository()

router.get('/', (_req, res) => {
    categoryRepository.findAll()
        .then(categories => safeResponse(res, { payload: categories }))
        .catch((error) => safeError(res, { message: error.message }))
})

module.exports = router;