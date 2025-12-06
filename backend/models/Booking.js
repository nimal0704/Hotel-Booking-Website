// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
        // Note: No 'ref' here since rooms are subdocuments, 
        // we just store the direct room _id.
    },
    guestName: { type: String, required: true },
    checkinDate: { type: Date, required: true },
    checkoutDate: { type: Date, required: true },
    numberOfNights: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;