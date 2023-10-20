const mongoose = require('mongoose');

//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "data": {
        type: String,
        required: true
    },
    "dataId": {
        type: String,
        required: true
    }, 
    "estudante": {
        type: String,
        required: true
    },
    "turma": {
        type: String,
        required: true
    },
    "turno": {
        type: String,
        required: true
    },
    "vencimento": {
        type: String,
        required: false
    },
    "responsavel": {
        type: String,
        required: true
    },
    "servico": {
        type: String,
        required: true,
        default: "Almoço Great Lakes"  
    }, 
    "inserted": {
        type: Date,
        required: true,
        default: new Date()
    },
    "cobrado": {
        type: Boolean,
        required: true,
        default: false
    }, 
    "pratos": {
        "proteina": {
         type: String,
         required: true
    },
    "acompanhamentos": {
         type: Array,
         required: true
        }
     }
       
})

module.exports = mongoose.model("escolhas", contactSchema)