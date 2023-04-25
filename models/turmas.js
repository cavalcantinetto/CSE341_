const mongoose = require('mongoose');

//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "userRa": {
        type: String
    },
    "nome": {
        type: String,
        required: true
    },
    "turma": {
        type: String,
        required: true
    },
    "codigodaturma": {
        type: Number,
        required: true,
    },
    "turno": { 
        type: String,
        
    }
})

module.exports = mongoose.model("Turmas", contactSchema)