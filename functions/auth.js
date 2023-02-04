const { application } = require('express');
const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');


routes.get('/', authorization, (req, res) => {
    res.send(req);
})

async function authorization(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ message: "Not Authorized" })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403), json({ message: "invalid Token" });
        req.user = user;
        next();
    })
}

module.exports = authorization;