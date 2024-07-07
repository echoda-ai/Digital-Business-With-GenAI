const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth.js'));
router.use('/categories', require('./categories.js'))
router.use('/products', require('./products.js'))
router.use('/orders', require('./orders.js'))

module.exports = router;