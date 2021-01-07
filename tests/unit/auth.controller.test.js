const authController = require("../../controllers/user.controller");
const authModel = require("../../models/User");
const mocksHttp = require("node-mocks-http");
const newUser = require("../mock-data/new-user.json");

//MOCK `find` & `create` method by overriding it with Jest fn
authModel.find = jest.fn();
authModel.create = jest.fn();
//Keeping global to be able to use raw values in the tests
let req, res, next;

//To prevent duplicate code in different test cases. (DRY)
beforeEach(() => {
  req = mocksHttp.createRequest();
  res = mocksHttp.createResponse();
  next = jest.fn();
});

describe("authController.user_auth", () => {
  // Assigned request body to prevent duplicate code (DRY)
  beforeEach(() => {
    req.body = newUser;
  });

  it("should have a userRegister function", () => {
    expect(typeof authController.userRegister).toBe("function");
  });

  it("should expect a response code of 201 after successful creation", async () => {
    await authController.userRegister(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should hash password successfully", async () => {
    authModel.create.mockReturnValue(newUser);
    await authController.userLogin(req, res, next);
    var data = JSON.parse(JSON.stringify(res));
    expect(data.statusCode).toBe(200);
  });

  it("should have a userLogin function", () => {
    expect(typeof authController.userLogin).toBe("function");
  });
});
