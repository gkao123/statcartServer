//app/models/user.js
//load the things we needed

var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')


//define the schema for our user models
var userSchema = mongoose.Schema({
  local:{
    email: String,
    password: String
  },
  facebook:{
    id: String,
    token: String,
    name: String,
    email: String,
  },
  google:{
    id :String,
    token :String,
    email :String,
    name :String,
  }
});


//methods
//generate hash
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//check if password is valid

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

//create model for user and expose to app

module.exports = mongoose.model('User', userSchema);
