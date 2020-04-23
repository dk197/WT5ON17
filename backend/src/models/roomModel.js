import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    minGroupSize: {
        type: Number,
        required: true
    },
    roles: [{
        role: {
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
            required: true,
            ref: 'Group'
        }
    }]
})

const Room = mongoose.model('Room', roomSchema)
module.exports = Room