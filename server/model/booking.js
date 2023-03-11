const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    room : {
        type: String,
        require: true
    },
    room_id : {
        type: String,
        require: true
    },
    user_id : {
        type: String,
        require: true
    },
    fromdate : {
        type: String,
        require: true
    },
    todate : {
        type: String,
        require: true
    },
    totalAmount : {
        type: String,
        require: true
    },
    totalDays : {
        type: String,
        require: true
    },
    transactionId : {
        type: String,
        require: true
    },
    status : {
        type: String,
        require: true
    }


},{
    timestamps:true
}) 


const Booking = mongoose.model('Booking',bookingSchema)

module.exports = Booking