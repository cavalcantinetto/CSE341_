const mongoose = require('mongoose');
const { Schema } = mongoose;
//defines a schema for the database.
const contactSchema = new mongoose.Schema({
    "nome": {
        type: Schema.Types.ObjectId,
        ref : "students",
        required: true
    },
    "classe": {
        type: Schema.Types.ObjectId,
        ref : "classes",
        required: true
    },
    "svc": {
        type: Schema.Types.ObjectId,
        ref: "service",
        required: true

    },
    "qtd": {
        type: Number
    },
    "dateBegin": {
        type: Date,
        required: true
    }, 
    "dateEnd": {
        type: Date,
        required: true
    }, 
    "comeu": {
        type: Boolean,
        default: false,
    }, 
    "cobrou": {
        type: Boolean,
        default: false
    },
    "chamado": {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("schedule", contactSchema)