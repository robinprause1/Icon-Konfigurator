const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    prename: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: {
        type: Array,
        required: false
    },
    history: {
        type: Array,
        required: false
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;