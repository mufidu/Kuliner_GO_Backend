if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const Review = require('../models/review');

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
    const reviews = [
        {
            user: "6299870b0aee2c3904f70152",
            restaurant: "62996f6cc282bae78541035b",
            rating: 5,
            comment: "Great food! Paling suka makan di sini kalo pulang kerja.",
        },
        {
            user: "6299870b0aee2c3904f70154",
            restaurant: "62996f6cc282bae78541035d",
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
