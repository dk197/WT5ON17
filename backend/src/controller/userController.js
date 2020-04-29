const User = require('../models/userModel')

module.exports = {
    createUser: async function(data) {
        const user = new User(data)
        console.log(user);
        try {
            await user.save()
        }catch(e) {
            console.log(e);
        }
    }
}