const { logger } = require('./utils/logger.js')
const express = require('express')
const { NODE_PORT } = require('./constant.js')
// const compression = require('compression')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((err, _req, _res, _next) => {
    logger.error(err)
})

// app.use(compression({
//     level: 9,
//     threshold: 10 * 1024,
//     algorithm: 'gzip',
//     filter: (req, res) => {
//         if (req.headers['x-no-compression']) {
//             return false
//         }
//         return compression.filter(req, res)
//     }
// }))

app.get('/', (_req, res) => res.send('Hello World!'))
app.use('/auth', require('./routes/auth.js'));
app.use('/categories', require('./routes/categories.js'))
app.use('/products', require('./routes/products.js'))
app.use('/orders', require('./routes/orders.js'))


app.listen(NODE_PORT, () => logger.info(`Server is running on http://localhost:${NODE_PORT}`))