// models/Adventure.js

const mongoose = require('mongoose');

const adventureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    durationHours: { type: Number },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    tags: [String], // An array of strings like ["kayaking", "nature"]
    imageUrl: { type: String },
}, { timestamps: true });

const Adventure = mongoose.model('Adventure', adventureSchema);

module.exports = Adventure;