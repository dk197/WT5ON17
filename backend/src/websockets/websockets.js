const roomController = require('../controller/roomController')
const User = require('../models/userModel')

module.exports = function(io) {
   io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('createRoom', async (token) => {
        socket.join(token)
    })
    socket.on('joinRoom', async (data) => {
        socket.join(data.token)
        console.log(data);
        io.to(data.token).emit('userJoinedRoom', data.user)
    })
    socket.on('changePhase', async (roomId) => {
        console.log(roomId);
        const res = await roomController.changePhase(roomId)
        // console.log(updatedRoom);
        io.to(res.room.token).emit('phaseHasChanged', {phase: res.room.phase, groups: res.groups})
    })
})
}