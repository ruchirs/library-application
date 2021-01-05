const bookController = require('../../controllers/book.controller');
const bookModel = require('../../models/Book');
const mocksHttp = require('node-mocks-http');

//MOCK `find` method by overriding it with Jest fn
bookModel.find = jest.fn()
bookModel.save = jest.fn()

describe("bookController.books_list", () => {

    it("It should have a book_save function", () => {
        expect(typeof bookController.book_save).toBe("function")
    })

    it("It should call book_save function", () => {
        bookController.book_save();
        expect(bookModel.save).toBeCalled();
    })

    it("It should have a books_list function", () => {
        expect(typeof bookController.books_list).toBe("function")
    })

    it("It should call bookModel.find", () => {
        bookController.books_list();
        expect(bookModel.find).toBeCalled();
    })
})