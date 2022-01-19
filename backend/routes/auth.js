const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken") ;

const router = express.Router();
const User = require('../models/user');


router.use('/login', (req, res, next) =>{
  const user = [
   { name: "Matthew", email:"matthew@gmail.com"}

  ]
  res.status(200).json({
    message: " fetched successfully",
    user:user
   })
})


// const checkAuth = require('../middleware/check-auth');


 // router.post("/login", (req,res,next)=>{      //logging in user

//     let fetchedUser;

//      User.findOne({userEmail: req.body.userEmail})
//       .then(user =>{
//           if (!user){
//             return res.status(401).json({
//               message: "Username Invalid!"
//             });
//                }
//         fetchedUser=user;

//         return bcrypt.compare(req.body.password, user.password)
//        })
//        .then(result => {
//          if (!result){
//           return res.status(401).json({
//             message: "Password Invalid!"
//           });
//          }
//         const token = jwt.sign(
//           {userEmail: fetchedUser.userEmail,userId: fetchedUser._id,userSites:fetchedUser.userSites,firstName:fetchedUser.firstName,secomdName:fetchedUser.secondName }
//         ,'secret_this_should_be_longer'//middleware auth
//         ,{expiresIn:"1h"});

// if (fetchedUser.userEmail!="admin@macautomation.co.za"){

//   var now =  new Date();
//   var year = now.getFullYear();
//   var month = now.getMonth() + 1;
//   var day = now.getDate();
//   var hour = now.getHours();
//   var min = now.getMinutes();
//   date = year + '-' + month + '-' + day +" "+ hour +":" + min;
//   var loggedInUser = new LoggedInUser({
//     userEmail: fetchedUser.userEmail,
//     date:date
//   })
//   loggedInUser.save()
// }

// UserSettings.findOne({userEmail: req.body.userEmail})
// .then(settings=>{
//   if(!settings){
//   theme = "light-theme"
//   }
//   else{
//  theme = settings.theme
//   }
//   setTimeout(() => {
//     res.status(200).json({
//       theme: theme,
//       token: token,
//       expiresIn: 3600,
//       userSites: fetchedUser.userSites,
//       firstName: fetchedUser.firstName,
//       secondName: fetchedUser.secondName,
//      userEmail: fetchedUser.userEmail
//     });
//   }, 1500);

//     })
//        })
//        .catch(err =>{
//          return res.status(401).json({
//            message: "Auth Failed"
//          })
//        })
 // });



  module.exports= router;
