const mongoose = require('mongoose');

//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "userName": {
        type: String,
        required: true
    },
    "userEmail": {
        type: String,
        required: true
    },
    "userPass": {
        type: String
    },
    "userLevel": {
        type: Number,
        required: true,
        default: 1
    },
    "userKids": { 
        type: Array,
        required: true,
    }
})

module.exports = mongoose.model("user", contactSchema)