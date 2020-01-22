var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var passport = require('passport');
var userModel = require('../models/data');
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwtt');
opts.secretOrKey = 'MYsecretkey123';
module.exports=passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    userModel.findOne({email: jwt_payload.email}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));