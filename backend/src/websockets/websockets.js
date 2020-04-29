const roomController = require('../controller/roomController')
const UserController = require('../controller/userController')

module.exports = function(io) {
   io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('joinRoom', data => {
        console.log(data);
        const user = UserController.createUser(data)
        io.emit('testEvent', 'test')
    })
})
}