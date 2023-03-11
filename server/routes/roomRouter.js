const express = require('express')
const Room = require('../model/room')
const {getRooms,getRoom,createRooms} = require('../controller/roomController')
const router =  express.Router()


router.route('/rooms').get(getRooms)
router.route('/room/:id').get(getRoom)
router.route('/rooms').post(createRooms)


module.exports = router