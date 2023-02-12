require('dotenv').config();
const express = require('express');
const routes = express.Router();
const bp = require('body-parser');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))
const passport = require('passport');
require('../../functions/passport-config');
const session = require('express-session');


//passport will handle sessions to keep user data 
const secret = process.env.SECRET_SESSION;
routes.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));
routes.use(passport.initialize())
routes.use(passport.session())
routes.use(passport.authenticate('session'));

routes.get('/googlelogin',
    passport.authenticate('google', { scope: ['email', 'profile'] }))

routes.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    async function(req, res, next) {
        const teacherName = await req.user.displayName;
        const teacherEmail = await req.user.email;
        res.status(200).json({
            'teacherName': teacherName,
            'teacherEmail': teacherEmail
        })

    });


module.exports = routes