const express = require('express')
const Review = require('./../models/review')
const User = require('./../models/user')
const Restaurant = require('./../models/restaurant')
const router = express.Router()

router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Get all reviews
router.get('/', (req, res) => {
    Review.find({}).then((review) => {
        res.send(review);
    })
});

// Get page of new review form (unfinished)
router.get('/new', (req, res) => {
    res.send('Adding new review');
})

// Add new review
router.post('/', async (req, res) => {
    const review = new Review(req.body)
    const user = await User.findById(review.user)
    const restaurant = await Restaurant.findById(review.restaurant)
    review.save().then((review) => {
        res.send('Review for ' + restaurant.name + ' by ' + user.username + ' with ' + review.rating + ' stars added')
    })
})

// Edit a review
router.put('/edit/:id', async (req, res) => {
    const review = await Review.findById(req.params.id)
    const user = await User.findById(review.user)
    const restaurant = await Restaurant.findById(review.restaurant)
    res.send("Editing review by " + user.username + " for " + restaurant.name)
})

// Get a review's detail
router.get('/:id', async (req, res) => {
    const review = await Review.findById(req.params.id)
    const user = await User.findById(review.user)
    const restaurant = await Restaurant.findById(review.restaurant)
    res.send(user.username + " reviewed " + restaurant.name + " with " + review.rating + " stars")
})

// Delete a review
router.delete('/:id', async (req, res) => {
    Review.findByIdAndRemove(req.params.id).then((review) => {
        res.send(review)
    })
})

module.exports = router
