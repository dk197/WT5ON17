const User = require('../models/userModel')

module.exports = {
    createUser: async function(req, res) {
        const user = new User(req.body)
        
        try {
            const createdUser = await user.save()
            res.send(createdUser) 
        }catch(e) {
            console.log(e);
            res.status(400).send()
        }
    }
}