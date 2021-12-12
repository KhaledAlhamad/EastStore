const SECRET_TOKEN = 'SECRET';
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateAccessToken = (user_id) => {
    return jwt.sign(user_id, SECRET_TOKEN);
}

  module.exports = {generateAccessToken};