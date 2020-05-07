const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    participants: [{
        username: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    }]
})

const Group = mongoose.model('Group', groupSchema)
module.exports = Group