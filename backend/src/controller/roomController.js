const Room = require('../models/roomModel')

module.exports = {
    createRoom: async function (req, res) {
        const room = new Room(req.body)

        try {
            await room.save()
            const token = await room.generateRoomToken()
            res.status(201).send({ room, token })
        } catch (e) {
            console.log(e);
            res.status(400).send()
        }
    },
    verifyToken: async function(req, res) {
        try {
            const room = await Room.findOne({token: req.params.token})
            console.log(room);
            res.send(room)
        }catch(e) {
            console.log(e);
            res.status(404).send()
        }
    }
}