const localStrategy = require('passport-local').Strategy;

function initialize(passport) {
    const authenticateUser = (email, password, done) => {

    }
    passport.use(new localStrategy({ usernameField: 'email' }),
        autheticateUser)
}
module.exports = initialize