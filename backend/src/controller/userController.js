const User = require('../models/userModel')

module.exports = {
    createUser: async function(req, res) {
        const user = new User(req.body)
        
        try {
            const createdUser = await user.save()
            res.send(createdUser) 
        }catch(e) {
            console.log(e);
            res.status(400).send()
        }
    },
    createRoomAdmin: async function(data, roomId) {
        let userData
        if(data.role !== '' && data.username !== '') {
            userData = {
                username: data.username,
                roomId: roomId,
                role: data.role,
                isAdmin: true,
                isParticipant: true
            }
        }else {
            userData = {
                username: 'Admin',
                roomId: roomId,
                role: 'Admin',
                isAdmin: true,
                isParticipant: false
            }
        }
        const roomOwner = new User(userData)
        const createdRoomOwner = await roomOwner.save()
        await roomOwner.generateAuthToken()
        return createdRoomOwner
    }
}