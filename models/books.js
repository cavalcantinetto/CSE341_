const mongoose = require('mongoose');

//defines a schema for the database.
const bookSchema = new mongoose.Schema({


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
        type: String
    },
    "timesBorrowed": {
        type: String,
        required: true
    },
    "dateOfBorrow": {
        type: String

    },
    "date": {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Book", bookSchema)