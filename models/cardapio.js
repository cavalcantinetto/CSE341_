const mongoose = require('mongoose');

//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "data": {
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
     }
})

module.exports = mongoose.model("cardapios", contactSchema)