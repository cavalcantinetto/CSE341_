require('dotenv').config();
const express = require('express');
const routes = express.Router();
const bookdb = require('../models/books')
const bp = require('body-parser');
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//get contacts
routes.get('/books', async(req, res) => {
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

//get one contact
routes.get('/books/:id', getbook, (req, res) => {
    //get book validates return.
    return res.json(res.book);
})

//testing purposes
routes.get('/logged', authorization, (req, res) => {
    console.log(req.user);
})

//insert contact
routes.post('/books/register',
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
            const newbook = new bookdb({
                "bookName": req.body.name,
                "bookEmail": req.body.email,
                "bookBirth": req.body.birth,
                "bookPass": hashedPass

            })
            const newcontactresult = await newbook.save();
            res.status(201).json(newcontactresult);

        } catch (err) {
            console.log('falhou ao gravar dados do aluno')
            res.status(400).json({ message: err.message });
        }
    })


//routing Login

routes.post('/books/login', async(req, res) => {
    const bookEmail = req.body.email;
    const bookPass = req.body.password;
    if (bookEmail === null) {
        return res.status(400).json({ message: err.message });

    }

    try {
        //get data using email as a parameter
        bookData = await bookdb.find({ bookEmail: bookEmail });
        if (bookData == null) {
            return res.status(404).json({ message: "Not found" });
        } else {
            bookData = bookData[0];
        }
        //compare password with hashed password
        const result = await bcrypt.compare(bookPass, bookData.bookPass);
        //if of moveon to the next stage
        //JsonWebToken will be delivered
        if (result) {
            // console.log("entrei aqui")
            const userData = {
                bookName: bookData.bookName,
                bookEmail: bookData.bookEmail
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

//delete contact
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
        book = await bookdb.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: "Could not find book" })
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