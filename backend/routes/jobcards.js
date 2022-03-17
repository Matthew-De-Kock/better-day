const express = require("express");


const router = express.Router();
const User = require('../models/user');
const JobCard = require('../models/jobcard');
const PurchaseOrder = require('../models/purchase-order');
const JobCardStorageParts = require('../models/jobcard-storage-parts');
const InvoiceController = require("../contrtollers/invoice")
const JobCardStoragePartsController = require("../contrtollers/jobcard-storage-parts")
const PurchaseOrderController = require("../contrtollers/purchase-order")
const JobcardController = require("../contrtollers/jobcard")


// const checkAuth = require('../middleware/check-auth');









 router.get("/jobcard/jobnum",JobcardController.GetNewJobCardNumber)

 router.post("/jobcard/create-jobcard",JobcardController.CreateNewJobCard );

 router.post("/jobcard/save-jobcard", JobcardController.SaveJobCard);

 router.post("/jobcard/save-status", JobcardController.SaveJobCardStatus);


 router.get("/jobcard/jobcards-in-progress", JobcardController.GetListJobCardsInProgress)
   router.post("/jobcard/fetch-jobcard",JobcardController.GetJobCard)

          router.post("/jobcard/jobcard-in-progress/add-purchase-order", PurchaseOrderController.AddPurchaseOrder);
          router.post("/jobcard/jobcard-in-progress/get-purchase-orders",PurchaseOrderController.GetPurchaseOrder)


          router.post("/jobcard/jobcard-in-progress/add-part",JobCardStoragePartsController.AddJobCardStoragePart);
          router.post("/jobcard/jobcard-in-progress/get-jobcard-parts",JobCardStoragePartsController.GetJobCardStorageParts)


          router.post("/jobcard/jobcard-in-progress/add-invoice", InvoiceController.AddInvoice);
          router.post("/jobcard/jobcard-in-progress/get-invoices",InvoiceController.GetInvoices)




router.get("/jobcard/completed-jobcards", JobcardController.GetListCompletedJobCards)


  module.exports= router;
