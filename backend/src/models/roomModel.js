import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    groupSize: {
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
    }]
})

const Room = mongoose.model('Room', roomSchema)
module.exports = Room