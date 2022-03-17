const nodemailer = require("nodemailer")

const express = require('express');
const router = express.Router();
router.post("/sendmail",(req,res)=>{
    console.log("request came")
    let user = req.body
    sendMail(user,info=>{
        console.log('The mail has been sent !!!!')
        res.send(info)
    })
})

async function sendMail(user, callback){
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
        from: '"Matthew De Kock" <mdkdekock501@gmail.com>',
        to: "jedi2159@gmail.com",
        subject:"Nodemailer Test Email",
        html:`<h1>Problem has been detected</h1`
    };

    let info =await transporter.sendMail(mailOptions)
    callback(info)
}

module.exports= router;