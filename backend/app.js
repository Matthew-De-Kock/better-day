// const express = require('express')
// const app = express();
// const AuthRoutes = require("./routes/auth")



// app.use(AuthRoutes);
// module.exports= app












const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');

const AuthRoutes = require("./routes/auth")
const AdminRoutes = require("./routes/admin")
const JobCardRoutes = require("./routes/jobcards")
const DashboardRoutes = require("./routes/dashboard")

const app = express();

mongoose.connect("mongodb://localhost:27017/Betterday", {useNewUrlParser: true})
.then(()=>{
console.log('Connected to database')
})
.catch(()=>{
console.log('Connection Failed')
});


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

module.exports=app;
