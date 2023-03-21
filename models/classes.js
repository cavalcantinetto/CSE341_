const mongoose = require('mongoose');
const { Schema } = mongoose;

//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "classeName": {
        type: String,
        required: true
    },
    "teacher": {
        type: Schema.Types.ObjectId,
        ref : "teacher"
     }
})

module.exports = mongoose.model("classes", contactSchema)