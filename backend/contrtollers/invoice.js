const Invoice = require('../models/invoice');




exports.AddInvoice=(req,res,next)=>{
  date = new Date( req.body.date.year, req.body.date.month, req.body.date.day,12,00)
const invoice = new Invoice({
  job_Number: req.body.job_Number ,
  invoice_Number: req.body.invoice_Number,
  client_Name: req.body.client_Name ,
  date: req.body.date,
  timestamp: req.body.timestamp
  });
invoice.save().then(result =>{

      res.status(201).json({
        message: "Invoice Added successfully ",
        result: result,
      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      });
    });
}



exports.GetInvoices=(req,res,next)=>{
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("Betterday");

     var query = {job_Number:req.body.job_Number};

     var job_Number_Arr=[];
     var invoice_Number_Arr=[];
     var client_Name_Arr=[];
     var date_Arr=[];
     var timestamp_Arr=[];

     dbo.collection("invoices").find(query).toArray(function(err, data){
      if (err) throw err;
        i = 0;
    while (i < data.length)
    {

      job_Number_Arr[i] = data[i].job_Number
      invoice_Number_Arr[i] = data[i].invoice_Number
      client_Name_Arr[i] = data[i].client_Name
      date_Arr[i] = data[i].date
      timestamp_Arr[i] = data[i].timestamp
        i++;
     }

res.status(200).json({
  job_Number_Arr,
  invoice_Number_Arr,
  client_Name_Arr,
  date_Arr,
  timestamp_Arr
   });
 } );
})
}
