const express = require('express')
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
    Restaurant.find({}).then((restaurants) => {
        res.send(restaurants);
    })
});

// router.get('/new', (req, res) => {
//     res.send('Adding new restaurant');
// })

// router.get('/edit/:id', async (req, res) => {
//     const restaurant = await Restaurant.findById(req.params.id)
//     res.send("Editing " + restaurant.name)
// })

router.get('/:id', async (req, res) => {
    const restaurant = await Restaurant.findOne({ id: req.params._id })
    res.send(restaurant)
})

module.exports = router
