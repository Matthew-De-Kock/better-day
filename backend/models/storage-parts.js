//const { stringify } = require('@angular/compiler/src/util');
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const StoragePartsScheme = mongoose.Schema({
  job_Number: Number ,
  part_Name: String,
  part_Number: String ,
  part_Qty: Number,
  part_Descr: String
});

StoragePartsScheme.plugin(uniqueValidator);

module.exports = mongoose.model('storage-parts', StoragePartsScheme);
