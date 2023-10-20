const express = require('express');
const routes = express.Router();
const Cardapios = require('../../../models/cardapio')
const authorization = require('../../../functions/auth');
const { now } = require('mongoose');

//get cardapio
routes.get('/getall', authorization, async(req, res) => {
    try {
        let todayISO = new Date(new Date().setUTCHours(0,0,0,0)).toISOString();
        const cardapio = await Cardapios.find({
            'data': {
              '$gte': todayISO
            }
          }).sort({data: 1});
        if (!cardapio) {
           
            return res.status(204).json({ message: "No data was found" })
        } else {
            data = {
                "cardapio": cardapio,
                "data": todayISO
            }
            return res.status(200).json(data);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one cardapio
routes.get('/getone/:id', authorization, getCardapio, (req, res) => {
    //get cardapio validates return.
    return res.json(res.cardapio);
})
    

//insert cardapio
routes.post('/register', authorization, async(req, res) => {
    //TO-DO if tests for variables
    try {
        const filter = {
            data: req.body.data
        }

        const newcardapio = {
            data: req.body.data,
            proteinas: req.body.proteinas,
            acompanhamentos: req.body.acompanhamentos   
        }

        try {
            const newcardapioResult = await Cardapios.findOneAndUpdate(filter, newcardapio,  {new: true, upsert: true});
            res.status(201).json(newcardapioResult);

        } catch (err) {
            console.log('falhou ao gravar dados do cardapio')
            res.status(400).json({ message: err.message });
        }

    } catch (err) {
        console.log('falhou ao coletar as variáveis para consulta')
        res.status(400).json({ message: err.message });
    }
})

//delete cardapio
routes.delete('/remove/:data', authorization, async(req, res) => {
    try {
        console.log(req.params.data)
        const filter = {
            data: req.params.data
        }
        const result = await Cardapios.findOneAndDelete(filter);
        res.status(200).json(result)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//this function will get an specific cardapio at database.
async function getCardapio(req, res, next) {
    let cardapio;
    try {
        cardapio = await Cardapios.findById(req.params.id);
        if (!cardapio) {
            return res.status(404).json({ message: "Não encontrou cardápios associados" })
        }
        res.cardapio = cardapio;
    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "Cardápios não existem" })
        }
        return res.status(500).json({ message: err.message })
    }
    next();
}

module.exports = routes