const express = require('express');
const routes = express.Router();

routes.get('/', () => {
    res.render('pages/login');
})

module.exports = routes;