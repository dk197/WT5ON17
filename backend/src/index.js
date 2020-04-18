const express = require('express')
require('./db/mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT


app.listen(port, () => {
    console.log(`Server is up running at port ${port}`);
})