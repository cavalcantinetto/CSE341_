const express = require('express');
const routes = express.Router();
const Acompanhamentos = require('../../../models/acompanhamentos')
const authorization = require('../../../functions/auth');
const { mongoose } = require('mongoose');


//get cardapio

//get one escolhas for the kid
routes.get('/getall', authorization,  async(req, res) => {
    try {
        const acompanhamentos = await Acompanhamentos.find().sort({acompanhamento: 1});
        if (!acompanhamentos) {
            return res.status(204).json({ message: "Não encontrou acompanhamentos" })
        } else {
            return res.status(200).json(acompanhamentos);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


//insert cardapio
routes.post('/register', authorization, async(req, res) => {
    //TO-DO if tests for variables
    try {
        //define o filtro que será usado para localizar se existe o registro
        const filter = {
            acompanhamento: req.body.acompanhamento
        };

        const newAcompanhamento = {
            acompanhamento: req.body.acompanhamento
        }

        try {
            result = await Acompanhamentos.findOneAndUpdate(filter, newAcompanhamento, {new: true, upsert: true});
            if (!result) {
                return res.status(404).json({ message: "Não encontrou acompanhamentos" })
            }
            res.result = result;
            res.status(201).json(result);
        } catch (err) {
            if (err instanceof mongoose.CastError) {
                return res.status(400).json({ message: "Não existem acompanhamentos cadastrados" })
            }
            return res.status(500).json({ message: err.message })
        }

    } catch (err) {
        console.log('Falhou ao gravar dados do acompanhamento')
        res.status(400).json({ message: err.message });
     }
})

routes.delete('/deleta/:id', authorization, async(req, res) => {
    try {
        console.log(req.params.id)
        const filter = {
            _id: req.params.id
        }
        console.log(filter)
        const result = await Acompanhamentos.findOneAndDelete(filter);
        console.log(result)
        res.status(200).json(result)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = routes