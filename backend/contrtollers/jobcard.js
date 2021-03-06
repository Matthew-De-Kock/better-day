const JobCard = require('../models/jobcard');
var configuration = require("../configuration")

const Invoice = require('../models/invoice'); //for delete record
const PurchaseOrder = require('../models/purchase-order');//for delete record
const JobCardStorageParts = require('../models/jobcard-storage-parts');//for delete record
const User = require('../models/user')

exports.GetNewJobCardNumber=(req,res,next)=>{
  var MongoClient = require('mongodb').MongoClient;
  var url = configuration.connectionStringStandard;
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
console.log("STATUS::::::: "+req.body.status)
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
      result:result
    });
  })
            // .catch(err=>{
            //   res.status(500).json({
            //     error:err
            //   });
            // });


     }

     exports.GetJobCard= (req, res, next) => {
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
        var url = configuration.connectionStringStandard;
        MongoClient.connect(url, function(err, db) {
      
           var dbo = db.db("Betterday");

           var query = { $or: [ { status:"Problem" }, { status:"In Progress" } ] };
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


         exports.GetListCompletedJobCards=(req,res,next)=>{
          var MongoClient = require('mongodb').MongoClient;
          var url = configuration.connectionStringStandard;
          MongoClient.connect(url, function(err, db) {
        
             var dbo = db.db("Betterday");
             var query = {status:"Completed" };
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
         });
        })
        }

        exports.DeleteRow=(req,res,next)=>{
         var itemNumber = req.body.itemNumber
         var type = req.body.type
////////////////////Invoice
         if (type=="Invoice"){
          const query = {invoice_Number:itemNumber}
          Invoice.deleteOne(query).then(data =>{
         console.log(data)
                  res.status(201).json({
                      message: "Invoice Deleted successfully",
                      record:data,
                      type:"Invoice"
                    });
                  })
                  .catch(err=>{
                    res.status(500).json({
                      error:err
                    });
                  });
         }

////////////////////Purchase Order
         if (type=="Purchase Order"){
          const query = {order_Number:itemNumber}
          PurchaseOrder.deleteOne(query).then(data =>{
         console.log(data)
         PurchaseOrder.find().then(data=>{
           console.log(data)

           res.status(201).json({
            message: "Purchase Order Deleted successfully",
            record: data,
            type:"Purchase Order"
          });
        })
        .catch(err=>{
          res.status(500).json({
            error:err
          });
        });
         })

 
        }

////////////////////Storage
        if (type=="Storage"){
          const query = {part_Number:itemNumber}
          JobCardStorageParts.deleteOne(query).then(data =>{
         console.log(data)
                  res.status(201).json({
                      message: "Storage Deleted successfully",
                      record: data,
                      type:"Storage"

                    });
                  })
                  .catch(err=>{
                    res.status(500).json({
                      error:err
                    });
                  });
        }
       
        }

        exports.GetOwnerJobCards=(req,res,next)=>{
      var ownerName = req.body.userName
////////////////////Invoice
          const query = {owner:ownerName}
          JobCard.find(query).then(data =>{
        //  console.log(data)
                  res.status(201).json({
                      message: "JobCards fetched successfully",
                      record:data
                    });
                  })
                  .catch(err=>{
                    res.status(500).json({
                      error:err
                    });
                  });
   
        }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            JOBCARD POPULATION
   
exports.GetOwners=(req,res,next)=>{   
      User.find().then(data =>{
      console.log(data)
      var data_arr=[]
      var count=0
      for (let i = 0; i < data.length; i++) {
        for (let m = 0; m < data[i].roles.length; m++) {
        if (data[i].roles[m]=="Owner") {
          data_arr[count]=data[i].name
          count++
  }
  }
}
              res.status(201).json({
                  message: "Owners fetched successfully",
                  record:data_arr
                });
              })
              .catch(err=>{
                res.status(500).json({
                  error:err
                });
              });

    }


    exports.GetDrawers=(req,res,next)=>{   
      User.find().then(data =>{
      console.log(data)
      var data_arr=[]
      var count=0
      for (let i = 0; i < data.length; i++) {
        for (let m = 0; m < data[i].roles.length; m++) {
        if (data[i].roles[m]=="Drawer") {
          data_arr[count]=data[i].name
          count++
  }
  }
}
              res.status(201).json({
                  message: "Drawers fetched successfully",
                  record:data_arr
                });
              })
              .catch(err=>{
                res.status(500).json({
                  error:err
                });
              });

    }



    exports.GetProgrammers=(req,res,next)=>{   
      User.find().then(data =>{
      console.log(data)
      var data_arr=[]
      var count=0
      for (let i = 0; i < data.length; i++) {
        for (let m = 0; m < data[i].roles.length; m++) {
        if (data[i].roles[m]=="Programmer") {
          data_arr[count]=data[i].name
          count++
  }
  }
}
              res.status(201).json({
                  message: "Programmers fetched successfully",
                  record:data_arr
                });
              })
              .catch(err=>{
                res.status(500).json({
                  error:err
                });
              });

    }



    exports.GetTesters=(req,res,next)=>{   
      User.find().then(data =>{
      console.log(data)
      var data_arr=[]
      var count=0
      for (let i = 0; i < data.length; i++) {
        for (let m = 0; m < data[i].roles.length; m++) {
        if (data[i].roles[m]=="Tester") {
          data_arr[count]=data[i].name
          count++
  }
  }
}
              res.status(201).json({
                  message: "Testers fetched successfully",
                  record:data_arr
                });
              })
              .catch(err=>{
                res.status(500).json({
                  error:err
                });
              });

    }



    exports.GetPanelBuilders=(req,res,next)=>{   
      User.find().then(data =>{
      console.log(data)
      var data_arr=[]
      var count=0
      for (let i = 0; i < data.length; i++) {
        for (let m = 0; m < data[i].roles.length; m++) {
        if (data[i].roles[m]=="Panel Builder") {
          data_arr[count]=data[i].name
          count++
  }
  }
}
              res.status(201).json({
                  message: "Panel Builders fetched successfully",
                  record:data_arr
                });
              })
              .catch(err=>{
                res.status(500).json({
                  error:err
                });
              });

    }



    exports.GetInstallers=(req,res,next)=>{   
      User.find().then(data =>{
      console.log(data)
      var data_arr=[]
      var count=0
      for (let i = 0; i < data.length; i++) {
        for (let m = 0; m < data[i].roles.length; m++) {
        if (data[i].roles[m]=="Installer") {
          data_arr[count]=data[i].name
          count++
  }
  }
}
              res.status(201).json({
                  message: "Installers fetched successfully",
                  record:data_arr
                });
              })
              .catch(err=>{
                res.status(500).json({
                  error:err
                });
              });

    }


