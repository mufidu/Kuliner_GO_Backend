if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const User = require('../models/user');

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
    await User.deleteMany({});
    const users = [
        {
            username: "David",
            password: "12345",
            email: "david@gmail.com",
            picture: "https://thispersondoesnotexist.com/image",
            address: "Cibaduyut",
        },
        {
            username: "Ricky",
            password: "12345",
            email: "ricky@gmail.com",
            picture: "https://thispersondoesnotexist.com/image",
            address: "Bojongsoang",
        },
        {
            username: "Sebastian",
            password: "12345",
            email: "sebastian@gmail.com",
            picture: "https://thispersondoesnotexist.com/image",
            address: "Cileunyi",
        },
        {
            username: "Alex",
            password: "12345",
            email: "alex@gmail.com",
            picture: "https://thispersondoesnotexist.com/image",
            address: "Buah Batu",
        },
        {
            username: "Tony",
            password: "12345",
            email: "tony@gmail.com",
            picture: "https://thispersondoesnotexist.com/image",
            address: "Cibiru",
        }
    ];

    for (user of users) {
        let newUsers = new User(user);
        await newUsers.save();
    }

    console.log("Database seeded!")
    mongoose.connection.close();
}

seedDB();
