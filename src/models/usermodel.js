const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    mobilenumber: {
        type: Number,
    },
    dob: {
        type: Date,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
    },
    gender: {
        type: String
    }
})


const user_data = new mongoose.model('user_data', userSchema)

module.exports = user_data