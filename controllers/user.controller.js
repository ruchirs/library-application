const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

//register a user

exports.userRegister = async (req, res, next) => {
    try{
        //Check if user already exists in the DB
        const emailFormat = (req.body.email).toLowerCase();
        const existingUser = await User.find({ email: emailFormat })
        if(existingUser.length >= 1) {
            res.status(409).json({
                message: "user already exists"
            })
        } else {
            //When user does not exists continue the register operation
            const userPassword = req.body.password;

            //12 rounds of hashing would be optimal
            const saltRounds = 12;
            let hashedPassword = null;

            //hash the password using bcrypt so it becomes unreadable
            if(userPassword && saltRounds){
                hashedPassword = await bcrypt.hash(userPassword, saltRounds)
            }

            //Create a new user from USER model
            const newUser = new User({
                name: req.body.name,
                email: emailFormat,
                role: req.body.role,
                password: hashedPassword,
            })

            //Save the user and respond with 200 (OK)
            const user_register = await User.create(newUser);
            res.status(201).json({
                message: "User Registered Successfully."
            });
        }
    } catch(err) {
        next(err)
    }
}

//User Login Action
exports.userLogin = async (req, res, next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        //check if user's email ID exists in the DB
        const existingUser = await User.findOne({ email: email})
        if(!existingUser) {
            //if not, reject the request and send 403 (forbidden/ not allowed)
            res.status(403).send({
                message: "Email or Password do not match"
            })
        } else {
            // if email exists check if the password matches
            const passwordVerification = bcrypt.compare(password, existingUser.password)

            /** 
             * if @bcrypt compare returns TRUE, it matches the password,
             * continue the operation and create a @JWT token
             * [@JWT sample key is used],
             * @Expire the token in 1 hour
             * @else reject the request with 403
             */ 
            
            if(passwordVerification){
                const token = jwt.sign({
                    email: existingUser.email,
                    name: existingUser.name
                }, 
                'serversamplesecretkey',
                { expiresIn: '1h' })
                res.status(200).send({
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role
                })
            } else {
                res.status(403).send({
                    message: "Email or Password do not match"
                })
            }
        }
    } catch(err){
        next(err);
    }
};