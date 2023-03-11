const express = require('express')
const {userBookings,createBooking,cancelBooking,getAllBooking} = require('../controller/bookingController')
const router = express.Router()


router.route("/book").post(createBooking)
router.route('/getUserBookings').post(userBookings)
router.route('/cancelUserBooking').post(cancelBooking)
router.route('/bookings').get(getAllBooking)

module.exports = router