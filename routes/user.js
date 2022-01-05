const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateAccessToken, verifyAccess, verifyAndAuthorize ,verifyAdmin} = require("../auth/auth");

const User = require("../models/User").User;

// get all users
router.get("/",verifyAdmin, async (req, res) => {
  try{
    User.find({}, (err, users) => {
      res.send(users);
    });
  }
  catch{
    res.status(500).send("error")
  }
 
});

//GET specific user
router.get("/find/:id", verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update user
router.put("/:id", verifyAndAuthorize, async (req, res) => {

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


//delete user
router.delete("/:id", verifyAndAuthorize, async (req, res) => {
  const id = req.params.id;

  User.deleteOne(
    { _id : id },
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
