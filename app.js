const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const helmet = require('helmet')

app.use(express.json())
app.use(cors())
app.use(helmet())

require('dotenv').config()
require('./db')()

const userRouter = require('./routes/user')

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`)
})

app.use('/users', userRouter)