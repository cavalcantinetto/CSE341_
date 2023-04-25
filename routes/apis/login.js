require('dotenv').config();
const express = require('express');
const routes = express.Router();
const UserDb = require('../../models/user')
const Turmas = require('../../models/turmas')
const bp = require('body-parser');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../../functions/passport-config');

routes.post('/recuperasenha', async function(req, res, next) {
    const userEmail = req.body.email;
    try {
        
        if (userEmail === null) {
            return res.status(400).json({ message: err.message });
        }

        let userData = await UserDb.find({ userEmail: userEmail });
        console.log(userData.length)
        if (userData.length == 0) {
            return res.status(404).json({ message: `Usuário não encontrado. Talvez seu e-mail (${userEmail}) não esteja correto ou não esteja cadastrado.\nConfirme seu e-mail e se ele estiver correto entre em contato com a secretaria.` });
        } else {
            userData = userData[0];

            if(userData.userPass) {
                return res.status(200).json({userPass: userData.userPass})
            } else {
                return res.status(404).json({ message: `Esse e-mail (${userEmail}) não está cadastrado.\nVerifique se digitou corretamente e tente novamente.\nSe seu e-mail estiver correto, entre em contato com a secretaria da escola.` });
            }
        }

    } catch(err) {
        console.log(err)
        return res.status(404).json({ message: `Usuário não encontrado. Talvez seu e-mail (${userEmail}) não esteja correto ou não esteja cadastrado. \nSe o email estiver correto, entre em contato com a secretaria da escola.` });
    }
})

routes.post('/login', async function(req, res, next) {
    const userEmail = req.body.email;
    const userPass = req.body.password;

    if (userEmail === null) {
        return res.status(400).json({ message: err.message });
    }

    //get data using email as a parameter
    userData = await UserDb.find({ userEmail: userEmail });
    if (!userData) {
        return res.status(404).json({ message: "Usuário não encontrado 1" });
    } else {
        userData = userData[0];
    //     if(userData.userKids.length) {
    //         counter = userData.userKids.length;
    //         while(counter>0) {
    //             kidClass = await Turmas.find({nome: userData.userKids[counter-1]});
    //             userData.userKids[counter-1] = `{${userData.userKids[counter-1]}:${kidClass[0].turma}}`
    //             console.log(userData.userKids)
    //             counter = counter - 1;
    //         }
    // }
    }
    if (userData == undefined) {
        console.log(userData)
        return res.status(404).json({ message: "Usuário não encontrado" });

    }
    //compare password with hashed password
    if (!userData.userPass) {
        return res.status(404).json({ message: "Senha não cadastrada" });
    }
    const result = await (userPass == userData.userPass);
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