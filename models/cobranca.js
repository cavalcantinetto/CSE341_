const mongoose = require('mongoose');

//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "data": {
        type: Date,
        required: true      
},
    "estudante": {
        type: String,
        required: true
    },
    "responsavel": {
        type: String,
        required: true
    },
    "turma": {
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
    "pedidoId": {
        type: String,
        required: true,
    },
    "cobrado": {
        type: Boolean,
        required: true,
        default: false
    }
    })

    //data, serviço, valor.
    
module.exports = mongoose.model("cobrancas", contactSchema)