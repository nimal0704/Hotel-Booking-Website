// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // No two users can have the same email
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'partner', 'admin'],
        default: 'user' // Sets a default role for new users
    },
    companyName: { type: String },
    phoneNumber: { type: String },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);

module.exports = User;