//const { stringify } = require('@angular/compiler/src/util');
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const purchaseOrderScheme = mongoose.Schema({
  job_Number: {type: Number },
  supplier: {type: String },
  order_Number:{type: String },

});

purchaseOrderScheme.plugin(uniqueValidator);

module.exports = mongoose.model('purchase-order', purchaseOrderScheme);

