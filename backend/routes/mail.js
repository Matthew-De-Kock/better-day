const nodemailer = require("nodemailer")

const express = require('express');
const router = express.Router();
router.post("/sendmail",(req,res)=>{
    console.log("request came")
    let info = req.body

 console.log(info.problemDescription)
 
 console.log(info.jobNumber)

    sendMail(info,information=>{
        console.log('The mail has been sent !!!!')
        res.send(info)
    })
})

async function sendMail(info, callback){
    let transporter = nodemailer.createTransport({
host:"smtp.gmail.com",
port:587,
secure:false,
auth:{
    user:'mdkdekock501@gmail.com',
    pass:'s219802254'
}
    })

    let mailOptions = {
        from: info.userName + '<' + info.userEmail + '>',
        to: info.ownerEmail,
        subject:"Jobcard " +info.jobNumber +" Problem",
        html: info.problemDescription 
    };

    let information =await transporter.sendMail(mailOptions)
    callback(information)
}

module.exports= router;