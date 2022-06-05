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
            picture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            address: "Cibaduyut",
        },
        {
            username: "Ricky",
            password: "12345",
            email: "ricky@gmail.com",
            picture: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            address: "Bojongsoang",
        },
        {
            username: "Sebastian",
            password: "12345",
            email: "sebastian@gmail.com",
            picture: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            address: "Cileunyi",
        },
        {
            username: "Alex",
            password: "12345",
            email: "alex@gmail.com",
            picture: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            address: "Buah Batu",
        },
        {
            username: "Tony",
            password: "12345",
            email: "tony@gmail.com",
            picture: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            address: "Cibiru",
        },
        {
            username: "Viona",
            password: "12345",
            email: "viona@gmail.com",
            picture: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            address: "Cibaduyut",
        },
        {
            username: "Angelina",
            password: "12345",
            email: "angelina@gmail.com",
            picture: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            address: "Cibiru",
        },
        {
            username: "Sophia",
            password: "12345",
            email: "sophia@gmail.com",
            picture: "https://images.pexels.com/photos/372042/pexels-photo-372042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            address: "Baleendah"
        },
        {
            username: "Luna",
            password: "12345",
            email: "luna@gmail.com",
            picture: "https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            address: "Buah Batu"
        },
        {
            username: "Karen",
            password: "12345",
            email: "karen@gmail.com",
            picture: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            address: "Antapani"
        },
        {
            username: "Lily",
            password: "12345",
            email: "lily@gmail.com",
            picture: "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            address: "Dago Atas"
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
