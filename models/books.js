const mongoose = require('mongoose');
//defines a schema for the database.
const Schema1 = mongoose;
const contactSchema = new mongoose.Schema({

    "bookName": {
        type: String,
        required: true
    },
    "belongsTo": {

        type: Schema1.Types.ObjectId,
        refPath: 'students',
        required: true
    },
    "class": {
        type: String,
        // type: [Schema.Types.ObjectId],
        // refPath: 'classes',
        required: true
    },
    "timesLended": {
        type: Int16Array,
    },
    "lendedTo": {
        type: Schema1.Types.ObjectId,
        refPath: 'students',
        required: true
    },
    "date": {
        type: Date.now(),
        required: true
    }

})


module.exports = mongoose.model("books", contactSchema)