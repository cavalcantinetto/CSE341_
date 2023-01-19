const mongoose = require('mongoose');
//defines a schema for the database.
const contactSchema = new mongoose.Schema({

    "classes": {
        "classeName": {
            type: String,
            required: true
        },
        "teacher": {
            type: Schema.Types.ObjectId,
            ref: 'teacher',
            required: true
        }
    }
})

module.exports = mongoose.model("classes", contactSchema)