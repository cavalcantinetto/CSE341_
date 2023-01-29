require('dotenv').config();
const express = require('express');
const routes = express.Router();
const teacherdb = require('../models/teacher')
const bp = require('body-parser');
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//get contacts
routes.get('/teachers', authorization, async(req, res) => {
    try {
        const teachers = await teacherdb.find();
        if (!teachers) {
            return res.status(204).json({ message: "No data was found" })
        } else {
            return res.status(200).json(teachers);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one contact
routes.get('/teachers/:id', getteacher, (req, res) => {
    //get teacher validates return.
    return res.json(res.teacher);
})

//insert contact
routes.post('/teachers/register',
    //insert a middleWare to ensure email is correctly formatted
    //After it checks if name is not null (empty)
    body('email').isEmail().normalizeEmail(),
    body('name').not().isEmpty().trim().escape(),
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("catch an error")
            return res.status(400).json({ errors: errors.array() });
        }


        try {
            //encrypt password before put it in data base
            const hashedPass = await bcrypt.hash(req.body.password, 10);
            //connect and try to insert in Db
            const newteacher = new teacherdb({
                "teacherName": req.body.name,
                "teacherEmail": req.body.email,
                "teacherBirth": req.body.birth,
                "teacherPass": hashedPass,
                "teacherLevel": req.body.teacherLevel

            })
            const newcontactresult = await newteacher.save();
            res.status(201).json(newcontactresult);

        } catch (err) {
            console.log('falhou ao gravar dados do aluno')
            res.status(400).json({ message: err.message });
        }
    })


//routing Login

routes.post('/teachers/login', async(req, res) => {
    const teacherEmail = req.body.email;
    const teacherPass = req.body.password;
    console.log(teacherEmail, teacherPass);
    if (teacherEmail === null) {
        return res.status(400).json({ message: err.message });

    }

    try {
        console.log("entrei no try");
        //get data using email as a parameter
        teacherData = await teacherdb.find({ teacherEmail: teacherEmail });
        if (teacherData == null) {
            return res.status(404).json({ message: "Not found" });
        } else {
            teacherData = teacherData[0];
        }
        //compare password with hashed password
        const result = await bcrypt.compare(teacherPass, teacherData.teacherPass);
        //if of moveon to the next stage
        //JsonWebToken will be delivered
        if (result) {
            // console.log("entrei aqui")
            const userData = {
                teacherName: teacherData.teacherName,
                teacherEmail: teacherData.teacherEmail
            }
            const accessToken = jwt.sign(userData,
                process.env.ACCESS_TOKEN_SECRET)
            res.json({ accessToken: accessToken })
            console.log("Success")

        } else {
            res.status(401).json({ message: "Password Incorrect" })
        }

    } catch (error) {
        res.status(500).send(error);
    }

})


//logout
routes.post('/teachers/logout', async(req, res) => {
    const accessToken = null
    res.json({ accessToken: accessToken })
})


//update contact

routes.patch('/teachers/:id', [getteacher,
        //check if name is not null
        body('name').not().isEmpty().trim().escape(),
        body('email').isEmail().normalizeEmail()
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //Saves name
            res.teacher.teacherName = req.body.name
                //saves teacherEmail
            res.teacher.teacherEmail = req.body.email;
        } else {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const updatedteacher = await res.teacher.save();
            if (!updatedteacher) {
                return res.status(404).json({ message: "Id not found or invalid" });
            }
            return res.status(202).json(updatedteacher);

        } catch (err) {
            res.status(400).json({ message: err.message })

        }
    })

//delete contact
routes.delete('/teachers/:id', getteacher, async(req, res) => {
    try {
        await res.teacher.remove();
        res.status(200).json({ message: "teacher was deleted" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getteacher(req, res, next) {
    let teacher;
    try {
        teacher = await teacherdb.findById(req.params.id);
        if (teacher == null) {
            return res.status(404).json({ message: "Could not find teacher" })
        }

    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "teacherId doesn't exist" })
        }
        return res.status(500).json({ message: err.message })
    }
    res.teacher = teacher;
    next();

}

async function authorization(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ message: "Not Authorized" })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403), json({ message: "invalid Token" });
        req.user = user;
        next();
    })

}
module.exports = routes