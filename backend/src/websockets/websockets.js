const roomController = require('../controller/roomController')
const User = require('../models/userModel')

module.exports = function(io) {
   io.on('connection', (socket) => {
    socket.on('createRoom', async (token) => {
        socket.join(token)
    })
    socket.on('joinRoom', async (data) => {
        socket.join(data.token)
        io.to(data.token).emit('userJoinedRoom', data.user)
    })
    socket.on('changePhase', async (roomId) => {
        const res = await roomController.changePhase(roomId)
        io.to(res.room.token).emit('phaseHasChanged', {phase: res.room.phase, groups: res.groups, errors: res.errors})
    })
    socket.on('sendExchange', (data) => {
        io.to(data.token).emit('exchangeRequestWasSent', {
            groupIndex: data.groupIndex,
            sender: data.sender,
            receiver: data.receiver
        })
    })
    socket.on('exchangeWasAccepted', (data) => {
        io.to(data.token).emit('exchangeWasMade', {
            sender: data.sender,
            senderGroupIndex: data.senderGroupIndex,
            receiver: data.receiver
        })
    })
    socket.on('exchangeWasDeclined', (data) => {
        io.to(data.token).emit('exchangeWasNotMade', {
            receiver: data.receiver,
            sender: data.sender
        })
    })
    socket.on('deleteRoom', async (data) => {
        await roomController.deleteRoom(data.roomId)
        io.to(data.token).emit('roomWasClosed')
    })
})
}