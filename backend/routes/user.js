const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../auth/auth");

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

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const exist = await User.findOne({ email });

  if (exist) {
    // const compare = await bcrypt.compare(password, exist.password);
    const compare = await exist.validatePassword(password);
    const generatedToken = await generateAccessToken(`${exist._id}`);
    compare
      ? res.json({ token: generatedToken, username: exist.username })
      : res.status(400).send("please check password");
  } else {
    res.status(400).send("Please check email");
  }
});

// get all users
router.get("/", (req, res) => {
  User.find({}, (err, users) => {
    res.send(users);
  });
});

//delete user
router.delete("/:username", (req, res) => {
  const username = req.params.username;

  User.deleteOne(
    { username: { $regex: new RegExp(username, "i") } },
    (err, users) => {
      if (err) {
        res.status(200).send("Could NOT delete user");
      }
      User.find({}, (err, Users) => {
        res.status(200).send(Users);
        console.log("All Users", Users);
      });
    }
  );
});

module.exports = router;
