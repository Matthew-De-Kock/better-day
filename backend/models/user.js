//const { stringify } = require('@angular/compiler/src/util');
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userScheme = mongoose.Schema({
name: {type: String },
contactNumber: {type: String },
email:{type: String },
password:{type: String },
roles: {type: Array}
});

userScheme.plugin(uniqueValidator);

module.exports = mongoose.model('user', userScheme);
