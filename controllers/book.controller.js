const Book = require("../models/Book");

// Display list of total books in library.
exports.books_list = async (req, res, next) => {
  try {
    const list_books = await Book.find({});
    res.json(list_books);
  } catch (err) {
    next(err);
  }
};

// Save book to Database
exports.book_save = async (req, res, next) => {
  try {
    const book = new Book({
      title: req.body.title,
      summary: req.body.summary,
      author: req.body.author,
      isbn: req.body.isbn,
    });

    const saved_book = await Book.create(book);
    res.status(201).json(saved_book);
  } catch (err) {
    next(err);
  }
};

