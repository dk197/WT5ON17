const Room = require('../models/roomModel')
const User = require('../models/userModel')
const Group = require('../models/groupModel')
const userController = require('../controller/userController')

module.exports = {
    createRoom: async function (req, res) {
        const room = new Room(req.body.room)

        try {
            const createdRoom = await room.save()
            const roomToken = await room.generateRoomToken()
            const createdRoomOwner = await userController.createRoomAdmin(req.body.user, createdRoom._id)
            res.status(201).send({ createdRoom, roomToken, createdRoomOwner })
        } catch (e) {
            console.log(e);
            res.status(400).send()
        }
    },
    verifyToken: async function (req, res) {
        try {
            const room = await Room.findOne({ token: req.params.token })
            if(room.phase !== 'Beitrittsphase') {
                res.send({error: 'Raum befindet sich nicht in der Beitrittsphase!'})
                return
            }
            const users = await User.find({ roomId: room._id })
            // console.log(room);
            res.send({ room, users })
        } catch (e) {
            res.send({error: 'Raum nicht gefunden'})
        }
    },
    deleteRoom: async function (roomId) {
        try {
            const room = await Room.deleteOne({ _id: roomId })
            if(!room) {
                throw new Error('Room not found')
            }
            await User.deleteMany({ roomId: roomId })
        } catch (e) {
            throw new Error(e)
        }
    },
    changePhase: async function (roomId) {
        try {
            const room = await Room.findById(roomId)
            const roomUsers = await User.find({roomId: roomId, isParticipant: true})
            // const roomUsers = [
            //     { username: 'test1', role: 'Entwickler' },
            //     { username: 'test2', role: 'Entwickler' },
            //     { username: 'test3', role: 'Entwickler' },
            //     { username: 'test4', role: 'Entwickler' },
            //     { username: 'test5', role: 'Designer' },
            //     { username: 'test6', role: 'Designer' },
            //     { username: 'test7', role: 'Designer' },
            //     { username: 'test8', role: 'sonstiges' },
            //     { username: 'test9', role: 'sonstiges' },
            //     { username: 'test10', role: 'sonstiges' },
            //     { username: 'test11', role: 'sonstiges' },
            //     { username: 'test12', role: 'sonstiges' },
            //     { username: 'test13', role: 'sonstiges' },
            //     { username: 'test14', role: 'sonstiges' },
            //     { username: 'test15', role: 'sonstiges' },
            // ]
            let groups
            let errors
            switch (room.phase) {
                case 'Beitrittsphase':
                    const data = await this.generateGroups(roomUsers, room.groupAmount, roomId)
                    groups = data.groups
                    errors = data.errors
                    room.phase = 'Ansichtsphase'
                    await room.save()
                    return {room, groups, errors}
                    break
                case 'Ansichtsphase':
                    groups = []
                    errors = []
                    room.phase = 'Tauschphase'
                    await room.save()
                    return {room, groups, errors}
                    break
                case 'Tauschphase':
                    groups = []
                    errors = []
                    room.phase = 'Exportphase'
                    await room.save()
                    return {room, groups, errors}
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

        //Check ob Adminvorgaben erfüllt werden können
        var errors = []
        const room = await Room.findById(roomId)
        for (let index = 0; index < room.roles.length; index++) {
            const role = room.roles[index];
            var sollMenge = role.minAmount * groupAmount
            var istMenge = 0;
            for (let index = 0; index < users.length; index++) {
                const user = users[index];
                if (user.role == role.name) {
                    istMenge++
                }
            }
            if (istMenge < sollMenge) {
                var missing = sollMenge - istMenge
                errors.push("Es sind " + missing + " " + role.name + " zu wenig, um in jeder Gruppe min. " + role.minAmount + " zu haben!")
            }
        }
        
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
        
        return {groups, errors}
    }
}