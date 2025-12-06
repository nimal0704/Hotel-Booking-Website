const mongoose = require('mongoose');

// A sub-document for individual bookings
const bookingSubSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    // You could add guest details here in the future
});

// A sub-document for different room types within a hotel
const roomSchema = new mongoose.Schema({
    roomType: { 
        type: String, 
        required: true, 
        enum: ['Standard', 'Deluxe', 'Suite'] // Example room types
    },
    price: { type: Number, required: true }, // Each room type has its own price
    maxGuests: { type: Number, required: true },
    amenities: [String],
    roomCount: { type: Number, required: true }, // How many rooms of this type exist
    bookings: [bookingSubSchema] // Each room type has its own booking calendar
});

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    address: String,
    // The main hotel has general amenities
    amenities: [String], 
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String },
    // --- THIS IS THE MAJOR UPGRADE ---
    // A hotel now has an array of different room types
    rooms: [roomSchema]
    // --------------------------------
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;

