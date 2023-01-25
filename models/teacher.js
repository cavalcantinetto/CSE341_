const mongoose = require('mongoose');
//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "teacherName": {
        type: String,
        required: true
    },
    "emailTeacher": {
        type: String,
        required: true
    },
    "teacherPassword": {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("teacher", contactSchema)