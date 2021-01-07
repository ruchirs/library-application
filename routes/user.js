const express = require('express');
const router = express.Router();
const authController = require('../controllers/user.controller')

//User Login
router.get('/login', authController.userLogin);

//User Registration
router.post('/signup', authController.userRegister)

module.exports = router;