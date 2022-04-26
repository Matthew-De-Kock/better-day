
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');

const AuthRoutes = require("./routes/auth")
const AdminRoutes = require("./routes/admin")
const JobCardRoutes = require("./routes/jobcards")
const DashboardRoutes = require("./routes/dashboard")
const Admin = require('./Database-Functions/create-admin')
const Mail = require("./routes/mail")
var configuration = require("./configuration")

const app = express();
var conString = configuration.connectionStringMongoose;
//mongoose.connect("mongodb://localhost:27017/Betterday", {useNewUrlParser: true})
mongoose.connect(conString, {useNewUrlParser: true})
.then(()=>{
console.log('Connected to database')
})
.catch(()=>{
console.log('Connection Failed')
});
Admin.CreateAdmin()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 app.use("/", express.static(path.join(__dirname,"angular")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");  //"http://allelectrical.dyndns.org:4200/"
  res.setHeader(
    "Access-Control-Allow-Headers",
    "*, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


//app.use((req,res,next)=>{
// res.sendFile(path.join(__dirname,"angular", "index.html"));
//});



app.use(AuthRoutes)
app.use(AdminRoutes)
app.use(JobCardRoutes)
app.use(DashboardRoutes)
app.use(Mail)

module.exports=app;
