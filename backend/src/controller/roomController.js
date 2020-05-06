const Room = require('../models/roomModel')
const User = require('../models/userModel')

module.exports = {
    createRoom: async function (req, res) {
        const room = new Room(req.body)

        try {
            const createdRoom = await room.save()
            const roomToken = await room.generateRoomToken()
            const roomOwner = new User({
                username: 'Admin',
                roomId: createdRoom._id,
                role: 'Admin',
                isAdmin: true,
                isParticipant: false
            })
            const createdRoomOwner = await roomOwner.save()
            await roomOwner.generateAuthToken()

            res.status(201).send({ createdRoom, roomToken, createdRoomOwner })
        } catch (e) {
            console.log(e);
            res.status(400).send()
        }
    },
    verifyToken: async function (req, res) {
        try {
            const room = await Room.findOne({ token: req.params.token })
            const users = await User.find({roomId: room._id})
            console.log(users);
            // console.log(room);
            res.send({room, users})
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