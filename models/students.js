const mongoose = require('mongoose');
//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "studentName": {
        type: String,
        required: true
    },
    "studentEmail": {
        type: String
    },
    "studentBirth": {
        type: String,
        required: true
    },
    "studentClass": {
        type: String,
        required: true
    }

})
module.exports = mongoose.model("students", contactSchema)