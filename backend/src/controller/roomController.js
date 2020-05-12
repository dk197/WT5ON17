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
            // const roomUsers = await User.find({roomId: roomId})

            const roomUsers = [
                { username: 'test1', role: 'Entwickler' },
                { username: 'test2', role: 'Entwickler' },
                { username: 'test3', role: 'Entwickler' },
                { username: 'test4', role: 'Designer' },
                { username: 'test5', role: 'sonstiges' },
                { username: 'test6', role: 'Designer' },
                { username: 'test7', role: 'Designer' },
                { username: 'test8', role: 'sonstiges' },
                { username: 'test9', role: 'sonstiges' },
                { username: 'test10', role: 'sonstiges' },
                { username: 'test11', role: 'sonstiges' },
                { username: 'test12', role: 'sonstiges' },
                { username: 'test13', role: 'Designer' },
                { username: 'test14', role: 'sonstiges' },
                { username: 'test15', role: 'sonstiges' },
            ]

            switch (room.phase) {
                case 'Beitrittsphase':
                    const groups = await this.generateGroups(roomUsers, room.groupAmount, roomId)
                    room.phase = 'Ansichtsphase'
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

        //shuffle the users randomly
        var ctr = users.length, temp, index;
        while (ctr > 0) {
            index = Math.floor(Math.random() * ctr);
            ctr--;
            temp = users[ctr];
            users[ctr] = users[index];
            users[index] = temp;
        }

        //Sort users for roles
        users.sort(function(a, b) {
            const roleA = a.role.toUpperCase();
            const roleB = b.role.toUpperCase();

            let comparison = 0;
            if (roleA > roleB) {
                comparison = 1;
            } else if (roleA < roleB) {
                comparison = -1;
            }
            return comparison;
        })

        //Generate empty array for groups
        groupsArray = []
        for (let index = 0; index < groupAmount; index++) {
            groupsArray.push([])            
        }

        //Fill the groups with users
        var groupNumber = 0
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            if(groupNumber>=groupAmount){
                groupNumber-=groupAmount
            }
            temp = groupsArray[groupNumber]
            temp.push(user)
            groupsArray[groupNumber] = temp
            groupNumber++
        }

        //Convert into objectnotation
        groups = []
        for (let index = 0; index < groupsArray.length; index++) {
            const currentGroup = groupsArray[index];
            const group = new Group()
            group.roomId = roomId
            group.participants = currentGroup
            const storedGroup = await group.save()
            groups.push(storedGroup)
        }

        var ctr = groups.length, temp, index;
        while (ctr > 0) {
            index = Math.floor(Math.random() * ctr);
            ctr--;
            temp = groups[ctr];
            groups[ctr] = groups[index];
            groups[index] = temp;
        }
        
        console.log(groups)
        return groups
    }
}