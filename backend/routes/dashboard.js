const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken") ;

const router = express.Router();
const User = require('../models/user');
const JobCard = require('../models/jobcard');
var configuration = require("../configuration");
const jobcard = require("../models/jobcard");

router.post("/dashboard/getuserjobs",(req, res, next) => {

  // var query = {programmed_By: req.body.name  };
  // JobCard.find(query).then(data=>{
  //    console.log(data)
  //     })


  var MongoClient = require('mongodb').MongoClient;
  var conString = configuration.connectionStringStandard;
 // var url = "mongodb://localhost:27017/";
  var url = conString;
  MongoClient.connect(url, function(err, db) {

   


if(db.db("Betterday")==undefined){}
else{}
var ownerForJobCards_arr=[]
var count = 0

     var dbo = db.db("Betterday");
     var query = {drawings_By: req.body.name  };
     var drawings_JobNumber_arr=[];
     var drawings_Descr_arr=[];
     var drawings_phase_status_arr=[]
  

dbo.collection("jobcards").find(query).toArray(function(err, data){
  //  if (err) throw err;
   i = 0;
if(data.length==undefined){}
else{
    while (i < data.length)
    {
      drawings_JobNumber_arr[i] =data[i].job_Number
      drawings_Descr_arr[i]=data[i].description
      drawings_phase_status_arr[i] = data[i].phases[1]
         i++
         ownerForJobCards_arr[count] = data[count].owner
         count++
   
     }

    }
 });

 var query = {panel_Builders: req.body.name };
 var panel_Builders_JobNumber_arr=[];
 var panel_Builders_Descr_arr=[];
 var panelBuild_phase_status_arr=[]


dbo.collection("jobcards").find(query).toArray(function(err, data){
//  if (err) throw err;
i = 0;
if(data.length==undefined){}
else{
while (i < data.length)
{
  panel_Builders_JobNumber_arr[i] = data[i].job_Number
  panel_Builders_Descr_arr[i]= data[i].description
  panelBuild_phase_status_arr[i]=data[i].phases[2]
     i++;
           ownerForJobCards_arr[count] = data[count].owner
         count++
 }}
});


var query = {programmed_By: req.body.name  };
var programmed_By_JobNumber_arr=[];
var programmed_By_Descr_arr=[];
var programming_phase_status_arr=[]


dbo.collection("jobcards").find(query).toArray(function(err, data){
// if (err) throw err;
i = 0;
if(data.length==undefined){}
else{
while (i < data.length)
{
 programmed_By_JobNumber_arr[i] = data[i].job_Number
 programmed_By_Descr_arr[i]= data[i].description
 programming_phase_status_arr[i]=data[i].phases[3]
    i++;
    ownerForJobCards_arr[count] = data[count].owner
    count++
}}
});

var query = {tested_By: req.body.name  };
var tested_By_JobNumber_arr=[];
var tested_By_Descr_arr=[];
var testedBy_phase_status_arr=[]

dbo.collection("jobcards").find(query).toArray(function(err, data){
  // if (err) throw err;
  i = 0;
  if(data.length==undefined){}
else{
  while (i < data.length)
  {
    tested_By_JobNumber_arr[i] = data[i].job_Number
    tested_By_Descr_arr[i]= data[i].description
    testedBy_phase_status_arr[i]=data[i].phases[4]
      i++;
      // ownerForJobCards_arr[count] = data[count].owner
      // count++
  }}
  res.status(200).json({
    drawings_JobNumber_arr,
    drawings_Descr_arr,
    drawings_phase_status_arr,

    panel_Builders_JobNumber_arr,
    panel_Builders_Descr_arr,
    panelBuild_phase_status_arr,

    programmed_By_JobNumber_arr,
    programmed_By_Descr_arr,
    programming_phase_status_arr,

    tested_By_JobNumber_arr,
    tested_By_Descr_arr,
    testedBy_phase_status_arr,

    ownerForJobCards_arr
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
 fetchedJobCard=jobCard;
 var phaseArr = fetchedJobCard.phases
phaseArr[count] = status

var flag=false
var i = 0
var jb_Status="In Progress"

while (i < 9) {
 if (phaseArr[i]=="Problem") {
  jb_Status="Problem"
  flag = true
 } 
 i++
}


  JobCard.findOneAndUpdate({job_Number: job_Number},{phases:phaseArr, status:jb_Status}).then(result=>{
  console.log(result)
res.status(200).json({
message: "Jobcard saved successfully",
phases:phaseArr,
});
 })

 })

 










})


router.post("/get-owner-email",(req,res,next)=>{

console.log(req.body.name)
User.findOne({name:req.body.name}).then(result=>{
  res.status(200).json({
    message: "Jobcard saved successfully",
    result:result,
    });
})
})
  module.exports= router;
