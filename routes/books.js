const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const isAuth = require("../middleware/auth")

/**
 * 
 * isAuth is a middleware that checks if the jwt token is valid
 */

//All Books Route [Default on /books temproarily until auth module is developed]
router.get("/", isAuth, bookController.books_list);

// Create New Book
router.post("/create", isAuth, bookController.book_save);

//Update status of the book
router.post("/:id/update", isAuth, bookController.book_update)

module.exports = router;
