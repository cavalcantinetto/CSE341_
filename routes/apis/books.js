const express = require('express');
const routes = express.Router();
const Book = require('../../models/books')
const { body, validationResult } = require('express-validator');
const { default: mongoose, now } = require('mongoose');
const authorization = require('../../functions/auth');

//get books
routes.get('/', authorization, async(req, res) => {
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
routes.get('/:id', authorization, getbook, (req, res) => {
    //get book validates return.
    return res.json(res.book);
})

//insert book
routes.post('/insertbook', authorization, async(req, res) => {
    console.log('estou aqui')
    try {
        const date = new Date().toLocaleDateString()
        const newBook = new Book({
            bookName: req.body.bookName,
            belongsTo: req.body.belongsTo,
            class: req.body.class,
            borrowedBy: "none",
            timesBorrowed: 0,
            dateOfBorrow: "0",
            date: date


        })
        const newBookresult = await newBook.save();
        res.status(201).json(newBookresult);

    } catch (err) {
        console.log('falhou ao gravar dados do book')
        res.status(400).json({ message: err.message });
    }
})

//update book
routes.patch('/:id', authorization, getbook,
    async(req, res) => {
        try {
            res.book.borrowedBy = req.body.studentName
            res.book.timesBorrowed = (parseInt(res.book.timesBorrowed) + 1).toString()
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

//delete book
routes.delete('/:id', authorization, getbook, async(req, res) => {
    try {
        await res.book.remove();
        res.status(200).json({ message: "book was deleted" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



//thsi function will get an specific book at database.
async function getbook(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);
        if (!book) {
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