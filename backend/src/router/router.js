const express = require('express')
const router = new express.Router()
const roomController = require('../controller/roomController')

router.post('/rooms', roomController.createRoom)
router.post('/rooms/phase', roomController.changePhase)

router.get('/rooms/:token', roomController.verifyToken)

router.delete('/rooms/:id', roomController.deleteRoom)

module.exports = router