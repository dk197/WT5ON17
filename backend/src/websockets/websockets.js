const roomController = require('../controller/roomController')
const userController = require('../controller/userController')

module.exports = function(io) {
   io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('createRoom', async (token) => {
        socket.join(token)
    })
    socket.on('joinRoom', async (data) => {
        socket.join(data.token)
        // const user = await userController.createUser(data)
        // io.to(data.token).emit('userJoinedRoom', user)
    })
    socket.on('changePhase', async (roomId) => {
        console.log(roomId);
        const res = await roomController.changePhase(roomId)
        // console.log(updatedRoom);
        io.to(res.room.token).emit('phaseHasChanged', {phase: res.room.phase, groups: res.groups})
    })
})
}