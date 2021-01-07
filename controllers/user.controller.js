const User = require('../models/User');
const bcrypt = require('bcrypt');

//register a user

exports.userRegister = async (req, res, next) => {
    try{
        const userPassword = req.body.password;
        const saltRounds = 12;
        let hashedPassword = null;
        if(userPassword && saltRounds){
            hashedPassword = await bcrypt.hash(userPassword, saltRounds)
        }

        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            password: hashedPassword,
        })

        const user_register = await User.create(newUser);
        res.status(201).json(user_register);
    } catch(err) {
        next(err)
    }
}

exports.userLogin = async (req, res, next) => {
    try{
        const users = await User.find({});
        res.json(users);
    } catch(err){
        next(err);
    }
};