const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken") ;

const router = express.Router();
const User = require('../models/user');




// const checkAuth = require('../middleware/check-auth');


 router.post("/login", (req,res,next)=>{      //logging in user

    let fetchedUser;

     User.findOne({email: req.body.email})
      .then(user =>{
          if (!user){
            return res.status(401).json({
              message: "Username Invalid!"
            });
               }
        fetchedUser=user;
        return bcrypt.compare(req.body.password, user.password)
       })
       .then(result => {
         if (!result){
          return res.status(401).json({
            message: "Password Invalid!"
          });
         }
        const token = jwt.sign(
          {email: fetchedUser.email,userId: fetchedUser._id,name:fetchedUser.name,contactNumber:fetchedUser.contactNumber,role:fetchedUser.role }
        ,'secret_this_should_be_longer'//middleware auth
        ,{expiresIn:"1h"});


    res.status(200).json({
      token: token,
      expiresIn: 36000,
      name: fetchedUser.name,
      contactNumber: fetchedUser.contactNumber,
      email: fetchedUser.email,
     role: fetchedUser.role
    });


       })
       .catch(err =>{
         return res.status(401).json({
           message: "Auth Failed"
         })
       })
 });



  module.exports= router;
