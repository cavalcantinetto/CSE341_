require('dotenv').config();
const express = require('express');
const routes = express.Router();
const bp = require('body-parser');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))
const passport = require('passport');
require('../../functions/passport-config');
const jwt = require('jsonwebtoken');
const { authenticate } = require('passport');



routes.get('/googlelogin',
    passport.authenticate('google', { scope: ['email', 'profile'] }))

routes.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    async function(req, res, next) {
        const teacherName = await req.user.displayName;
        const teacherEmail = await req.user.email;
        const accessToken = jwt.sign({ teacherName: teacherName, teacherEmail: teacherEmail },
            process.env.ACCESS_TOKEN_SECRET);
        //saves the token in a secure cookie. Remember to set httpOnly to true
        res.cookie('accessToken', accessToken)
            // res.status(200).json({ token: accessToken })
            // res.setHeader('Authorization', 'Bearer ' + accessToken)
        res.redirect('/books/getall')

    });



module.exports = routes