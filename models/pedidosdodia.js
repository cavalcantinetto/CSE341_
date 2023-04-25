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
    "pratos": {
       "proteina": {
        type: String,
        required: true
       },
       "acompanhamentos": {
        type: Array,
        required: true
       }
    }, 
    "status": {
        "pratopronto": {
            type: Boolean,
            default: false
        },
        "pratoservido": {
            type: Boolean,
            default: false
        }
       }
})

module.exports = mongoose.model("pedidos", contactSchema)