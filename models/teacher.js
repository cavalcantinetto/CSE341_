const mongoose = require('mongoose');

//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "teacherName": {
        type: String,
        required: true
    },
    "teacherEmail": {
        type: String,
        required: true
    },
    "teacherPass": {
        type: String
    },
    "teacherLevel": {
        type: Number,
        required: true,
        default: 1
    }
})

module.exports = mongoose.model("teacher", contactSchema)