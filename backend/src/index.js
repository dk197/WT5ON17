const express = require('express')
require('./db/mongoose')
require('dotenv').config()
const roomRouter = require('./router/roomRouter')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(roomRouter)

app.listen(port, () => {
    console.log(`Server is up running at port ${port}`);
})