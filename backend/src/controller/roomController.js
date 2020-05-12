const Room = require('../models/roomModel')
const User = require('../models/userModel')
const Group = require('../models/groupModel')

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
            const users = await User.find({ roomId: room._id })
            console.log(users);
            // console.log(room);
            res.send({ room, users })
        } catch (e) {
            console.log(e);
            res.status(404).send()
        }
    },
    deleteRoom: async function (req, res) {
        try {
            const room = await Room.deleteOne({ _id: req.params.id })

            if (!room) {
                return res.status(404).send()
            }
            await User.deleteMany({ roomId: req.params.id })
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    },
    changePhase: async function (roomId) {
        try {
            const room = await Room.findById(roomId)
            console.log('room', room);
            const roomUsers = await User.find({roomId: roomId})

            // const roomUsers = [
            //     { username: 'test1', role: 'coolerDude1' },
            //     { username: 'test2', role: 'coolerDude1' },
            //     { username: 'test3', role: 'coolerDude1' },
            //     { username: 'test4', role: 'coolerDude2' },
            //     { username: 'test5', role: 'coolerDude2' },
            //     { username: 'test6', role: 'coolerDude2' },
            //     { username: 'test7', role: 'coolerDude3' },
            //     { username: 'test8', role: 'coolerDude3' },
            //     { username: 'test9', role: 'coolerDude3' },
            //     { username: 'test10', role: 'coolerDude4' },
            //     { username: 'test11', role: 'coolerDude4' },
            //     { username: 'test12', role: 'coolerDude4' },
            //     { username: 'test13', role: 'coolerDude5' },
            //     { username: 'test14', role: 'coolerDude5' },
            //     { username: 'test15', role: 'coolerDude5' },
            // ]
            let groups
            switch (room.phase) {
                case 'Beitrittsphase':
                    groups = await this.generateGroups(roomUsers, room.groupAmount, roomId)
                    room.phase = 'Ansichtsphase'
                    await room.save()
                    return {room, groups}
                    break
                case 'Ansichtsphase':
                    groups = []
                    room.phase = 'Tauschphase'
                    await room.save()
                    return {room, groups}
                    break
                default:
                    throw new Error('Error at switching phase')
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    },
    async generateGroups(users, groupAmount, roomId) {
        var overflow = users.length % groupAmount
        const perGroup = Math.floor(users.length / groupAmount)

        // shuffle Array with random
        var ctr = users.length, temp, index;
        while (ctr > 0) {
            index = Math.floor(Math.random() * ctr);
            ctr--;
            temp = users[ctr];
            users[ctr] = users[index];
            users[index] = temp;
        }

        // Split Array in Groups
        var groups = []
        var index = 0
        while (index < users.length) {
            if (overflow > 0) {
                mySplit = users.slice(index, index + perGroup + 1)
                groups.push(mySplit)
                overflow -= 1
                index += perGroup + 1
            } else {
                mySplit = users.slice(index, index + perGroup)
                const group = new Group()
                group.roomId = roomId
                group.participants = mySplit
                const storedGroup = await group.save()
                groups.push(storedGroup)
                index += perGroup
            }
        }
        return groups
    }
}