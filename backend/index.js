// index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Hotel = require('./models/Hotel'); // 1. Import the Hotel model
const Adventure = require('./models/Adventure');
const Package = require('./models/Package');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');
const Booking = require('./models/Booking'); 
const Review = require('./models/Review');



const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json()); // 2. Add this line

// --- Connect to MongoDB ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/myHotelBookingApp')
    .then(() => console.log('MongoDB connected successfully.'))
    .catch((err) => console.error('MongoDB connection error:', err));

// --- API ROUTES ---

// Test Route
app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Booking API!');
});

// 3. Create a POST route to add a new hotel
app.post('/hotels', authMiddleware, async (req, res) => {
    try {
        const newHotel = new Hotel({
            // Use all the text fields from the request body
            ...req.body,
            // Get the owner's ID from the token, not the body. This is more secure!
            ownerId: req.user.userId
        });
        await newHotel.save();
        res.status(201).send(newHotel);
    } catch (error) {
        res.status(400).send({ message: "Error creating hotel", error: error });
    }
});

// Add this entire block to your server.js file

// In your backend server file, UPDATE the GET /hotels route

app.get('/hotels', async (req, res) => {
    try {
        const { location, checkin, checkout } = req.query;

        if (!location || !checkin || !checkout) {
            return res.status(400).json({ message: "Location, check-in, and check-out dates are required." });
        }

        const userStartDate = new Date(checkin);
        const userEndDate = new Date(checkout);

        const availableHotels = await Hotel.aggregate([
            // Stage 1: Find all hotels in the requested location (same as before)
            { $match: { location: { $regex: new RegExp(location, 'i') } } },
            
            // Stage 2: Create a separate document for each room (same as before)
            { $unwind: "$rooms" },

            // --- 👇 THE LOGIC CHANGE IS HERE 👇 ---
            // Stage 3: Use $lookup to find conflicting bookings from the 'bookings' collection
            {
                $lookup: {
                    from: "bookings", // The name of your separate Booking collection
                    let: { roomId: "$rooms._id" }, // Define a variable for the room's ID
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$room", "$$roomId"] }, // Match bookings for this specific room
                                        // Check for date conflicts
                                        { $lt: ["$checkinDate", userEndDate] },
                                        { $gt: ["$checkoutDate", userStartDate] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "conflictingBookings" // Store the array of conflicting bookings in this new field
                }
            },
            // --- 👆 END OF LOGIC CHANGE 👆 ---

            // Stage 4: Add a field with the count of conflicting bookings
            {
                $addFields: {
                    "rooms.conflictingBookingsCount": { $size: "$conflictingBookings" }
                }
            },

            // Stage 5: Keep only the rooms that are available (same logic as before)
            { $match: { $expr: { $lt: ["$rooms.conflictingBookingsCount", "$rooms.roomCount"] } } },

            // Stage 6: Group the results back into hotel documents (same as before)
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    location: { $first: "$location" },
                    imageUrl: { $first: "$imageUrl" },
                    amenities: { $first: "$amenities" },
                    availableRooms: { $push: "$rooms" } 
                }
            }
        ]);
        
        res.status(200).json(availableHotels);

    } catch (error) {
        console.error("Error fetching hotels:", error);
        res.status(500).json({ message: "Failed to fetch hotels", error: error.message });
    }
});

// GET route to fetch a single hotel by its ID
app.get('/hotels/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).send({ message: "Hotel not found" });
        }
        res.status(200).send(hotel);
    } catch (error) {
        res.status(500).send({ message: "Error fetching hotel", error: error });
    }
});


// Add this route to your Express app
// It handles requests like: GET /hotels/some-hotel-id/rooms/some-room-id/availability?checkin=...&checkout=...

// In server.js, UPDATE your existing availability route

app.get('/hotels/:hotelId/rooms/:roomId/availability', async (req, res) => {
    try {
        // ... (getting params, finding hotel & room is the same)
        const { hotelId, roomId } = req.params;
        const { checkin, checkout } = req.query;
        const userStartDate = new Date(checkin);
        const userEndDate = new Date(checkout);

        const hotel = await Hotel.findById(hotelId);
        const room = hotel.rooms.find(r => r._id.toString() === roomId);
        if (!room) return res.status(404).json({ message: "Room not found" });

        // --- 👇 THE LOGIC CHANGE IS HERE 👇 ---
        // Find all bookings for THIS room that conflict with the user's dates
        const conflictingBookings = await Booking.countDocuments({
            room: roomId,
            $and: [
                { checkinDate: { $lt: userEndDate } },
                { checkoutDate: { $gt: userStartDate } }
            ]
        });
        // --- 👆 END OF LOGIC CHANGE 👆 ---
        
        // ... (calculating price is the same)
        const numberOfNights = (userEndDate - userStartDate) / (1000 * 60 * 60 * 24);
        const totalPrice = room.price * numberOfNights;

        if (conflictingBookings < room.roomCount) {
            res.status(200).json({ 
                available: true, 
                price: totalPrice,
                // also send back other details for the summary card
                name: room.roomType,
                location: hotel.location,
                imageUrl: hotel.imageUrl
            });
        } else {
            // ... (send unavailable response)
        }
    } catch (error) {
        // ... (error handling)
    }
});
// PATCH route to update an existing hotel by its ID
app.patch('/hotels/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!hotel) {
            return res.status(404).send({ message: "Hotel not found" });
        }
        res.status(200).send(hotel);
    } catch (error) {
        res.status(400).send({ message: "Error updating hotel", error: error });
    }
});

// DELETE route to remove a hotel by its ID
app.delete('/hotels/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return res.status(404).send({ message: "Hotel not found" });
        }
        res.status(200).send({ message: "Hotel deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting hotel", error: error });
    }
});

// --- USER ROUTES ---

// POST route to REGISTER a new user
app.post('/users/register', async (req, res) => {
    try {
        // 1. Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send({ message: "Email already in use." });
        }

        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // 3. Create a new user with the hashed password
        const newUser = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        });

        // 4. Save the user and send response
        await newUser.save();
        res.status(201).send({ message: "User created successfully" });

    } catch (error) {
        res.status(500).send({ message: "Error creating user", error: error });
    }
});

// POST route to LOGIN a user
app.post('/users/login', async (req, res) => {
    try {
        // 1. Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ message: "Invalid email or password." });
        }

        // 2. Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid email or password." });
        }

        // 3. If passwords match, create a JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role, name: user.fullName }, // Payload: data to store in the token
            process.env.JWT_SECRET, // Secret key for signing (should be in .env)
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // 4. Send the token back to the client
        res.status(200).send({ message: "Logged in successfully", token: token });

    } catch (error) {
        res.status(500).send({ message: "Error logging in", error: error });
    }
});

// GET route to fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: "Error fetching users", error: error });
    }
});

// GET route to fetch a single user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: "Error fetching user", error: error });
    }
});

// PATCH route to update a user by ID
app.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ message: "Error updating user", error: error });
    }
});

// DELETE route to remove a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting user", error: error });
    }
});

// --- ADVENTURE ROUTES ---
app.post('/adventures', async (req, res) => {
    try {
        const adventure = new Adventure(req.body);
        await adventure.save();
        res.status(201).send(adventure);
    } catch (error) { res.status(400).send(error); }
});

// In your backend server file (e.g., server.js)

app.get('/adventures', async (req, res) => {
    try {
        const { location, option } = req.query;

        const filter = {};
        if (location) {
            filter.location = { $regex: new RegExp(location, 'i') };
        }
        
        // --- THIS IS THE CORRECTED LOGIC ---
        // It tells MongoDB to look inside the 'tags' array for an element
        // that matches the option, ignoring case.
        if (option) {
            filter.tags = { $regex: option, $options: 'i' };
        }
        // ------------------------------------
        
        // Let's log the exact filter we're sending to the database
        console.log("Searching adventures with filter:", filter);

        const adventures = await Adventure.find(filter);
        
        res.status(200).json(adventures);

    } catch (error) { 
        console.error("Error fetching adventures:", error);
        res.status(500).json({ message: "Failed to fetch adventures", error: error.message }); 
    }
});

app.get('/adventures/:id', async (req, res) => {
    try {
        const adventure = await Adventure.findById(req.params.id);
        if (!adventure) return res.status(404).send();
        res.status(200).send(adventure);
    } catch (error) { res.status(500).send(error); }
});

app.patch('/adventures/:id', async (req, res) => {
    try {
        const adventure = await Adventure.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!adventure) return res.status(404).send();
        res.status(200).send(adventure);
    } catch (error) { res.status(400).send(error); }
});

app.delete('/adventures/:id', async (req, res) => {
    try {
        const adventure = await Adventure.findByIdAndDelete(req.params.id);
        if (!adventure) return res.status(404).send();
        res.status(200).send({ message: "Adventure deleted" });
    } catch (error) { res.status(500).send(error); }
});

// --- PACKAGE ROUTES ---
app.post('/packages', async (req, res) => {
    try {
        const pkg = new Package(req.body);
        await pkg.save();
        res.status(201).send(pkg);
    } catch (error) { res.status(400).send(error); }
});

// In your backend index.js file

app.get('/packages', async (req, res) => {
    try {
        const { location } = req.query;

        const filter = {};
        if (location) {
            // This assumes your Package model has a 'location' field
            filter.location = { $regex: new RegExp(location, 'i') };
        }

        console.log("Searching packages with filter:", filter); // For debugging
        const packages = await Package.find(filter);

        res.status(200).json(packages); // Use .json() to be safe

    } catch (error) {
        console.error("Error fetching packages:", error);
        res.status(500).json({ message: "Failed to fetch packages" });
    }
});
app.get('/packages/:id', async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (!pkg) return res.status(404).send();
        res.status(200).send(pkg);
    } catch (error) { res.status(500).send(error); }
});

app.patch('/packages/:id', async (req, res) => {
    try {
        const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!pkg) return res.status(404).send();
        res.status(200).send(pkg);
    } catch (error) { res.status(400).send(error); }
});

app.delete('/packages/:id', async (req, res) => {
    try {
        const pkg = await Package.findByIdAndDelete(req.params.id);
        if (!pkg) return res.status(404).send();
        res.status(200).send({ message: "Package deleted" });
    } catch (error) { res.status(500).send(error); }
});

// --- BOOKING ROUTES ---

app.post('/bookings', async (req, res) => {
    try {
        const {
            userId,
            hotelId,
            roomId,
            guestName,
            checkin,
            checkout,
            numberOfNights,
            totalPrice
        } = req.body;

        // Optional but recommended: Do one last availability check here 
        // to prevent double-bookings in the time it took the user to fill the form.

        const newBooking = new Booking({
            user: userId,
            hotel: hotelId,
            room: roomId,
            guestName: guestName,
            checkinDate: new Date(checkin),
            checkoutDate: new Date(checkout),
            numberOfNights: numberOfNights,
            totalPrice: totalPrice
        });

        await newBooking.save();

        res.status(201).json({ message: 'Booking created successfully!', booking: newBooking });

    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: 'Failed to create booking' });
    }
});

app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).send(bookings);
    } catch (error) { res.status(500).send(error); }
});

app.get('/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).send();
        res.status(200).send(booking);
    } catch (error) { res.status(500).send(error); }
});

app.patch('/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!booking) return res.status(404).send();
        res.status(200).send(booking);
    } catch (error) { res.status(400).send(error); }
});

app.delete('/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).send();
        res.status(200).send({ message: "Booking deleted" });
    } catch (error) { res.status(500).send(error); }
});

// --- REVIEW ROUTES ---
app.post('/reviews', async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).send(review);
    } catch (error) { res.status(400).send(error); }
});

app.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).send(reviews);
    } catch (error) { res.status(500).send(error); }
});

app.get('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).send();
        res.status(200).send(review);
    } catch (error) { res.status(500).send(error); }
});

app.patch('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!review) return res.status(404).send();
        res.status(200).send(review);
    } catch (error) { res.status(400).send(error); }
});

app.delete('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).send();
        res.status(200).send({ message: "Review deleted" });
    } catch (error) { res.status(500).send(error); }
});




// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});