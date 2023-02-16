require('dotenv').config();
const { cookie } = require('express-validator');
const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth2').Strategy;


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

passport.use(new OAuth2Strategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        // console.log(accessToken);
        // console.log(refreshToken)
        // console.log(profile)
        return cb(null, profile);
    }

));


passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})


// User.findOrCreate({ exampleId: profile.id }, function (err, user) {
//     return cb(err, user);