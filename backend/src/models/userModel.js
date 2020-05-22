const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    },
    role: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isParticipant: {
        type: Boolean,
        default: true
    },
    authToken: {
        type: String
    }
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const authToken = jwt.sign({_id: user.id.toString()}, process.env.JWT_SECRET)
    user.authToken = authToken
    await user.save()

    return authToken
}

const User = mongoose.model('User', userSchema)
module.exports = User