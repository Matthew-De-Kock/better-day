//const { stringify } = require('@angular/compiler/src/util');
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const invoiceScheme = mongoose.Schema({
  job_Number: {type: Number },
  invoice_Number: {type: String },
  client_Name:{type: String },
  date:{type:Date},
  timestamp: {type:Date}

});

invoiceScheme.plugin(uniqueValidator);

module.exports = mongoose.model('invoices', invoiceScheme);
