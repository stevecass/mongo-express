
module.exports = function(mgoose) {
  var bcrypt = require('bcrypt');

  var userSchema = mgoose.Schema({ 
    username: String, 
    email: String,
    password_digest: String
  });

  userSchema.pre('save', function(next){
    this.password_digest = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
    return next();
  });

  return mgoose.model('User', userSchema);
};
