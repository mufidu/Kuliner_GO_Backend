const express = require('express')
const User = require('./../models/user')
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

// Get all users
router.get('/', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    })
});

// Get a user's detail
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.send(user)
})

module.exports = router
