const mongoose = require('mongoose');

//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "acompanhamento": {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("acompanhamentocadastrado", contactSchema)