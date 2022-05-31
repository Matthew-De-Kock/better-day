const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require('../models/user');


router.post("/jobcard/create-new-user"
,
//checkAuth,
(req, res, next) => { 

  bcrypt.hash(req.body.password, 10)
  .then(hash=>{
    const user = new User({
      name: req.body.name,
      contactNumber: req.body.contactNumber,
      email: req.body.email,
      password: hash,
      roles: req.body.roles,
      });
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
