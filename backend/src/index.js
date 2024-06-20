const { logger } = require('./utils/logger.js')
const express = require('express')
const { PORT } = require('./constant.js')

const app = express()

app.get('/', (_req, res) => res.send('Hello World!'))

app.listen(PORT, () => logger.info(`Server is running on http://localhost:${PORT}`))