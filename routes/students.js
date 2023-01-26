const express = require('express');
const routes = express.Router();
const studentdb = require('../models/students')
const bp = require('body-parser');
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))

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

//insert contact
routes.post('/students',
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
            const newstudent = new studentdb({
                "studentName": req.body.name,
                "studentEmail": req.body.email,
                "studentBirth": req.body.birth,
                "studentPass": req.body.password

            })
            const newcontactresult = await newstudent.save();
            res.status(201).json(newcontactresult);

        } catch (err) {
            console.log('falhou ao gravar dados do aluno')
            res.status(400).json({ message: err.message });
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
module.exports = routes