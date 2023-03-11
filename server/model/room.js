// Room model
const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    maxCount: {
        type: Number,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    rentPerNight: {
        type: Number,
        required: true,
    },
    imageUrls: [],
    currentBookings: [],
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }


})


const Room = mongoose.model('Room',roomSchema)

module.exports = Room