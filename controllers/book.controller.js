const Book = require("../models/Book");
const User = require("../models/User");

// Display list of total books in library.
exports.books_list = async (req, res, next) => {
  try {
    const list_books = await Book.find({});
    const availableBooks = list_books.filter((book) => {
      return book.status != "Borrowed";
    });
    res.json(availableBooks);
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
      status: "Available",
    });

    const saved_book = await Book.create(book);
    res.status(201).json(saved_book);
  } catch (err) {
    next(err);
  }
};

//update status of the specified book and user record
/*
  Steps:
  1. Find the User Record
  2. Check if the request is to BORROW or RETURN
  3. Check if USER has any books and then ADD or REMOVE BOOKS to complete the action
*/
exports.book_update = async (req, res, next) => {
  try {
    const userEmail = req.email;
    const currentBook = {
      _id: req.params.id,
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      summary: req.body.summary,
      id: req.params.id,
    };

    const userDetails = await User.findOne({ email: req.email });
    if (req.body.status === "Borrowed") {
      if (userDetails.booksId) {
        if (userDetails.booksId.length === 2) {
          return res.status(403).json({
            message: "Not Allowed: 2 books already borrowed",
          });
        } else if (
          userDetails.booksId.length >= 0 &&
          userDetails.booksId.length < 2
        ) {
          userDetails.booksId.push(currentBook);
        }
      }
    } else if (req.body.status === "Available") {
      if (userDetails.booksId) {
        if (userDetails.booksId.length > 0 && userDetails.booksId.length <= 2) {
          let removedBook = userDetails.booksId.filter((book) => {
            if (book.id != req.params.id) {
              return book;
            }
          });
          userDetails.booksId.length = 0;
          userDetails.booksId = [...removedBook];
        } else {
          return res.status(403).json({
            message: "You do not have any borrowed books",
          });
        }
      }
    }
    const updateUser = await User.findByIdAndUpdate(
      userDetails._id,
      userDetails,
      {},
      null
    );

    if (updateUser) {
      const updateBookStatus = new Book({
        _id: req.params.id,
        status: req.body.status,
        title: req.body.title,
        summary: req.body.summary,
        isbn: req.body.isbn,
        author: req.body.author,
      });

      const updateBook = await Book.findByIdAndUpdate(
        req.params.id,
        updateBookStatus,
        { new: true },
        null
      );
      res.json(updateBook);
    }
  } catch (err) {
    next(err);
  }
};
