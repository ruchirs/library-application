const express = require('express');
const router = express.Router();
const authController = require('../controllers/user.controller')
const isAuth = require('../middleware/auth')

//User Login
router.post('/login', authController.userLogin);

//User Registration
router.post('/signup', authController.userRegister)

//User Details
router.get('/user-details', isAuth, authController.userDetails)

module.exports = router;