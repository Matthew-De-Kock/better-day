const mongoose = require('mongoose');
const User = require('../models/user');

// called in server.js
module.exports = {CreateAdmin};

function CreateAdmin(){ // Function that checks for admin account, if no account admin is created.


  ///////////console.log(admin)
  //saving new admin data in DB
  User.findOneAndUpdate({userEmail: "admin@macautomation.co.za"},
  {name: "Admin",
  contactNumber: "0723320909",
  email: "admin@macautomation.co.za",
  password: "$2a$06$QVSnHGgtsDfzV8RwDdk6sOA1gctzxoNcWKNlqgpX7lSO0JGxLIjEa", //encrypted password for M@CAutomation1
  role: "Admin"
} ,{new: true }).then((result=>{

if(result!=null){
  console.log("Admin Updated Succesfully")
}
if (result==null) {
  const user = new User({
    name: "Admin",
    contactNumber: "0723320909",
    email: "admin@macautomation.co.za",
    password: "$2a$06$QVSnHGgtsDfzV8RwDdk6sOA1gctzxoNcWKNlqgpX7lSO0JGxLIjEa", //encrypted password for M@CAutomation1
    role: "Admin"
    });

    user.save().then(result =>{
      console.log("Admin Created Succesfuly")
    })
    .catch(err=>{

    });

  
}

})  
)}

