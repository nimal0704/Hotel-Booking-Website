// models/Package.js

const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    packageName: { type: String, required: true },
    location: { type: String, required: true },
    durationDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    description: { type: String },
    hotelIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    }],
    adventureIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Adventure'
    }],
    imageUrl: { type: String },
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;