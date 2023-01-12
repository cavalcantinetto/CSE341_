const express = require('express');
const app = express();
const port = 8080;

//require mongoose
const mongoose = require('./db/connect');
//creates db variable
let db;
//bring dotenv library
require('dotenv').config();

//defines url to connect to DB
const url = process.env.DATABASE_URL;

//make a connection
mongoose.connectDb(url)

//creates a middleware to clients
const clientsRoutes = require('./routes/contacts');
app.use('/', clientsRoutes);

//defines the port to listen to:
app.listen(port, () => { console.log(`server listenning to ${port}`) });