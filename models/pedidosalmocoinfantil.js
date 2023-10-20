const mongoose = require('mongoose');

//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "data": {
        type: String,
        required: true
    },
    "estudante": {
        type: String,
        required: true
    },
    "turma": {
        type: String,
        required: true,
        default: "Não Informado"
    },
    "turno": {
        type: String,
        required: true
    },
    "vencimento": {
        type: String,
        required: false,
        default: "Não Informado"
    },
    "responsavel": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "servico": {
        type: String,
        required: true,
        default: "Almoço Infantil"  
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
    "proteina": {
        type: String,
        default: null
    }, 
    "arrozefeijao": {
        type: String,
        default: null
    }, 
    "salada": {
        type: String,
        default: null
    },  
    "guarnicao": {
        type: String,
        default: null
    },                             
})

module.exports = mongoose.model("pedidosalmocoinfantil", contactSchema)