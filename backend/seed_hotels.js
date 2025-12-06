const mongoose = require('mongoose');

// Make sure this is your correct connection string
const MONGO_URI = 'mongodb://127.0.0.1:27017/myHotelBookingApp';

// Make sure this path to your updated Hotel model is correct
const Hotel = require('./models/Hotel'); 

// --- New hotel data with REALISTIC image URLs ---
const hotels = [
  // Hotels in Munnar
  {
    name: 'Misty Mountain Resort',
    location: 'Munnar',
    address: 'Chithirapuram PO, Munnar',
    amenities: ['Free WiFi', 'Pool', 'Free Parking', 'Restaurant'],
    ownerId: new mongoose.Types.ObjectId(),
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
      { roomType: 'Standard', price: 3500, maxGuests: 2, amenities: ['TV', 'Fan'], roomCount: 10, bookings: [] },
      { roomType: 'Deluxe', price: 5000, maxGuests: 3, amenities: ['TV', 'AC', 'Balcony'], roomCount: 8, bookings: [] },
      { roomType: 'Suite', price: 8000, maxGuests: 4, amenities: ['TV', 'AC', 'Balcony', 'Mini Fridge'], roomCount: 4, bookings: [] }
    ]
  },
  {
    name: 'Tea Valley Resort',
    location: 'Munnar',
    address: 'Pothamedu, Munnar',
    amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'Tea Garden Tours'],
    ownerId: new mongoose.Types.ObjectId(),
    imageUrl: 'https://images.unsplash.com/photo-1621293954908-89795c1a7051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
      { roomType: 'Standard', price: 4000, maxGuests: 2, amenities: ['TV', 'AC'], roomCount: 12, bookings: [] },
      { roomType: 'Deluxe', price: 5500, maxGuests: 2, amenities: ['TV', 'AC', 'Plantation View'], roomCount: 6, bookings: [] }
    ]
  },
  // Hotels in Kochi
  {
    name: 'Kochi Marriott Hotel',
    location: 'Kochi',
    address: 'Lulu International Shopping Mall, Edappally',
    amenities: ['Pool', 'Spa', 'Fitness Center', 'Bar'],
    ownerId: new mongoose.Types.ObjectId(),
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
      { roomType: 'Standard', price: 7000, maxGuests: 2, amenities: ['TV', 'AC', 'City View'], roomCount: 20, bookings: [] },
      { roomType: 'Suite', price: 12000, maxGuests: 3, amenities: ['TV', 'AC', 'Bathtub', 'Lounge Access'], roomCount: 10, bookings: [] }
    ]
  },
  {
    name: 'Grand Hyatt Kochi Bolgatty',
    location: 'Kochi',
    address: 'Bolgatty, Mulavukad',
    amenities: ['Waterfront', 'Pool', 'Spa', 'Multiple Restaurants'],
    ownerId: new mongoose.Types.ObjectId(),
    imageUrl: 'https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
      { roomType: 'Standard', price: 9500, maxGuests: 2, amenities: ['TV', 'AC', 'Backwater View'], roomCount: 25, bookings: [] },
      { roomType: 'Deluxe', price: 12500, maxGuests: 3, amenities: ['TV', 'AC', 'Backwater View', 'Balcony'], roomCount: 15, bookings: [] },
      { roomType: 'Suite', price: 20000, maxGuests: 4, amenities: ['TV', 'AC', 'Separate Living Room', 'Club Access'], roomCount: 5, bookings: [] }
    ]
  },
  // Hotels in Alappuzha (Alleppey)
  {
    name: 'Alleppey Houseboat Stay',
    location: 'Alappuzha',
    address: 'Finishing Point, Alappuzha',
    amenities: ['Private Chef', 'AC Bedrooms', 'Sightseeing Cruise'],
    ownerId: new mongoose.Types.ObjectId(),
    imageUrl: 'https://images.unsplash.com/photo-1603833219077-3e913a48e79e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
      { roomType: 'Suite', price: 15000, maxGuests: 4, amenities: ['Full Board', 'Sunset Cruise'], roomCount: 1, bookings: [] }
    ]
  },
  {
    name: 'The Zuri Kumarakom',
    location: 'Kumarakom',
    address: 'V 235 A1 to A54, Karottukayal',
    amenities: ['Lakefront', 'Spa', 'Pool', 'Yoga'],
    ownerId: new mongoose.Types.ObjectId(),
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
        { roomType: 'Standard', price: 11000, maxGuests: 2, amenities: ['Garden View', 'AC'], roomCount: 15, bookings: [] },
        { roomType: 'Deluxe', price: 14000, maxGuests: 3, amenities: ['Lake View', 'AC', 'Balcony'], roomCount: 10, bookings: [] }
    ]
  },
  {
      name: 'Taj Malabar Resort & Spa',
      location: 'Kochi',
      address: 'Willingdon Island',
      amenities: ['Heritage Wing', 'Sea View', 'Jiva Spa', 'Pool'],
      ownerId: new mongoose.Types.ObjectId(),
      imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
      rooms: [
          { roomType: 'Standard', price: 13000, maxGuests: 2, amenities: ['AC', 'Harbour View'], roomCount: 30, bookings: [] },
          { roomType: 'Suite', price: 25000, maxGuests: 4, amenities: ['AC', 'Living Room', 'Sea View'], roomCount: 8, bookings: [] }
      ]
  },
  {
      name: 'Spice Village',
      location: 'Thekkady',
      address: 'Kumily',
      amenities: ['Eco-friendly', 'No AC/TV', 'Pool', 'Nature Walks'],
      ownerId: new mongoose.Types.ObjectId(),
      imageUrl: 'https://images.unsplash.com/photo-1619623695972-881b3738e4a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
          { roomType: 'Standard', price: 8500, maxGuests: 2, amenities: ['Thatched Roof', 'Verandah'], roomCount: 20, bookings: [] },
          { roomType: 'Deluxe', price: 11500, maxGuests: 3, amenities: ['Private Garden', 'Spacious'], roomCount: 10, bookings: [] }
      ]
  },
  {
      name: 'Brunton Boatyard',
      location: 'Kochi',
      address: 'Fort Kochi',
      amenities: ['Heritage Hotel', 'Sea Facing', 'History Tours'],
      ownerId: new mongoose.Types.ObjectId(),
      imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
          { roomType: 'Standard', price: 10000, maxGuests: 2, amenities: ['AC', 'Sea View'], roomCount: 15, bookings: [] },
          { roomType: 'Deluxe', price: 14000, maxGuests: 2, amenities: ['AC', 'Sea View', 'Balcony'], roomCount: 7, bookings: [] }
      ]
  },
   {
    name: 'Fragrant Nature Kochi',
    location: 'Kochi',
    address: 'Near St. Thomas Church, Bazaar Road, Mattancherry',
    amenities: ['Rooftop Pool', 'Contemporary Design', 'Wellness Spa'],
    ownerId: new mongoose.Types.ObjectId(),
    imageUrl: 'https://images.unsplash.com/photo-1590447158019-883d8d5f8b7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
      { roomType: 'Standard', price: 8500, maxGuests: 2, amenities: ['AC', 'City View'], roomCount: 20, bookings: [] },
      { roomType: 'Deluxe', price: 10500, maxGuests: 2, amenities: ['AC', 'Harbour View'], roomCount: 15, bookings: [] },
      { roomType: 'Suite', price: 15000, maxGuests: 3, amenities: ['AC', 'Living Area', 'Harbour View'], roomCount: 6, bookings: [] }
    ]
  },
  {
    name: 'Marari Beach Resort',
    location: 'Mararikulam',
    address: 'Mararikulam, S.L. Puram P.O, Alappuzha',
    amenities: ['Beach Access', 'Ayurveda Centre', 'Pool', 'Organic Farm'],
    ownerId: new mongoose.Types.ObjectId(),
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
      { roomType: 'Standard', price: 12000, maxGuests: 2, amenities: ['AC', 'Garden Villa'], roomCount: 25, bookings: [] },
      { roomType: 'Deluxe', price: 16000, maxGuests: 3, amenities: ['AC', 'Private Pool Villa'], roomCount: 10, bookings: [] }
    ]
  },
  {
    name: 'Wayanad Wild',
    location: 'Wayanad',
    address: 'Lakkidi, Vythiri',
    amenities: ['Rainforest Location', 'Trekking', 'Bird Watching', 'Pool'],
    ownerId: new mongoose.Types.ObjectId(),
    imageUrl: 'https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
      { roomType: 'Standard', price: 9000, maxGuests: 2, amenities: ['AC', 'Forest View'], roomCount: 18, bookings: [] },
      { roomType: 'Deluxe', price: 12000, maxGuests: 3, amenities: ['AC', 'Balcony', 'Spacious'], roomCount: 12, bookings: [] }
    ]
  },
  {
    name: 'The Leela Kovalam',
    location: 'Kovalam',
    address: 'Beach Rd, Thiruvananthapuram',
    amenities: ['Cliff-top', 'Infinity Pools', 'Private Beach', 'Spa'],
    ownerId: new mongoose.Types.ObjectId(),
    imageUrl: 'https://images.unsplash.com/photo-1615880352125-99345846f142?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
      { roomType: 'Standard', price: 15000, maxGuests: 2, amenities: ['AC', 'Garden View'], roomCount: 50, bookings: [] },
      { roomType: 'Deluxe', price: 20000, maxGuests: 2, amenities: ['AC', 'Ocean View'], roomCount: 40, bookings: [] },
      { roomType: 'Suite', price: 35000, maxGuests: 4, amenities: ['AC', 'Club Access', 'Plunge Pool'], roomCount: 10, bookings: [] }
    ]
  },
  {
    name: 'Niraamaya Retreats',
    location: 'Kovalam',
    address: 'Pulinkudi, Mullur P.O., Thiruvananthapuram',
    amenities: ['Private Beach', 'Heritage Cottages', 'Yoga', 'Infinity Pool'],
    ownerId: new mongoose.Types.ObjectId(),
    imageUrl: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
      { roomType: 'Standard', price: 14000, maxGuests: 2, amenities: ['AC', 'Heritage Cottage'], roomCount: 15, bookings: [] },
      { roomType: 'Deluxe', price: 19000, maxGuests: 2, amenities: ['AC', 'Sea View', 'Private Courtyard'], roomCount: 10, bookings: [] }
    ]
  },
  {
      name: 'Poovar Island Resort',
      location: 'Poovar',
      address: 'K.P. VII/911, Pozhiyoor',
      amenities: ['Floating Cottages', 'Backwater Access', 'Ayurveda'],
      ownerId: new mongoose.Types.ObjectId(),
      imageUrl: 'https://images.unsplash.com/photo-1598504221334-85dc0211623a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    rooms: [
          { roomType: 'Standard', price: 7500, maxGuests: 2, amenities: ['Land Cottage', 'AC'], roomCount: 20, bookings: [] },
          { roomType: 'Deluxe', price: 10500, maxGuests: 2, amenities: ['Floating Cottage', 'AC'], roomCount: 10, bookings: [] }
      ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding hotels.');

    // Delete all existing hotels to start fresh
    await Hotel.deleteMany({});
    console.log('Existing hotels deleted.');

    // Insert the new array of hotels
    await Hotel.insertMany(hotels);
    console.log('New hotels have been seeded successfully!');

  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

seedDB();

