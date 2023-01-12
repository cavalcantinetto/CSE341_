const mongoose = require('mongoose');
//defines a schema for the database.
const contactSchema = new mongoose.Schema({

    "firstName": {
        type: String,
        required: true

    },
    "lastName": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "favoriteColor": {
        type: String,
        required: true
    },
    "birthday": {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("contacts", contactSchema)