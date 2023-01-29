const mongoose = require('mongoose');
//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "proteinType": {
        type: String,
        required: true
    },
    "proteinQty": {
        type: String,
        required: true
    }

})


module.exports = mongoose.model("books", contactSchema)