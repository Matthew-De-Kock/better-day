const PurchaseOrder = require('../models/purchase-order');


exports.AddPurchaseOrder=(req,res,next)=>{

  const purchaseOrder = new PurchaseOrder({
    job_Number:  req.body.job_Number,
    supplier:    req.body.supplier,
    order_Number: req.body.order_Number
    });

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


}


exports.GetPurchaseOrder=(req,res,next)=>{
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
}
