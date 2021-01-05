const Books = require('../models/Book')


// Display list of total books in library.
exports.books_list = function(req, res, next) {
    Books.find()
  
  };


// Save book to Database
exports.book_save = function(req, res, next) {
    Books.save()
}
