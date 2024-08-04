const { logger } = require('./utils/logger.js')
const express = require('express')
const { NODE_PORT, UPLOADS_BASE_DIR } = require('./constant.js')
// const compression = require('compression')
const swaggerUIPath = require("swagger-ui-express");
const path = require('path');
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
console.log(path.join(__dirname, "../", UPLOADS_BASE_DIR))
const swaggerDocument = require('../swagger-output.json');
app.use('/api-docs', swaggerUIPath.serve, swaggerUIPath.setup(swaggerDocument));
app.use('/assets', express.static(path.join(__dirname, "../", UPLOADS_BASE_DIR)))
app.use('/', require('./routes/index.js'))


app.listen(NODE_PORT, () => logger.info(`Server is running on http://localhost:${NODE_PORT}`))