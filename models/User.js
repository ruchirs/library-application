const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },

    booksId: {
        type: Array,
        default: []
    },

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', User)