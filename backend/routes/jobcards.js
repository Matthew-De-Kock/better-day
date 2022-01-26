const express = require("express");


const router = express.Router();
const User = require('../models/user');
const JobCard = require('../models/jobcard');
const PurchaseOrder = require('../models/purchase-order');




// const checkAuth = require('../middleware/check-auth');





router.get("/jobcard/jobcards-in-progress",(req,res,next)=>{
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("Betterday");

     var query = {status:"In Progress" };
     var jobcards_InProgress=[];

     dbo.collection("jobcards").find(query).toArray(function(err, data){
      if (err) throw err;
        i = 0;

    while (i < data.length)
    {
      jobcards_InProgress[i] =data[i]
         i++;
     }
res.status(200).json({
  jobcards_InProgress,

   });
 } );
})
})

router.post("/jobcard/jobcard-in-progress"
   ,
   //checkAuth,
   (req, res, next) => {
    JobCard.findOne({job_Number: req.body.job_Number})
    .then(jobcard =>{
      fetchedJobCard=jobcard;
      res.status(200).json({
        job_Number: fetchedJobCard.job_Number,
        owner:  fetchedJobCard.owner,
        start_Date:  fetchedJobCard.start_Date,
        client:  fetchedJobCard.client,
        order_Number:  fetchedJobCard.order_Number,
        company:  fetchedJobCard.company,
        description:  fetchedJobCard.description,
        panel_Number:  fetchedJobCard.panel_Number,
        drawings_By:  fetchedJobCard.drawings_By,
        panel_Builders:  fetchedJobCard.panel_Builders,
        programmed_By:  fetchedJobCard.programmed_By,
        purchase_Orders:  fetchedJobCard.purchase_Orders,
        parts_From_Storage:  fetchedJobCard.parts_From_Storage,
        invoices:  fetchedJobCard.invoices,
        status:  fetchedJobCard.status
       });
    });
    })
 router.get("/jobcard/jobnum",(req,res,next)=>{
      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://localhost:27017/";
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
         var dbo = db.db("Betterday");

         var query = { };
         var jobcard_arr=[];
         var count

         dbo.collection("jobcards").find(query).toArray(function(err, data){

       if (err) throw err;
       i = 0;
        while (i < data.length)
        {
          jobcard_arr[i] =data[i].job_Number
             i++;
             count = i
         }
     var recentJobNum = jobcard_arr[count-1]
    res.status(200).json({
      recentJobNum,

       });
     } );
    })
    })
 router.post("/jobcard/create-jobcard", (req,res,next)=>{
date = new Date( req.body.start_Date.year, req.body.start_Date.month, req.body.start_Date.day,12,00)
    const jobcard = new JobCard({
      job_Number:  req.body.job_Number,
      owner: req.body.owner,
      start_Date: date,
      client:req.body.client,
      order_Number:req.body.order_Number,
      company: req.body.company,
      description: req.body.description,
      panel_Number:req.body.panel_Number,
      drawings_By:req.body.drawings_By,
      panel_Builders: req.body.panel_Builders,
      programmed_By: req.body.programmed_By,
      purchase_Orders: req.body.purchase_Orders,
      parts_From_Storage: req.body.parts_From_Storage,
      invoices: req.body.invoices,
      status:req.body.status,
      });

      console.log(jobcard)
jobcard.save().then(result =>{
          res.status(201).json({
            message: "jobcard Created successfully",
            result: result,
          });
        })
        .catch(err=>{
          res.status(500).json({
            error:err
          });
        });


 });


 router.post("/jobcard/save-jobcard", (req,res,next)=>{
  date = new Date( req.body.start_Date.year, req.body.start_Date.month, req.body.start_Date.day,12,00)

      var jobcard = {
        job_Number:  req.body.job_Number,
        owner: req.body.owner,
        start_Date: date,
        client:req.body.client,
        order_Number:req.body.order_Number,
        company: req.body.company,
        description: req.body.description,
        panel_Number:req.body.panel_Number,
        drawings_By:req.body.drawings_By,
        panel_Builders: req.body.panel_Builders,
        programmed_By: req.body.programmed_By,
        purchase_Orders: req.body.purchase_Orders,
        parts_From_Storage: req.body.parts_From_Storage,
        invoices: req.body.invoices,
        status:req.body.status,
        };



JobCard.findOneAndUpdate({job_Number: req.body.job_Number},jobcard).then(result=>{
  res.status(200).json({
    message: "jobcard saved successfully",
  });
})
          // .catch(err=>{
          //   res.status(500).json({
          //     error:err
          //   });
          // });


   });



   router.post("/jobcard/jobcard-in-progress/add-purchase-order", (req,res,next)=>{

        const purchaseOrder = new PurchaseOrder({
          job_Number:  req.body.job_Number,
          supplier:    req.body.supplier,
          order_Number: req.body.order_Number
          });

console.log(purchaseOrder)
    purchaseOrder.save().then(result =>{

              res.status(201).json({
                message: "Purchase Order successfully Added",
                result: result,
              });
            })
            .catch(err=>{
              res.status(500).json({
                error:err
              });
            });


     });
     router.post("/jobcard/jobcards-in-progress/get-purchase-orders",(req,res,next)=>{
      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://localhost:27017/";
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
         var dbo = db.db("Betterday");

         var query = {job_Number:req.body.job_Number};

         var job_Number_Arr=[];
         var order_Number_Arr=[];
         var supplier_Arr=[];

         dbo.collection("purchase-orders").find(query).toArray(function(err, data){
          if (err) throw err;
            i = 0;

        while (i < data.length)
        {
          job_Number_Arr[i] = data[i].job_Number
          order_Number_Arr[i] = data[i].order_Number
          supplier_Arr[i] = data[i].supplier
            i++;
         }
    res.status(200).json({
      job_Number_Arr,
      order_Number_Arr,
      supplier_Arr
       });
     } );
    })
    })

  module.exports= router;
