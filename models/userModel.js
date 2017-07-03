const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const saltRounds = 15;

const User = new Schema({
  name: String,
  email: String,
  password: String,
});

User.methods.validatePassword = function (userPassword, cb) { // eslint-disable-line
  bcrypt.compare(userPassword, this.password, (compareErr, isMatch) => {
    if (compareErr) return cb(compareErr);
    return cb(null, isMatch);
  });
};

User.pre('save', function (next) { // eslint-disable-line
  const user = this;
  if (!user.isModified('password')) {
    next();
    return;
  }
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) {
      next(err);
      return;
    }
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('users', User);
