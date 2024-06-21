const { logger } = require('./utils/logger.js')
const express = require('express')
const { NODE_PORT } = require('./constant.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((err, _req, _res, _next) => {
    logger.error(err)
})

app.get('/', (_req, res) => res.send('Hello World!'))
app.use('/auth', require('./routes/auth.js'));
app.use('/categories', require('./routes/categories.js'))

app.listen(NODE_PORT, () => logger.info(`Server is running on http://localhost:${NODE_PORT}`))