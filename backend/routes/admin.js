const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require('../models/user');



router.post("/jobcard/create-new-user"
,
//checkAuth,
(req, res, next) => {   //creating new user

    // User.findOne({userEmail: req.body.userEmail})
    // .then(user =>{
    //     if (user){

    //       return res.status(401).json({
    //         message: "User Email Already Used!"
    //       });
    //      }
    //   })




  bcrypt.hash(req.body.password, 10)
  .then(hash=>{
    const user = new User({
      name: req.body.name,
      contactNumber: req.body.contactNumber,
      email: req.body.email,
      password: hash,
      role: req.body.role,
      });
console.log(user)
        user.save().then(result =>{
          res.status(201).json({
            message: "User added successfully",
            result: result,
          });
        })
        .catch(err=>{
          res.status(500).json({
            error:err
          });
        });
  });
  });


  module.exports= router;
