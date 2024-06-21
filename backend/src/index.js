const { logger } = require('./utils/logger.js')
const express = require('express')
const { PORT } = require('./constant.js')
const authRouter = require('./routes/auth.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((err, _req, _res, _next) => {
    logger.error(err)
})

app.get('/', (_req, res) => res.send('Hello World!'))
app.use('/auth', authRouter)

app.listen(PORT, () => logger.info(`Server is running on http://localhost:${PORT}`))