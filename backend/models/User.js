const mongoose = require('mongoose');
const {isEmail} = require('validator')
// const validator = require('validator');
const bcrypt = require("bcrypt");
const Product = require("./Product").Product

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
        validate: [isEmail, 'email is invalid']
    },
    password: {
        type: String,
        required: [true, 'password should be provided'],
        minlength: [6, 'pass should contain 6 or more characters']
    },
    isAdmin:{
        type : Boolean,
        required : true,
        default : false
    }
    // cart: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     // required: true,
    //     ref : 'Product' //relation betwen the review and the user
    // }
});

userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });
  
  userSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
  };
  

const User = mongoose.model('User', userSchema);

module.exports = {User}