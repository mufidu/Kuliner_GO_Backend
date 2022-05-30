const mongoose = require('mongoose');
const schema = mongoose.schema; 

const userschema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    picture: {
        data: Buffer,
        contentType: String
    },
    address: {
        type: String,
        required: true
    } 
});