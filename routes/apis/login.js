require('dotenv').config();
const express = require('express');
const routes = express.Router();
const teacherdb = require('../../models/teacher')
const bp = require('body-parser');
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authorization = require('../../functions/auth');
const cookieParser = require('cookie-parser');

routes.get('/', () => {
    res.render('')
})

routes.post('/', async function(req, res) {
    const teacherEmail = req.body.email;
    const teacherPass = req.body.password;

    if (teacherEmail === null) {
        return res.status(400).json({ message: err.message });
    }

    //get data using email as a parameter
    teacherData = await teacherdb.find({ teacherEmail: teacherEmail });
    if (teacherData == null) {
        return res.status(404).json({ message: "Not found" });
    } else {
        teacherData = teacherData[0];
    }

    //compare password with hashed password
    const result = await bcrypt.compare(teacherPass, teacherData.teacherPass);
    if (result === false) {
        res.status(401).json({ message: "Password Incorrect" })
    }

    const accessToken = jwt.sign({ teacherName: teacherData.teacherName, teacherEmail: teacherData.teacherEmail },
        process.env.ACCESS_TOKEN_SECRET);
    //saves the token in a secure cookie. Remember to set httpOnly to true
    res.cookie('accessToken', accessToken)
    res.redirect('bookspage');
});

module.exports = routes