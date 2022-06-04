if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

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
    // Remove all restaurants before seeding
    await Restaurant.deleteMany({});
    const restaurants = [
        {
            name: "McDonald's",
            location: "Cibaduyut",
            detail: "McDonald's adalah sebuah perusahaan yang bergerak di bidang fast food dan kopi. Didirikan pada tahun 1940, McDonald's merupakan perusahaan pertama di Indonesia yang menjual berbagai macam makanan dan minuman.",
            harga: "Rp.25.000 - Rp.100.000",
            rating: 4.5,
            phone: "0812-1234-1234",
            reviews: [],
            picture: "http://assets.kompasiana.com/items/album/2020/10/12/mcdonalds-5f8468188ede48780604a122.jpg",
        },
        {
            name: "KFC",
            location: "Dago Atas",
            detail: "KFC adalah sebuah franchise di Indonesia yang bergerak di bidang fast food fried chicken. Didirikan pada tahun 1957, KFC terkenal karena kualitasnya yang sangat baik.",
            harga: "Rp.25.000 - Rp.75.000",
            rating: 4.5,
            phone: "0812-1234-1234",
            reviews: [],
            picture: "https://pict.sindonews.net/dyn/620/pena/news/2021/06/25/178/465806/garagara-pandemi-emiten-pengelola-kfc-jadi-buntung-rp377-miliar-xyd.jpg",
        },
        {
            name: "Burger King",
            location: "Cileunyi",
            detail: "Burger King adalah sebuah franchise restaurant fast food yang terkenal akan burgernya yang lezat.",
            harga: "Rp.15.000 - Rp.130.000",
            rating: 4.9,
            phone: "0812-1234-3248",
            reviews: [],
            picture: "https://assets.entrepreneur.com/content/3x2/2000/1645822504-GettyImages-1370781946.jpg?crop=4:3",
        },
        {
            name: "Mie Gacoan",
            location: "Bojongsoang",
            detail: "Mie Gacoan adalah tempat makan mie viral karena tempatnya yang enak dan pedasnya yang mantap.",
            harga: "Rp.55.000 - Rp.105.000",
            rating: 4.5,
            phone: "0812-1234-1234",
            reviews: [],
            picture: "https://media.suara.com/pictures/653x366/2022/05/05/20409-tempat-parkir-mie-gacoan-gejayan-kamis-552022.jpg",
        },
        {
            name: "Kopi Kenangan",
            location: "Cibaduyut",
            detail: "Kopi Kenangan adalah kafe yang menyediakan kopi yang lezat dan berkualitas.",
            harga: "Rp.10.000 - Rp.45.000",
            rating: 4.3,
            phone: "0812-1234-1234",
            reviews: [],
            picture: "https://awsimages.detik.net.id/community/media/visual/2019/10/01/d65943e9-2514-4f61-9c4c-21bd77dd42e0_169.jpeg?w=700&q=90",
        },
    ];

    for (restaurant of restaurants) {
        let newRestaurant = new Restaurant(restaurant);
        await newRestaurant.save();
    }

    console.log("Database seeded!")
    mongoose.connection.close();
}

seedDB();
