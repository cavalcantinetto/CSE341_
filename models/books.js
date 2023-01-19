const mongoose = require('mongoose');
//defines a schema for the database.
const contactSchema = new mongoose.Schema({

    "books": {
        "bookName": {
            type: String,
            required: true
        },
        "belongsTo": {
            type: Schema.Types.ObjectId,
            ref: 'students',
            required: true
        },
        "class": {
            type: Schema.Types.ObjectId,
            ref: 'classes',
            required: true
        }

    }
})


module.exports = mongoose.model("books", contactSchema)