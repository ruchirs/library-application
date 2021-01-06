const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

//All Books Route [Default on /books temproarily until auth module is developed]
router.get("/", bookController.books_list);

// Create New Book
router.post("/create", bookController.book_save);

module.exports = router;
