const express = require("express");
const router = express.Router();
const User = require('../models/User').User;

router.post('/signup', async (req,res) => {
    const {username, email , password} = req.body;
    const exist = await User.findOne({email});
    
    exist ? res.stauts(400).send("User already exist!") : 
    User.create({username, email , password} , (err,users) => {
        console.log(users)
        res.send(users)
    })
})

router.get('/', (req,res) => {
    User.find({}, (err, users) =>{
        res.send(users)
    })
})

module.exports = router;