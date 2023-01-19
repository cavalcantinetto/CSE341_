const mongoose = require('mongoose');
//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "teacher": {
        "teacherName": {
            type: String,
            required: true
        }

    }
})

module.exports = mongoose.model("teacher", contactSchema)