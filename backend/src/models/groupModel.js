import mongoose, { mongo } from 'mongoose'

const groupSchema = new mongoose.Schema({
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }]
})

const Group = mongoose.model('Group', groupSchema)
module.exports = Group