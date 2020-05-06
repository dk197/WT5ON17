const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    token: {
        type: String,
        trim: true
    },
    groupAmount: {
        type: Number,
        required: true
    },
    roles: [{
        name: {
            type: String,
            required: true
        },
        minAmount: {
            type: Number,
            required: true
        }
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    groups: [{
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        }
    }],
    phase: {
        type: String
    }
})

roomSchema.methods.generateRoomToken = async function() {
    const room = this
    const token = Math.random().toString(36).substr(2)
    room.token = token
    
    await room.save()

    return token
}

const Room = mongoose.model('Room', roomSchema)
module.exports = Room