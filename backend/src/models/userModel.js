const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4
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
    user.token = jwt.sign({_id: user.id.toString()}, process.env.jwt_secret)

    await user.save()

    return token
}

const User = mongoose.model('User', userSchema)
module.exports = User