const mongoose = require('mongoose');

//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "servico": {
        type: String,
        required: true
    },
       "endereco": {
        type: String,
        required: true
       }
})

module.exports = mongoose.model("listadeservicos", contactSchema)