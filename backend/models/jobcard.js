//const { stringify } = require('@angular/compiler/src/util');
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const jobcardScheme = mongoose.Schema({
  job_Number: {type: Number,unique:true },
  owner: {type: String },
  start_Date:{type: Date },
  client:{type: String },
  order_Number: {type: String},
  company: {type: String },
  description: {type: String },
  panel_Number:{type: String },
  drawings_By:{type: String },
  panel_Builders: {type: Array},
  programmed_By: {type: String },
  tested_By: {type: String },
  phases:{type:Array},
  status: {type: Array}
});

jobcardScheme.plugin(uniqueValidator);

module.exports = mongoose.model('jobcard', jobcardScheme);

