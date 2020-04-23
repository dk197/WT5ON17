const express = require('express')
require('./db/mongoose')
require('dotenv').config()
const roomRouter = require('./router/roomRouter')

const app = express()
const port = process.env.PORT

app.use(express.json())

// allow CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(roomRouter)

app.listen(port, () => {
    console.log(`Server is up running at port ${port}`);
})