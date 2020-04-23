const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    token: {
        type: String,
        trim: true
    },
    minGroupSize: {
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
    groups: [{
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        }
    }]
})

const Room = mongoose.model('Room', roomSchema)
module.exports = Room