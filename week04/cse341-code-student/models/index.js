const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb+srv://dbuser:dbUserPassword@cluster0.nkww6wr.mongodb.net/temples"; //dbConfig.url;
db.temples = require('./temples.js')(mongoose);

module.exports = db;