const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');
//const LinkedinStrategy = require('./min').Strategy;

var LINKEDIN_CLIENT_ID = "50p3e3wo29te";
var LINKEDIN_CLIENT_SECRET = "CUFBLLzfpU24oQ3B";

module.exports = function(passport){
  let opts = {};
  // opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      //console.log(jwt_payload);
    User.getUserById(jwt_payload._doc._id, (err, user) => {
      if(err){
        return done(err, false);
      }

      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));

//   // Passport session setup.
//   passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(obj, done) {
//     done(null, obj);
//   });
//   // Use the LinkedinStrategy within Passport.
//   passport.use(new LinkedinStrategy({
//     clientID:     LINKEDIN_CLIENT_ID,
//     clientSecret: LINKEDIN_CLIENT_SECRET,
//     callbackURL:  "http://localhost:3000/auth/linkedin/callback",
//     scope:        [ 'r_basicprofile', 'r_emailaddress'],
//     passReqToCallback: true
//   },
//   function(req, accessToken, refreshToken, profile, done) {
//     // asynchronous verification, for effect...
//     req.session.accessToken = accessToken;
//     process.nextTick(function () {
//       // To keep the example simple, the user's Linkedin profile is returned to
//       // represent the logged-in user.  In a typical application, you would want
//       // to associate the Linkedin account with a user record in your database,
//       // and return that user instead.
//       return done(null, profile);
//     });
//   }
// ));

}
