const mongoose = require('mongoose');

// --- IMPORTANT: Replace with your MongoDB connection string ---
// It should be the same one you use in your main server.js file.
const MONGO_URI = 'mongodb://127.0.0.1:27017/myHotelBookingApp';

// --- IMPORTANT: Make sure this path is correct ---
// This should point to your Adventure model file.
const Hotel = require('./models/Hotel'); 

async function renameHotelField() {
  try {
    // 1. Connect to the database
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for migration.');

    // 2. Perform the update operation using the $rename operator
    // This finds all documents where the 'city' field exists and renames it to 'location'.
    const result = await Hotel.updateMany(
      { city: { $exists: true } },      // Filter: find documents with a 'city' field
      { $rename: { 'city': 'location' } } // Action: rename 'city' to 'location'
    );

    console.log('--- Migration Summary ---');
    console.log(`Documents searched: ${result.matchedCount}`);
    console.log(`Documents updated: ${result.modifiedCount}`);
    console.log('Field renaming from "city" to "location" is complete!');

  } catch (error) {
    console.error('An error occurred during the migration:', error);
  } finally {
    // 3. Disconnect from the database
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

// Run the migration script
renameHotelField();