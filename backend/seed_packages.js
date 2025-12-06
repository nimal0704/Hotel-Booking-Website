const mongoose = require('mongoose');

// --- 1. CONFIGURE YOUR DATABASE CONNECTION ---
// Make sure this is the same connection string you use everywhere else.
const MONGO_URI = 'mongodb://127.0.0.1:27017/myHotelBookingApp';

// --- 2. REQUIRE YOUR PACKAGE MODEL ---
// This ensures we use the correct blueprint for our data.
const Package = require('./models/Package');

// --- 3. DEFINE YOUR 15 DUMMY PACKAGES ---
// All packages now have a 'location' field.
const packages = [
  {
    packageName: 'Munnar Tea Valley Escape',
    location: 'Munnar',
    durationDays: 3,
    totalPrice: 18000,
    description: 'Explore the lush green tea plantations and misty hills of Munnar.',
    hotelIds: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    adventureIds: [new mongoose.Types.ObjectId()],
    imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Munnar'
  },
  {
    packageName: 'Alleppey Backwater Bliss',
    location: 'Alappuzha',
    durationDays: 2,
    totalPrice: 15000,
    description: 'Experience the serene backwaters of Alleppey on a traditional houseboat.',
    hotelIds: [new mongoose.Types.ObjectId()],
    adventureIds: [],
    imageUrl: 'https://placehold.co/600x400/0ea5e9/ffffff?text=Alleppey'
  },
  {
    packageName: 'Wayanad Wilderness Trek',
    location: 'Wayanad',
    durationDays: 4,
    totalPrice: 22000,
    description: 'A thrilling trek through the dense forests and hills of Wayanad.',
    hotelIds: [new mongoose.Types.ObjectId()],
    adventureIds: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    imageUrl: 'https://placehold.co/600x400/65a30d/ffffff?text=Wayanad'
  },
  {
    packageName: 'Kochi Heritage Tour',
    location: 'Kochi',
    durationDays: 2,
    totalPrice: 12000,
    description: 'Discover the rich history and culture of Fort Kochi and Mattancherry.',
    hotelIds: [new mongoose.Types.ObjectId()],
    adventureIds: [],
    imageUrl: 'https://placehold.co/600x400/f97316/ffffff?text=Kochi'
  },
  {
    packageName: 'Goa Beach Party Bonanza',
    location: 'Goa',
    durationDays: 5,
    totalPrice: 25000,
    description: 'Enjoy the sun, sand, and vibrant nightlife of North Goa.',
    hotelIds: [new mongoose.Types.ObjectId()],
    adventureIds: [new mongoose.Types.ObjectId()],
    imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Goa'
  },
  {
    packageName: 'Hampi Ancient Ruins Exploration',
    location: 'Hampi',
    durationDays: 3,
    totalPrice: 19000,
    description: 'Step back in time and explore the magnificent ruins of the Vijayanagara Empire.',
    hotelIds: [new mongoose.Types.ObjectId()],
    adventureIds: [],
    imageUrl: 'https://placehold.co/600x400/94a3b8/ffffff?text=Hampi'
  },
  {
    packageName: 'Athirappilly Waterfall Gateway',
    location: 'Athirappilly',
    durationDays: 2,
    totalPrice: 13000,
    description: 'A short trip to witness the majestic Athirappilly and Vazhachal waterfalls.',
    hotelIds: [new mongoose.Types.ObjectId()],
    adventureIds: [],
    imageUrl: 'https://placehold.co/600x400/0891b2/ffffff?text=Athirappilly'
  },
  {
    packageName: 'Varkala Cliffside Relaxation',
    location: 'Varkala',
    durationDays: 3,
    totalPrice: 16000,
    description: 'Unwind on the beautiful beaches and cliffs of Varkala.',
    hotelIds: [new mongoose.Types.ObjectId()],
    adventureIds: [],
    imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Varkala'
  },
  {
    packageName: 'Thekkady Spice Garden & Wildlife',
    location: 'Thekkady',
    durationDays: 3,
    totalPrice: 20000,
    description: 'Explore fragrant spice plantations and spot wildlife at the Periyar National Park.',
    hotelIds: [new mongoose.Types.ObjectId()],
    adventureIds: [new mongoose.Types.ObjectId()],
    imageUrl: 'https://placehold.co/600x400/84cc16/ffffff?text=Thekkady'
  },
  {
    packageName: 'Jaipur Royal Rajasthan',
    location: 'Jaipur',
    durationDays: 4,
    totalPrice: 28000,
    description: 'Experience the royal heritage of the Pink City with its forts and palaces.',
    hotelIds: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    adventureIds: [],
    imageUrl: 'https://placehold.co/600x400/ec4899/ffffff?text=Jaipur'
  },
  {
    packageName: 'Rishikesh Yoga & Rafting',
    location: 'Rishikesh',
    durationDays: 5,
    totalPrice: 23000,
    description: 'Find your zen with yoga by the Ganges and get your adrenaline pumping with whitewater rafting.',
    hotelIds: [new mongoose.Types.ObjectId()],
    adventureIds: [new mongoose.Types.ObjectId()],
    imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Rishikesh'
  },
  {
    packageName: 'Ooty & Coonoor Hill Station Retreat',
    location: 'Ooty',
    durationDays: 3,
    totalPrice: 17000,
    description: 'Escape to the Queen of Hill Stations, ride the toy train, and enjoy the cool mountain air.',
    hotelIds: [new mongoose.Types.ObjectId()],
    adventureIds: [],
    imageUrl: 'https://placehold.co/600x400/22c55e/ffffff?text=Ooty'
  },
  {
    packageName: 'Kovalam Beach Escape',
    location: 'Kovalam',
    durationDays: 3,
    totalPrice: 14000,
    description: 'Relax at the famous crescent beaches of Kovalam.',
    hotelIds: [new mongoose.Types.ObjectId()],
    adventureIds: [],
    imageUrl: 'https://placehold.co/600x400/06b6d4/ffffff?text=Kovalam'
  },
  {
    packageName: 'Agra - Taj Mahal Wonder',
    location: 'Agra',
    durationDays: 2,
    totalPrice: 15000,
    description: 'Witness the timeless beauty of the Taj Mahal and explore Agra Fort.',
    hotelIds: [new mongoose.Types.ObjectId()],
    adventureIds: [],
    imageUrl: 'https://placehold.co/600x400/a8a29e/ffffff?text=Agra'
  },
  {
    packageName: 'Delhi Historical Deep Dive',
    location: 'Delhi',
    durationDays: 3,
    totalPrice: 16000,
    description: 'Explore the historical monuments of Old and New Delhi.',
    hotelIds: [new mongoose.Types.ObjectId()],
    adventureIds: [],
    imageUrl: 'https://placehold.co/600x400/78716c/ffffff?text=Delhi'
  }
];

// --- 4. THE SEEDER FUNCTION ---
const seedDB = async () => {
  try {
    // Connect to the database
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding.');

    // Delete all existing packages
    await Package.deleteMany({});
    console.log('Existing packages deleted.');

    // Insert the new array of packages
    await Package.insertMany(packages);
    console.log('Database has been seeded with 15 new packages!');

  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

// --- 5. RUN THE FUNCTION ---
seedDB();
