const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
require('./db/mongoose')
require('dotenv').config()
const roomRouter = require('./router/roomRouter')

const port = process.env.PORT

const whitelist = ['http://localhost:8080'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}
app.use(cors(corsOptions))
app.use(express.json())

// allow CORS
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });

app.use(roomRouter)

io.on('connection', (socket) => {
    console.log('a user connected');
})

http.listen(port, () => {
    console.log(`Server is up running at port ${port}`);
})