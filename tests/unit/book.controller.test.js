const bookController = require("../../controllers/book.controller");
const bookModel = require("../../models/Book");
const mocksHttp = require("node-mocks-http");
const newBooks = require("../mock-data/new-book.json");

//MOCK `find` & `create` method by overriding it with Jest fn
bookModel.find = jest.fn();
bookModel.create = jest.fn();
//Keeping global to be able to use raw values in the tests
let req, res, next;

//To prevent duplicate code in different test cases. (DRY)
beforeEach(() => {
  req = mocksHttp.createRequest();
  res = mocksHttp.createResponse();
  next = jest.fn();
});

describe("bookController.books_list", () => {
  // Assigned request body to prevent duplicate code (DRY)
  beforeEach(() => {
    req.body = newBooks;
  });

  it("should have a book_save function", () => {
    expect(typeof bookController.book_save).toBe("function");
  });

  it("should expect a response code of 200 after successful completion",  async () => {
    await bookController.book_save(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return JSON body in response", () => {
    bookModel.create.mockReturnValue(newBooks);
    bookController.book_save(req, res, next);
    var data = JSON.parse(JSON.stringify(res));
    expect(newBooks.name).toStrictEqual(data.name);
  });

  it("should have a books_list function", () => {
    expect(typeof bookController.books_list).toBe("function");
  });

  it("should call bookModel.find", () => {
    bookController.books_list();
    expect(bookModel.find).toBeCalled();
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Unexpected Error" };
    const rejectedPromise = Promise.reject(errorMessage);
    bookModel.create.mockReturnValue(rejectedPromise);
    await bookController.book_save(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
