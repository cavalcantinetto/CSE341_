const mongoose = require('mongoose');
//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "studentName": {
        type: String,
        required: true
    },
    "studentEmail": {
        type: String,
        required: true
    },
    "studentBirth": {
        type: String,
        required: true
    },
    "studentPass": {
        type: String,
        required: true
    },
    "studentLevel": {
        type: String,
        required: true
    }

})
module.exports = mongoose.model("students", contactSchema)