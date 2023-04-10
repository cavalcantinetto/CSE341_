const express = require('express');
const routes = express.Router();
const Services = require('../../../models/services')
const authorization = require('../../../functions/auth');

//get services
routes.get('/getall', async(req, res) => {
    try {
        const services = await Services.find();
        if (!services) {
            return res.status(204).json({ message: "No data was found" })
        } else {
            return res.status(200).json(services);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one service
routes.get('/getone/:id', authorization, getService, (req, res) => {
    //get service validates return.
    return res.json(res.services);
})

//insert service
routes.post('/register', authorization, async(req, res) => {
    //TO-DO if tests for variables
    try {
        const date = new Date().toLocaleDateString()
        const newServices = new Services({
            serviceName: req.body.serviceName,
            serviceValue: req.body.serviceValue
        })
        const newServiceResult = await newServices.save();
        res.status(201).json(newServiceResult);

    } catch (err) {
        console.log('falhou ao gravar dados do service')
        res.status(400).json({ message: err.message });
    }
})

//delete service
routes.delete('/remove/:id', authorization, getService, async(req, res) => {
    try {
        await res.service.remove();
        res.status(200).json({ message: "Service Removida" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



//this function will get an specific service at database.
async function getService(req, res, next) {
    let service;
    try {
        service = await Services.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Não encontrou serviços associados" })
        }
        res.service = service;
    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "Serviços não existem" })
        }
        return res.status(500).json({ message: err.message })
    }
    next();
}

module.exports = routes