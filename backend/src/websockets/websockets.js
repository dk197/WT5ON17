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
        io.to(data.token).emit('userJoinedRoom', data.user)
    })
    socket.on('changePhase', async (roomId) => {
        const res = await roomController.changePhase(roomId)
        // console.log(updatedRoom);
        io.to(res.room.token).emit('phaseHasChanged', {phase: res.room.phase, groups: res.groups})
    })
    socket.on('sendExchange', (data) => {
        io.to(data.token).emit('exchangeRequestWasSent', {
            groupIndex: data.groupIndex,
            sender: data.sender,
            receiver: data.receiver
        })
    })
    socket.on('exchangeWasAccepted', (data) => {
        console.log('exchangeaccepted');
        console.log(data);
        io.to(data.token).emit('exchangeWasMade', {
            sender: data.sender,
            senderGroupIndex: data.senderGroupIndex,
            receiver: data.receiver
        })
    })
})
}