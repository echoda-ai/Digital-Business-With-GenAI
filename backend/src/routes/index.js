const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => res.send('Hello World!'))
router.use('/auth', require('./auth.js'));
router.use('/categories', require('./categories.js'))
router.use('/products', require('./products.js'))
router.use('/orders', require('./orders.js'))
router.use('/users', require('./users.js'))

module.exports = router;