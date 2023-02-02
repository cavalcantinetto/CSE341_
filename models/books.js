const mongoose = require('mongoose');
//defines a schema for the database.
const BookSchema = new mongoose.Schema({
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
        required: false
    },
    "timesBorrowed": {
        type: String,
        required: false
    },
    "dateOfBorrow": {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("Book", BookSchema)