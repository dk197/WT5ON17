module.exports = function(io) {
   io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('joinRoom', data => {
        console.log(data);
        io.emit('testEvent', 'test')
    })
})
}