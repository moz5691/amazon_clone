const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    match: [/^[a-z0-9]{5,30}$/, "Please enter a valid username"],///^[a-zA-Z][a-zA-Z0-9.\-_$@!]{5,30}$/
    required: true
  },
  email:{
    type: String,
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    required: "email is not valid"
  },
  password: {
    type: String,
    match: [/^[a-z0-9]{5,30}$/, "Please enter a valid password"],//[/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "Please enter a valid password"],
    required: "password is Required"
  }
});

UserSchema.pre('save', function(next){
  let myUser = this;
  bcrypt.hash(myUser.password, null, null, function(err, hash){
      if(err)return next(err);
      myUser.password = hash;
      next();
  });
});

UserSchema.methods.comparePasword = function(password){
  return bcrypt.compareSync(password, this.password);
};


const User = mongoose.model('User', UserSchema);
module.exports = User;
