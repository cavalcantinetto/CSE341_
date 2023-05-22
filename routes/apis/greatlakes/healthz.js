const express = require('express');
const mongoose = require('mongoose');
const routes = express.Router();
const Users = require('../../../models/user')

routes.get('/', (req, res) => {
    const users = Users.find({ userEmail: "cavalcantinetto@hotmail.com"}).then((data)=>{ return res.status(200).json(data)}).catch((err) => {console.log(err)})

}) 

module.exports = routes