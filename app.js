const express = require('express');
const app = express();
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/kulinergo';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected!")
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/restaurants', require('./routers/restaurant'));
app.use('/users', require('./routers/user'));
app.use('/reviews', require('./routers/review'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
