const router = require("express").Router()
const User = require("../models/User").User
const { generateAccessToken } = require("../auth/auth");


router.post("/signup", async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password:  req.body.password,
    });
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/login", async (req,res) => {
      const originalpassword = req.body.password;
    try{
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );

        if(!user){
            res.status(401).json("Wrong User Name");
        } 

        const compare = await user.validatePassword(originalpassword);

        if(!compare){
            res.status(401).send("Wrong Password!")
        }
        const token = await generateAccessToken(user);
  
        const { password, ...rest } = user._doc;  
        // res.status(200).json({Token});
        res.status(200).json({...rest, token});
        // console.log(user);

    }catch(err){
        res.status(500).json(err);
    }
  })

module.exports = router;