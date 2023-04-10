require('dotenv').config();
const express = require('express');
const routes = express.Router();
const userdb = require('../../../models/user')
const bp = require('body-parser');
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))
const bcrypt = require('bcrypt');
const authorization = require('../../../functions/auth');


//get All users
routes.get('/getall', authorization, async(req, res) => {
    try {
        const users = await userdb.find();
        if (!users) {
            return res.status(204).json({ message: "No data was found" })
        } else {
            return res.status(200).json(users);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one contact
routes.get('/getone/:id', authorization, getuser, (req, res) => {
    //get user validates return.
    return res.json(res.user);
})

//insert contact
routes.post('/register', [
        //check if name is not null
        body('name').not().isEmpty().trim().escape(),
        body('email').isEmail().normalizeEmail(),
    ],
    async(req, res) => {
        const email = req.body.email;
        const emailExist = await CheckEmail(email);
        console.log(emailExist.length);
        if (emailExist.length) {
            return res.status(400).json({ message: "Email já cadastrado no sistema. Tente logar ou cadastre um novo e-mail." })
        }
        var hashedPass;
        // const date = new Date().toLocaleDateString();
            //encrypt password before put it in data base
            hashedPass = await bcrypt.hash(req.body.userPass, 10);
            try {
                //connect and try to insert in Db
                const newuser = new userdb({
                    "userName": req.body.userName,
                    "userEmail": req.body.userEmail,
                    "userPass": hashedPass,
                    "userKids": req.body.userKids

                })
                console.log(newuser)
                const newcontactResult = await newuser.save();
                return res.status(201).json(newcontactResult);

            } catch (err) {
                console.log(err.message)
                return res.status(500).json({ message: err.message });
            }
    })

//update contact

routes.patch('/update/:id', authorization, [getuser,
        //check if name is not null
        body('name').not().isEmpty().trim().escape(),
        body('email').isEmail().normalizeEmail()

    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //Saves name
            res.user.userName = req.body.name
                //saves userEmail
            res.user.userEmail = req.body.email;
        } else {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const updateduser = await res.user.save();
            if (!updateduser) {
                return res.status(404).json({ message: "Id not found or invalid" });
            }
            return res.status(202).json(updateduser);

        } catch (err) {
            res.status(400).json({ message: err.message })

        }
    })

//delete contact
routes.delete('/remove/:id', getuser, async(req, res) => {
    try {
        await res.user.remove();
        res.status(200).json({ message: "user was deleted" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getuser(req, res, next) {
    let user;
    try {
        user = await userdb.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Could not find user" })
        }

    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "userId doesn't exist" })
        }
        return res.status(500).json({ message: err.message })
    }
    res.user = user;
    next();

}

async function CheckEmail(email) {
    let user;
    try {
        user = await userdb.find({ "userEmail": email });
        if (user == null) {
            return res.status(404).json({ message: "Could not find user" })
        }

    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "userId doesn't exist" })
        }
        return res.status(500).json({ message: err.message })
    }
    return user;

}
module.exports = routes