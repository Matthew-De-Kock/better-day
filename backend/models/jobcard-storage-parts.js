//const { stringify } = require('@angular/compiler/src/util');
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const JobCardStoragePartsScheme = mongoose.Schema({
  job_Number: Number ,
  part_Name: String,
  part_Number: String ,
  part_Qty: Number,
  part_Descr: String
});

JobCardStoragePartsScheme.plugin(uniqueValidator);

module.exports = mongoose.model('jobcard-storage-parts', JobCardStoragePartsScheme);
