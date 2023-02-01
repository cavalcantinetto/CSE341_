require('dotenv').config();
const express = require('express');
const routes = express.Router();
const bookdb = require('../models/books')
const bp = require('body-parser');
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))
const authorization = require('./auth')

// routes.get('/books', authorization, (req, res) => {
//     console.log(authorization);
// })

// //get books
routes.get('/books', authorization, async(req, res) => {
    try {
        const books = await bookdb.find();
        if (!books) {
            return res.status(204).json({ message: "No data was found" })
        } else {
            return res.status(200).json(books);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one Book
routes.get('/books/:id', authorization, getbook, (req, res) => {
    //get books validates return.
    return res.json(res.teacher);
})

//insert Book
routes.post('/books/register',
    //insert a middleWare to ensure BookName is Not null
    body('name').not().isEmpty().trim().escape(),
    //insert a middleWare to ensure BookOwner is Not null
    body('owner').not().isEmpty().trim().escape(),
    //make sure before check to import a list of classes to check if class exists
    body('class').not().isEmpty().trim().escape(),
    // let booklist = import list
    // body('class').isIn(bookList),
    async(req, res) => {
        let name = req.body.name;
        let belongsTo = req.body.owner;
        let classes = req.body.class;
        let contador = 0;
        let lendedTo = req.body.lendedTo;
        let today = Date.now();

        try {
            //connect and try to insert in Db
            const newbook = new bookdb({
                "bookName": name,
                "belongsTo": belongsTo,
                "class": classes,
                "timesLended": contador,
                "lendedTo": lendedTo,
                "date": today

            })
            const newcontactresult = await newbook.save();
            res.status(201).json(newcontactresult);

        } catch (err) {
            console.log('falhou ao gravar dados do livro')
            res.status(400).json({ message: err.message });
        }
    })




// //update contact

// routes.patch('/books/:id', [getbook,
//         //check if name is not null
//         body('name').not().isEmpty().trim().escape(),
//         body('email').isEmail().normalizeEmail()
//     ],
//     async(req, res) => {
//         const errors = validationResult(req);
//         if (errors.isEmpty()) {
//             //Saves name
//             res.book.bookName = req.body.name
//                 //saves bookEmail
//             res.book.bookEmail = req.body.email;
//         } else {
//             return res.status(400).json({ errors: errors.array() })
//         }

//         try {
//             const updatedbook = await res.book.save();
//             if (!updatedteacher) {
//                 return res.status(404).json({ message: "Id not found or invalid" });
//             }
//             return res.status(202).json(updatedteacher);

//         } catch (err) {
//             res.status(400).json({ message: err.message })

//         }
//     })

// //delete contact
// routes.delete('/books/:id', getteacher, async(req, res) => {
//     try {
//         await res.teacher.remove();
//         res.status(200).json({ message: "teacher was deleted" })

//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

async function getbook(req, res, next) {
    let book;
    try {
        book = await bookdb.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: "Could not find teacher" })
        }

    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "bookId doesn't exist" })
        }
        return res.status(500).json({ message: err.message })
    }
    res.book = book;
    next();

}

module.exports = routes