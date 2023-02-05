require('dotenv').config();
const express = require('express');
const routes = express.Router();
const studentdb = require('../../models/students')
const bp = require('body-parser');
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//get contacts
routes.get('/students', async(req, res) => {
    try {
        const students = await studentdb.find();
        if (!students) {
            return res.status(204).json({ message: "No data was found" })
        } else {
            return res.status(200).json(students);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one contact
routes.get('/students/:id', getstudent, (req, res) => {
    //get student validates return.
    return res.json(res.student);
})

//testing purposes
routes.get('/logged', authorization, (req, res) => {
    console.log(req.user);
})

//insert contact
routes.post('/students/register',
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
            const newstudent = new studentdb({
                "studentName": req.body.name,
                "studentEmail": req.body.email,
                "studentBirth": req.body.birth,
                "studentPass": hashedPass

            })
            const newcontactresult = await newstudent.save();
            res.status(201).json(newcontactresult);

        } catch (err) {
            console.log('falhou ao gravar dados do aluno')
            res.status(400).json({ message: err.message });
        }
    })


//routing Login

routes.post('/students/login', async(req, res) => {
    const studentEmail = req.body.email;
    const studentPass = req.body.password;
    if (studentEmail === null) {
        return res.status(400).json({ message: err.message });

    }

    try {
        //get data using email as a parameter
        studentData = await studentdb.find({ studentEmail: studentEmail });
        if (studentData == null) {
            return res.status(404).json({ message: "Not found" });
        } else {
            studentData = studentData[0];
        }
        //compare password with hashed password
        const result = await bcrypt.compare(studentPass, studentData.studentPass);
        //if of moveon to the next stage
        //JsonWebToken will be delivered
        if (result) {
            // console.log("entrei aqui")
            const userData = {
                studentName: studentData.studentName,
                studentEmail: studentData.studentEmail
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



//update contact

routes.put('/students/:id', [getstudent,
        //check if name is not null
        body('name').not().isEmpty().trim().escape(),
        body('email').isEmail().normalizeEmail()
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //Saves name
            res.student.studentName = req.body.name
                //saves studentEmail
            res.student.studentEmail = req.body.email;
        } else {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const updatedStudent = await res.student.save();
            if (!updatedStudent) {
                return res.status(404).json({ message: "Id not found or invalid" });
            }
            return res.status(202).json(updatedStudent);

        } catch (err) {
            res.status(400).json({ message: err.message })

        }
    })

//delete contact
routes.delete('/students/:id', getstudent, async(req, res) => {
    try {
        await res.student.remove();
        res.status(200).json({ message: "Student was deleted" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getstudent(req, res, next) {
    let student;
    try {
        student = await studentdb.findById(req.params.id);
        if (student == null) {
            return res.status(404).json({ message: "Could not find student" })
        }

    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "StudentId doesn't exist" })
        }
        return res.status(500).json({ message: err.message })
    }
    res.student = student;
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