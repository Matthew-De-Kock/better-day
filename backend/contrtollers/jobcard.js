const JobCard = require('../models/jobcard');




exports.GetNewJobCardNumber=(req,res,next)=>{
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {

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
}

exports.CreateNewJobCard=(req,res,next)=>{
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
        phases: req.body.phases,
        status:req.body.status,
        });

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
   }

   exports.SaveJobCard=(req,res,next)=>{
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
          tested_By: req.body.tested_By,
          phases: req.body.phases,
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


     }

     exports.GetJobCardInProgress= (req, res, next) => {
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
          tested_By:  fetchedJobCard.tested_By,
          phases: fetchedJobCard.phases,
          status:  fetchedJobCard.status
         });
      });
      }

      exports.GetListJobCardsInProgress=(req,res,next)=>{
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function(err, db) {
      
           var dbo = db.db("Betterday");

           var query = {status:"In Progress" };
           var jobcards_InProgress=[];

           dbo.collection("jobcards").find(query).toArray(function(err, data){
        
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
      }


      exports.SaveJobCardStatus=(req,res,next)=>{
      JobCard.findOneAndUpdate({job_Number: req.body.job_Number},{status:"Completed"}).then(result=>{
        res.status(200).json({
          message: "jobcard Completed Status saved successfully",
        });
      })
                // .catch(err=>{
                //   res.status(500).json({
                //     error:err
                //   });
                // });
    
    
         }



