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

// Get username and pictures from user
// reviewSchema.virtual('username').get(function () {
//     return this.user.username;
// });

// reviewSchema.virtual('pictures').get(function () {
//     return this.user.pictures;
// });

module.exports = mongoose.model('Review', reviewSchema);
