const express = require('express')
const router = new express.Router()
const roomController = require('../controller/roomController')

router.post('/rooms', roomController.createRoom)

router.get('/rooms/:token', roomController.verifyToken)

module.exports = router