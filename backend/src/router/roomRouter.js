const express = require('express')
const Room = require('../models/roomModel')
const router = new express.Router()

router.post('/rooms', async (req, res) => {
    const room = new Room(req.body)

    try {
        await room.save()
        const token = await room.generateRoomToken()
        res.status(201).send({ room, token })
    } catch(e) {
        console.log(e);
        res.status(400).send()
    }
})

module.exports = router