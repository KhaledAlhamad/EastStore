const SECRET_TOKEN = 'SECRET';
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateAccessToken = (user) => {
    return jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin,
  }, SECRET_TOKEN, {expiresIn:"3d"});
}

  module.exports = {generateAccessToken};