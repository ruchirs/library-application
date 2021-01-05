const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book.controller')

//All Books Route [Default on /books temproarily until auth module is developed]
router.get('/books', bookController.books_list)

// Create New Book 
router.post('/book/create', bookController.book_save)

module.exports = router