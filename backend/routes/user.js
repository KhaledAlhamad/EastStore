const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateAccessToken } = require('../auth/auth');


const User = require("../models/User").User;

// Register new user
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const exist = await User.findOne({ email });

  if (exist) {
    res.status(400).send("User already exist");
  }
  const user = await User.create({
    username,
    email,
    password,
  });

  if(user){
    res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
    })
   }else{
        res.status(400)
        throw new Error('Invalid user data')
   }
});

// get all users
router.get("/", (req, res) => {
  User.find({}, (err, users) => {
    res.send(users);
  });
});

// login user
router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  const exist = await User.findOne({ email });

  if (exist) {
    const compare = await bcrypt.compare(password, exist.password);
    const generatedToken = await generateAccessToken(`${exist._id}`);
    compare ? res.json({token: generatedToken}) : res.status(400).send("please check password");
  } else {
    res.status(400).send("Please check email");
  }
});



module.exports = router;
