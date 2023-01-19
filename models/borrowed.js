const mongoose = require('mongoose');
//defines a schema for the database.
const contactSchema = new mongoose.Schema({

    "borrowed": {
        "bookName": {
            type: Schema.Types.ObjectId,
            ref: 'books',
            required: true
        },
        "studentName": {
            type: Schema.Types.ObjectId,
            ref: 'students',
            required: true
        },
        "date": {
            type: Date
        },
        "class": {
            type: Schema.Types.ObjectId,
            ref: 'classes',
            required: true
        },
        "teacher": {
            type: Schema.Types.ObjectId,
            ref: 'teacher',
            required: true
        }
    }
})

module.exports = mongoose.model("borrowed", contactSchema)