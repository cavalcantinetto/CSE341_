const mongoose = require('mongoose');
const { Schema } = mongoose;


//defines a schema for the database.
const bookSchema = new mongoose.Schema({
    "serviceName": {
        type: String,
        required: true
    },

    "serviceValue": {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("service", bookSchema)