const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.render('pages/login', { message: '' });
})

module.exports = routes;