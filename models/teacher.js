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
    "teacherBirth": {
        type: String,
        required: true
    },
    "teacherPass": {
        type: String,
        required: true
    },
    "teacherLevel": {
        type: String,
        required: true
    },
    "teacherClass": {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("teacher", contactSchema)