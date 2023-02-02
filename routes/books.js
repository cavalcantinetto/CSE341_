require('dotenv').config();
const express = require('express');
const routes = express.Router();
const Book = require('../models/books')
const bp = require('body-parser');
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//get books
routes.get('/books', async(req, res) => {
    try {
        const books = await Book.find();
        if (!books) {
            return res.status(204).json({ message: "No data was found" })
        } else {
            return res.status(200).json(books);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one book
routes.get('/books/:id', getbook, (req, res) => {
    //get book validates return.
    return res.json(res.book);
})

//insert book
routes.post('/books',
    //insert a middleWare to ensure email is correctly formatted
    //After it checks if name is not null (empty)
    // body('email').isEmail().normalizeEmail(),
    // body('name').not().isEmpty().trim().escape(),
    async(req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     console.log("catch an error")
        //     return res.status(400).json({ errors: errors.array() });
        // }

        try {
            const newBook = new Book({
                bookName: req.body.bookName,
                belongsTo: req.body.belongsTo,
                class: req.body.class,
                timesBorrowed: 0
            })
            const newBookresult = await newBook.save();
            res.status(201).json(newBookresult);

        } catch (err) {
            console.log('falhou ao gravar dados do book')
            res.status(400).json({ message: err.message });
        }
    })

//update book
routes.patch('/books/:id', getbook,
    async(req, res) => {
        try {
            res.book.borrowedBy = req.body.studentName
            res.book.timesBorrowed = parseInt(res.book.timesBorrowed) + 1
            res.book.dateOfBorrow = new Date().toLocaleDateString()

            const updatedbook = await res.book.save();
            if (!updatedbook) {
                return res.status(404).json({ message: "Id not found or invalid" });
            }
            return res.status(202).json(updatedbook);

        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
)

//update book
routes.put('/books/:id', [getbook,
        //check if name is not null
        body('name').not().isEmpty().trim().escape(),
        body('email').isEmail().normalizeEmail()
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //Saves name
            res.book.bookName = req.body.name
                //saves bookEmail
            res.book.bookEmail = req.body.email;
        } else {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const updatedbook = await res.book.save();
            if (!updatedbook) {
                return res.status(404).json({ message: "Id not found or invalid" });
            }
            return res.status(202).json(updatedbook);

        } catch (err) {
            res.status(400).json({ message: err.message })

        }
    })

//delete book
routes.delete('/books/:id', getbook, async(req, res) => {
    try {
        await res.book.remove();
        res.status(200).json({ message: "book was deleted" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getbook(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: "Could not find book" })
        }
        res.book = book;
    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "bookId doesn't exist" })
        }
        return res.status(500).json({ message: err.message })
    }
    next();
}

module.exports = routes