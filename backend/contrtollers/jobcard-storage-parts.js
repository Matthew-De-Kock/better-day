const JobCardStorageParts = require('../models/jobcard-storage-parts');

exports.AddJobCardStoragePart=(req,res,next)=>{

  const jobCardStorageParts = new JobCardStorageParts({
    job_Number: req.body.job_Number ,
    part_Name: req.body.part_Name,
    part_Number: req.body.part_Number ,
    part_Qty: req.body.part_Qty,
    part_Descr: req.body.part_Descr
    });

jobCardStorageParts.save().then(result =>{

        res.status(201).json({
          message: "Part Added successfully ",
          result: result,
        });
      })
      .catch(err=>{
        res.status(500).json({
          error:err
        });
      });


}


exports.GetJobCardStorageParts=(req,res,next)=>{
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("Betterday");

     var query = {job_Number:req.body.job_Number};

     var job_Number_Arr=[];
     var part_Name_Arr=[];
     var part_Number_Arr=[];
     var part_Qty_Arr=[];
     var part_Descr_Arr=[];

     dbo.collection("jobcard-storage-parts").find(query).toArray(function(err, data){
      if (err) throw err;
        i = 0;
    while (i < data.length)
    {

      job_Number_Arr[i] = data[i].job_Number
      part_Name_Arr[i] = data[i].part_Name
      part_Number_Arr[i] = data[i].part_Number
      part_Qty_Arr[i] = data[i].part_Qty
      part_Descr_Arr[i] = data[i].part_Descr
        i++;
     }
res.status(200).json({
  job_Number_Arr,
  part_Name_Arr,
  part_Number_Arr,
  part_Qty_Arr,
  part_Descr_Arr
   });
 } );
})
}
