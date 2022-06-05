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

router.get('/', (req, res) => {
    Review.find({}).then((review) => {
        res.send(review);
    })
});

router.get('/new', (req, res) => {
    res.send('Adding new review');
})

router.post('/', async (req, res) => {
    const review = new Review(req.body)
    const user = await User.findOne({ id: req.body.user })
    const restaurant = await Restaurant.findOne({ id: req.body.restaurant })
    review.save().then((review) => {
        res.send('Review for ' + restaurant.name + ' by ' + user.username + ' with ' + review.rating + ' stars added')
    })
})

router.put('/edit/:id', async (req, res) => {
    const review = await Review.findById(req.params.id)
    const user = await User.findById(review.user)
    const restaurant = await Restaurant.findById(review.restaurant)
    res.send("Editing review by " + user.username + " for " + restaurant.name)
})

router.get('/:id', async (req, res) => {
    const review = await Review.findOne({ id: req.params._id })
    const user = await User.findById(review.user)
    const restaurant = await Restaurant.findById(review.restaurant)
    res.send(user.username + " reviewed " + restaurant.name + " with " + review.rating + " stars")
})

module.exports = router
