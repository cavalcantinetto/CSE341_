const express = require('express');
const routes = express.Router();
const path = require('path');

routes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

routes.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/register.html'));
})



module.exports = routes