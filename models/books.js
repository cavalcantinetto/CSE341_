const mongoose = require('mongoose');
//defines a schema for the database.
const contactSchema = new mongoose.Schema({

    "books": {
        "bookName": {
            type: String,
            required: true
        },
        "belongsTo": {
            type: String,
            required: true
        },
        "class": {
            type: String,
            required: true
        },
        "borrowedBy": {
            type: String,
            required: true
        },
        "TimesBorrowed": {
            type: String,
            required: true
        },
        "DateOfBorrow": {
            type: String,
            required: true
        }
    }
})


module.exports = mongoose.model("books", contactSchema)