const mongoose = require('mongoose');
// import { isEmail } from 'validator';
// const isEmail = require('validator').isEmail
const validator = require('validator');



 const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'username should be provided'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email should be provided'],
        unique: true,
        lowercase: true,
        // validate: [isEmail, 'is invalid']
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
          }
    },
    password: {
        type: String,
        required: [true, 'password should be provided'],
        minlength: [6, 'pass should contain 6 or more characters']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {User}