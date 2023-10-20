const express = require('express');
const mongoose = require('mongoose');
const routes = express.Router();
const Servicos = require('../../../models/listadeservicos')
const authorization = require('../../../functions/auth');

//get servicos
routes.get('/getall', async(req, res) => {
    try {
        const servicos = await Servicos.find().sort({data: 1});
        if (!servicos) {
            return res.status(204).json({ message: "No data was found" })
        } else {
            return res.status(200).json(servicos);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = routes