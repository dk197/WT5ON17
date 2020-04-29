const roomController = require('../controller/roomController')
const userController = require('../controller/userController')

module.exports = function(io) {
   io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('joinRoom', data => {
        socket.join(data.token)
        console.log(data);
        const user = userController.createUser(data)
        io.to(data.token).emit('userJoinedRoom', user)
    })
})
}