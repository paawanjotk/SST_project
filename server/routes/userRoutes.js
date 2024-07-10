const express = require("express");
const User = require("../models/userModel");

const router = express.Router();
const bcrypt = require("bcrypt");
router.post("/register", async (req, res) => {
    try{
        const userExists = await User.findOne({email: req.body.email})
        if(userExists) return res.json("User already exists")
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newUSser = new User(req.body)
        await newUSser.save()
        res.json("User has been registered successfully")
    } catch(error){
        res.json(error);

    }

});

router.post("/login", async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  if(!user){
    res.send({
        success : false,
        message: "User does not exist, please register"
    })
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword){
    return res.send({
      success:false,
      message : 'Invalid password'
    })
  }
  res.send({
    success:true,
    message : 'User has been logged in successfully'
  })
});


module.exports = router;