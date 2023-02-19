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
const authorization = require('../../functions/auth');


//get All teachers
routes.get('/getall', authorization, async(req, res) => {
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
routes.get('/getone/:id', authorization, getteacher, (req, res) => {
    //get teacher validates return.
    return res.json(res.teacher);
})

//insert contact
routes.post('/register', [
        //check if name is not null
        body('name').not().isEmpty().trim().escape(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 5 }),
        body('class').not().isEmpty().trim().escape(),
    ],
    async(req, res) => {
        const email = req.body.email;
        const emailExist = await CheckEmail(email);
        console.log(emailExist.length);
        if (emailExist.length) {
            return res.status(400).json({ message: "Email já cadastrado no sistema. Tente logar ou cadastre um novo e-mail." })
        }
        var hashedPass;
        const date = new Date().toLocaleDateString();
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //encrypt password before put it in data base
            hashedPass = await bcrypt.hash(req.body.password, 10);
            try {
                //connect and try to insert in Db
                const newteacher = new teacherdb({
                    "teacherName": req.body.name,
                    "teacherEmail": req.body.email,
                    "teacherPass": hashedPass,
                    "teacherLevel": "20",
                    "teacherClass": req.body.class,
                    "dateInserted": date

                })
                const newcontactResult = await newteacher.save();
                return res.status(201).json(newcontactResult);

            } catch (err) {
                console.log(err.message)
                return res.status(500).json({ message: err.message });
            }

        } else {
            return res.status(400).json({ errors: errors.array() })
        }
    })

//update contact

routes.patch('/update/:id', authorization, [getteacher,
        //check if name is not null
        body('name').not().isEmpty().trim().escape(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 5 }),
        body('class').not().isEmpty().trim().escape(),

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
routes.delete('/remove/:id', getteacher, async(req, res) => {
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

async function CheckEmail(email) {
    let teacher;
    try {
        teacher = await teacherdb.find({ "teacherEmail": email });
        if (teacher == null) {
            return res.status(404).json({ message: "Could not find teacher" })
        }

    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "teacherId doesn't exist" })
        }
        return res.status(500).json({ message: err.message })
    }
    return teacher;

}
module.exports = routes