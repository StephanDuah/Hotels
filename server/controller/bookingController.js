const Booking = require('../model/booking')
const Room = require('../model/room')
const moment = require('moment')


exports.createBooking = async (req,res) => {
    const {
       room,
       user_id,
       fromdate,
       todate,
       totalAmount,
       totalDays  
     } = req.body

    try{
     const newBooking = new Booking({
        room: room.name,
        room_id: room._id,
        user_id,
        fromdate: moment(fromdate).format("YYYY-MM-DD"),
       todate: moment(todate).format("YYYY-MM-DD"),
       totalAmount,
       totalDays,
       transactionId: "1245",
          status: "booked"  
     })
       
     const booking = await newBooking.save()

     const temproom = await Room.findById({_id:room._id})
     temproom.currentBookings.push({
        bookingId: booking._id,
        user_id,
        fromdate: moment(fromdate).format("YYYY-MM-DD"),
       todate: moment(todate).format("YYYY-MM-DD"),
       status: booking.status
    }) 

    await temproom.save()
     res.send("Booking saved")
   }catch(e){
    res.send("something went wrong")
    console.log(e)
   }
}

exports.getAllBooking = async (req,res) => {
 try{
   const booking = await Booking.find({})
   res.send(booking)
 }catch(e){
  console.log(e)
 }
}

exports.cancelBooking =  async (req,res) => {
   const {bookingId, room_id} = req.body
   console.log(bookingId)
   console.log(room_id)
   try{
      const booking = await Booking.findById(bookingId)
      const room = await Room.findById(room_id)
      booking.status = 'cancelled'
      await booking.save()

      const bookings = room.currentBookings

      const temp = bookings.filter(booking => booking.bookingId.toString() !== bookingId)
      room.currentBookings = temp


      await room.save()

      res.send('Your booking cancelled successfully')
   }catch(e){
      console.log(e)
    return res.status(400).send("error")
   }
}

exports.userBookings = async (req,res) => {
  const user_id = req.body.user_id
  console.log(user_id)
  try{
   const bookings = await Booking.find({user_id})
   console.log(bookings)
   res.send(bookings)
   
  }catch(e){
   console.log(e)
  }
}

