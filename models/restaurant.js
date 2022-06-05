const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    harga: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0
    },
    phone: {
        type: String
    },
    reviews: {
        type: [{
            username: String,
            review: String,
            rating: Number,
            picture: String,
            comment: String
        }]
    },
    picture: {
        type: String,
    },
    openHours: {
        type: String,
    },
    menu: {
        type: [String],
    },
    facilities: {
        type: [String],
    },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
