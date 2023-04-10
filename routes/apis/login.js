require('dotenv').config();
const express = require('express');
const routes = express.Router();
const UserDb = require('../../models/user')
const bp = require('body-parser');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../../functions/passport-config');

routes.post('/login', async function(req, res, next) {
    const userEmail = req.body.email;
    const userPass = req.body.password;

    if (userEmail === null) {
        return res.status(400).json({ message: err.message });
    }

    //get data using email as a parameter
    console.log(userEmail)
    userData = await UserDb.find({ userEmail: userEmail });
    if (!userData) {
        return res.status(404).json({ message: "Usuário não encontrado 1" });
    } else {
        userData = userData[0];
    }

    if (userData == undefined) {
        console.log(userData)
        return res.status(404).json({ message: "Usuário não encontrado 2" });

    }
    //compare password with hashed password
    if (!userData.userPass) {
        return res.status(404).json({ message: "Usuário não encontrado 3" });
    }
    const result = await bcrypt.compare(userPass, userData.userPass);
    if (result === false) {
        return res.status(401).json({ message: "Password Incorreto" })

    }

    const accessToken = jwt.sign({ userName: userData.userName, userEmail: userData.userEmail, userKids: userData.userKids, userLevel: userData.userLevel  },
        process.env.ACCESS_TOKEN_SECRET);
    //saves the token in a secure cookie. Remember to set httpOnly to true
    res.cookie('accessToken', accessToken)
    let auth = "Bearer " + accessToken;
    res.status(200).json({
        Headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer  ${accessToken}`
        },
        body: { 
            token: accessToken, 
            userData: userData 
        }
    });
        
});

routes.get('/logout', (req, res) => {
    req.cookies.accessToken = "";
    res.cookie('accessToken', "");
    res.status(200).json({ message: "Token removed" })
})




module.exports = routes