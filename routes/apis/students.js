require('dotenv').config();
const express = require('express');
const routes = express.Router();
const Student = require('../../models/students')
const bp = require('body-parser');
const { body, validationResult } = require('express-validator');
const authorization = require('../../functions/auth');
const mongoose = require('mongoose')

routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))


//get all students
routes.get('/', authorization, async(req, res) => {
    try {
        const students = await Student.find();
        if (!students) {
            return res.status(204).json({ message: "No data was found" })
        } else {
            return res.status(200).json(students);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one student
routes.get('/:id', authorization, getstudent, (req, res) => {
    //get student validates return.
    return res.json(res.student);
})

//insert Student
routes.post('/insertstudent', authorization, async(req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ errors: "Name is null" })
    }
    if (!req.body.birth) {
        return res.status(400).json({ errors: "Birth is null" })
    }
    if (!req.body.class) {
        return res.status(400).json({ errors: "Class is null" })
    }
    //Saves all data
    const newStudent = new Student({
        studentName: req.body.name,
        studentEmail: req.body.email,
        studentBirth: req.body.birth,
        studentClass: req.body.class
    })

    try {
        const updatedStudent = await newStudent.save();
        if (!updatedStudent) {
            return res.status(500).json({ message: "DataBaseError" });
        }
        return res.status(202).json(updatedStudent);

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//insert Student
routes.patch('/:id', authorization, getstudent, async(req, res) => {

    try {
        if (req.body.name) {
            res.student.studentName = req.body.name;
        }
        if (req.body.email) {
            res.student.studentEmail = req.body.email;
        }
        if (req.body.birth) {
            res.student.studentBirth = req.body.birth;
        }
        if (req.body.class) {
            res.student.studentClass = req.body.class;
        }

        const updatedStudent = await res.student.save();
        if (!updatedStudent) {
            return res.status(404).json({ message: "Invalid Id" });
        }
        return res.status(202).json(updatedStudent);

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

routes.delete('/:id', authorization, getstudent, async(req, res) => {
    try {
        res.student.remove();
        res.status(200).json({ message: "Student was deleted" })

    } catch {
        res.status(500).json({ message: err.message })
    }
})

async function getstudent(req, res, next) {
    let student;
    try {
        student = await Student.findById(req.params.id);
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