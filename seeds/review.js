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

    // Get username from user ID
    const getUsername = async (userID) => {
        const user = await User.findById(userID);
        return user.username;
    }

    // Get pictures from user ID
    const getPictures = async (userID) => {
        const user = await User.findById(userID);
        return user.picture;
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
        {
            user: getRandomUserID(),
            restaurant: getRandomRestaurantID(),
            rating: 3,
            comment: "Makanannya enak tapi pelayanan kurang ramah.",
        },
        {
            user: getRandomUserID(),
            restaurant: getRandomRestaurantID(),
            rating: 5,
            comment: "Enak pol.",
        },
        {
            user: getRandomUserID(),
            restaurant: getRandomRestaurantID(),
            rating: 5,
            comment: "Superb!",
        },
        {
            user: getRandomUserID(),
            restaurant: getRandomRestaurantID(),
            rating: 4,
            comment: "B aja tapi nyaman.",

        },
        {
            user: getRandomUserID(),
            restaurant: getRandomRestaurantID(),
            rating: 4,
            comment: "Enak banget.",
        },
        {
            user: getRandomUserID(),
            restaurant: getRandomRestaurantID(),
            rating: 5,
            comment: "Puas!",
        },
        {
            user: getRandomUserID(),
            restaurant: getRandomRestaurantID(),
            rating: 5,
            comment: "Fantastic!",
        },
        {
            user: getRandomUserID(),
            restaurant: getRandomRestaurantID(),
            rating: 5,
            comment: "Great experience!",
        },
        {
            user: getRandomUserID(),
            restaurant: getRandomRestaurantID(),
            rating: 4,
            comment: "Good food!",
        },
        {
            user: getRandomUserID(),
            restaurant: getRandomRestaurantID(),
            rating: 5,
            comment: "Great food!",
        },
        {
            user: getRandomUserID(),
            restaurant: getRandomRestaurantID(),
            rating: 5,
            comment: "Mantap jiwah!",
        },
    ];

    for (review of reviews) {
        review.username = await getUsername(review.user);
        review.picture = await getPictures(review.user);
        let newReview = new Review(review);
        await newReview.save();

    }

    // Add reviews to restaurants
    for (restaurant of restaurants) {
        // Select only username and picture from users
        let reviews = await Review.find({ restaurant: restaurant._id }).select('-_id -__v -restaurant -user');
        restaurant.reviews = reviews;
        await restaurant.save();
    }

    console.log("Database seeded!")
    mongoose.connection.close();
}

seedDB();
