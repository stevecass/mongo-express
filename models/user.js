
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

  userSchema.methods.passwordMatches = function(attempt) {
    return bcrypt.compareSync(attempt, this.password_digest);
  }

  return mgoose.model('User', userSchema);
};
