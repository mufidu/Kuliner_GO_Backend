if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const Review = require('../models/review');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');

const mongoose = require('mongoose');

MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/kulinergo";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected!")
})

const seedDB = async () => {
    // Remove all users before seeding
    await Review.deleteMany({});

    const restaurants = await Restaurant.find({});
    const restaurantIDs = restaurants.map(restaurant => restaurant._id);

    const users = await User.find({});
    const userIDs = users.map(user => user._id);

    // Get a random user ID
    const getRandomUserID = () => {
        const randomIndex = Math.floor(Math.random() * userIDs.length);
        return userIDs[randomIndex];
    }

    // Get a random restaurant ID
    const getRandomRestaurantID = () => {
        const randomIndex = Math.floor(Math.random() * restaurantIDs.length);
        return restaurantIDs[randomIndex];
    }

    const reviews = [
        {
            user: getRandomUserID(),
            restaurant: getRandomRestaurantID(),
            rating: 5,
            comment: "Great food! Paling suka makan di sini kalo pulang kerja.",
        },
        {
            user: getRandomUserID(),
            restaurant: getRandomRestaurantID(),
            rating: 4,
            comment: "Good food! Makanannya enak, cuma tempat parkirnya aja yang kurang luas.",
        },
    ];

    for (review of reviews) {
        let newReview = new Review(review);
        await newReview.save();
    }

    console.log("Database seeded!")
    mongoose.connection.close();
}

seedDB();
