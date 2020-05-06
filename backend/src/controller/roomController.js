const Room = require('../models/roomModel')
const User = require('../models/userModel')

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
    verifyToken: async function (req, res) {
        try {
            const room = await Room.findOne({ token: req.params.token })
            res.send(room)
        } catch (e) {
            console.log(e);
            res.status(404).send()
        }
    },
    deleteRoom: async function (req, res) {
        try {
            const room = await Room.deleteOne({_id: req.params.id})
            
            if (!room) {
                return res.status(404).send()
            }
            await User.deleteMany({roomId: req.params.id})
            res.send()
        } catch (e) {
            res.status(500).send()
        }

    }
}