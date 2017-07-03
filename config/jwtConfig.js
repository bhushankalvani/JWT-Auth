const jwtPassport = require('passport-jwt');
const User = require('../models/userModel');

const ExtractJwt = jwtPassport.ExtractJwt;
const JWTStrategy = jwtPassport.Strategy;

const jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeader();
// NOTE: Generate a new secret for every project online.
jwtOpts.secretOrKey = '4u7x!A%D*G-KaPdSgVkYp3s6v8y/B?E(';

const jwtStrategy = new JWTStrategy(jwtOpts, (jwtPayload, done) => {
  User.findOne({ _id: jwtPayload.id }, (findErr, user) => {
    if (findErr) return done(findErr, false);
    if (!user) return done(null, false);
    return done(null, user);
  });
});

module.exports = jwtStrategy;
