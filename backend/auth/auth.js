const SECRET_TOKEN = 'SECRET';
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateAccessToken = (user) => {
    return jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin,
  }, SECRET_TOKEN, {expiresIn:"3d"});
}

const verifyAccess = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_TOKEN, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyAndAuthorize = (req, res, next) => {
  verifyAccess(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyAccess(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};
  module.exports = {generateAccessToken, verifyAccess, verifyAndAuthorize ,verifyAdmin};