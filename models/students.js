const mongoose = require('mongoose');
//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "studentName": {
        type: String,
        required: true
    },
    "studentParent": {
        type: String
    },
    "studentClass": {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("students", contactSchema)