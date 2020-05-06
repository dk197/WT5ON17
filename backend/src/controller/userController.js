const User = require('../models/userModel')

module.exports = {
    createUser: async function(data) {
        const user = new User(data)
        try {
            const createdUser = await user.save()
            console.log(createdUser);
            return createdUser
        }catch(e) {
            console.log(e);
        }
    }
}