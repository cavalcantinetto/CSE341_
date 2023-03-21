const express = require('express');
const routes = express.Router();
const Pedidos = require('../../models/pedidosdodia')
const authorization = require('../../functions/auth');

//get cardapio
routes.get('/getall', async(req, res) => {
    try {
        const cardapio = await Pedidos.find();
        if (!cardapio) {
            return res.status(204).json({ message: "No data was found" })
        } else {
            return res.status(200).json(cardapio);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one cardapio
routes.get('/getone/:id', authorization, getPedidos, (req, res) => {
    //get cardapio validates return.
    return res.json(res.cardapio);
})

//insert cardapio
routes.post('/register', authorization, async(req, res) => {
    //TO-DO if tests for variables
    try {
        const date = new Date().toLocaleDateString()
        const newcardapio = new Pedidos({
            // cardapioName: req.body.cardapioName,
            // cardapioValue: req.body.cardapioValue
        })
        const newcardapioResult = await newcardapio.save();
        res.status(201).json(newcardapioResult);

    } catch (err) {
        console.log('falhou ao gravar dados do cardapio')
        res.status(400).json({ message: err.message });
    }
})

//delete cardapio
routes.delete('/remove/:id', authorization, getPedidos, async(req, res) => {
    try {
        await res.cardapio.remove();
        res.status(200).json({ message: "Cardápio Removido" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



//this function will get an specific cardapio at database.
async function getPedidos(req, res, next) {
    let cardapio;
    try {
        cardapio = await Pedidos.findById(req.params.id);
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