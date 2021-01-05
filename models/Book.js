const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    isbn:{
        type: String,
        required: true
    }
    
})

mongoose.model('Book', bookSchema)