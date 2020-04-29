const User = require('../models/userModel')

module.exports = {
    createUser: async function(data) {
        const user = new User(data)
        try {
            const createdUser = await user.save()
            return createdUser
        }catch(e) {
            console.log(e);
        }
    }
}