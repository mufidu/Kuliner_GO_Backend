const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Review', reviewSchema);
