const express = require('express')
const router = new express.Router()
const roomController = require('../controller/roomController')
const userController = require('../controller/userController')

router.post('/rooms', roomController.createRoom)
router.post('/rooms/phase', roomController.changePhase)

router.get('/rooms/:token', roomController.verifyToken)

router.delete('/rooms/:id', roomController.deleteRoom)

router.post('/user', userController.createUser)

module.exports = router