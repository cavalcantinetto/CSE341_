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
    "pratos": {
       "proteinas": {
        type: Array,
        required: true
       },
       "acompanhamentos": {
        type: Array,
        required: true
       }
    }, 
    "status": {
        "pratopronto": {
            type: Boolean
        },
        "pratoservido": {
            type: Boolean
        }
       }
})

module.exports = mongoose.model("pedidos", contactSchema)