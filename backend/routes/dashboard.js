const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken") ;

const router = express.Router();
const User = require('../models/user');
const JobCard = require('../models/jobcard');


router.post("/dashboard/getuserjobs",(req, res, next) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("Betterday");



     var query = {drawings_By: req.body.name  };
     var drawings_JobNumber_arr=[];
     var drawings_Descr_arr=[];
     var count

dbo.collection("jobcards").find(query).toArray(function(err, data){
   if (err) throw err;
   i = 0;
    while (i < data.length)
    {
      drawings_JobNumber_arr[i] =data[i].job_Number
      drawings_Descr_arr[i]=data[i].description
         i++;
         count = i
     }


 });

 var query = {panel_Builders: req.body.name };
 var panel_Builders_JobNumber_arr=[];
 var panel_Builders_Descr_arr=[];
 var count

dbo.collection("jobcards").find(query).toArray(function(err, data){
if (err) throw err;
i = 0;
while (i < data.length)
{
  panel_Builders_JobNumber_arr[i] = data[i].job_Number
  panel_Builders_Descr_arr[i]= data[i].description
     i++;
     count = i
 }
});


var query = {programmed_By: req.body.name  };
var programmed_By_JobNumber_arr=[];
var programmed_By_Descr_arr=[];
var count

dbo.collection("jobcards").find(query).toArray(function(err, data){
if (err) throw err;
i = 0;
while (i < data.length)
{
 programmed_By_JobNumber_arr[i] = data[i].job_Number
 programmed_By_Descr_arr[i]= data[i].description
    i++;
    count = i
}
});

var query = {tested_By: req.body.name  };
var tested_By_JobNumber_arr=[];
var tested_By_Descr_arr=[];
var count
dbo.collection("jobcards").find(query).toArray(function(err, data){
  if (err) throw err;
  i = 0;
  while (i < data.length)
  {
    tested_By_JobNumber_arr[i] = data[i].job_Number
    tested_By_Descr_arr[i]= data[i].description
      i++;
      count = i
  }
  res.status(200).json({
    drawings_JobNumber_arr,
    drawings_Descr_arr,
    panel_Builders_JobNumber_arr,
    panel_Builders_Descr_arr,
    programmed_By_JobNumber_arr,
    programmed_By_Descr_arr,
    tested_By_JobNumber_arr,
    tested_By_Descr_arr
     });
  });



})
}

  );

router.post("/dashboard/save-phase-status", (req,res, next) =>{


var count = req.body.count;
var status = req.body.status;
var job_Number = req.body.job_Number

var fetchedJobCard
JobCard.findOne({job_Number: job_Number})
.then(jobCard =>{
    if (!jobCard){
      return res.status(401).json({
        message: "Username Invalid!"
      });
         }
 fetchedJobCard=jobCard;
 })
 console.log(fetchedJobCard)
// fetchedJobCard.phases[count] = status
// console.log(fetchedJobCard)
// JobCard.findOneAndUpdate({job_Number: job_Number},{phases[count]:status}).then(result=>{
// res.status(200).json({
// message: "jobcard saved successfully",
// });
// })


})


  module.exports= router;
