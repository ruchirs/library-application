const bookController = require('../../controllers/book.controller');
const bookModel = require('../../models/Book');
const mocksHttp = require('node-mocks-http');
const newBooks = require('../mock-data/new-book.json')

//MOCK `find` method by overriding it with Jest fn
bookModel.find = jest.fn()
bookModel.save = jest.fn()

//Keeping global to be able to use raw values in the tests
let req, res, next;

//To prevent duplicate code in different test cases.
beforeEach(() => {
    req = mocksHttp.createRequest();
    res = mocksHttp.createResponse();
    next = null;
})

describe("bookController.books_list", () => {

    it("It should have a book_save function", () => {
        expect(typeof bookController.book_save).toBe("function")
    })

    it("It should call book_save function", () => {
        req.body = newBooks;
        bookController.book_save(req, res, next);
        expect(bookModel.save).toBeCalledWith(newBooks);
    })

    it("It should have a books_list function", () => {
        expect(typeof bookController.books_list).toBe("function")
    })

    it("It should call bookModel.find", () => {
        bookController.books_list();
        expect(bookModel.find).toBeCalled();
    })
})