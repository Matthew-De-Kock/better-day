//const { stringify } = require('@angular/compiler/src/util');
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userScheme = mongoose.Schema({
fullName: {type: String },
contactNumber: {type: Number },
userEmail:{type: String },
password:{type: String },
role: {type: String}
});

userScheme.plugin(uniqueValidator);

module.exports = mongoose.model('user', userScheme);
