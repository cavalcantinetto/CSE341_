const express = require('express');
const routes = express.Router();
const studentdb = require('../models/students')
const bp = require('body-parser');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))

//get contacts
routes.get('/students', async(req, res) => {
    try {
        console.log("i'm gotta collect all students");
        const students = await studentdb.find();
        res.json(students);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one contact
routes.get('/students/:id', getstudent, (req, res) => {
    res.json(res.student);
})

//insert contact
routes.post('/students', async(req, res) => {
    const newstudent = new studentdb({
        "studentName": req.body.name
    })
    try {
        const newcontactresult = await newstudent.save();
        res.status(201).json(newcontactresult);

    } catch (err) {
        console.log('falhou ao gravar dados do aluno')
        res.status(400).json({ message: err.message });
    }
})

//update contact
routes.put('/students/:id', getstudent, async(req, res) => {
    if (req.body.name != null) {
        res.student.studentName = req.body.name
        console.log(req.body.name)
        console.log(res.student.studentName)

    }

    try {
        const updatedStudent = await res.student.save();
        res.status(204).json(updatedStudent);
        console.log(res.student);

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
            return res.status(404).json({ message: "could not find student" })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.student = student;
    next();

}
module.exports = routes