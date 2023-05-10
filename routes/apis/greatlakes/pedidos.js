const express = require('express');
const routes = express.Router();
const Pedidos = require('../../../models/pedidosdodia')
const authorization = require('../../../functions/auth');
const { mongoose } = require('mongoose');

//Buscar escolhas por data para gerar os cards do dia
//get cardapio
routes.get('/getfortheday/:dataId', async(req, res) => {
    const filter = {
        dataId: req.params.dataId
    }
    try {
<<<<<<< HEAD
        const escolhas = await Pedidos.find(filter).sort({turma: 1} );
=======
        const escolhas = await Pedidos.find(filter).sort({turma: 1, estudante: 1});
>>>>>>> greatLakesTotalCleaned
        if (!escolhas) {
            return res.status(204).json({ message: "No data was found" })
        } else {
            return res.status(200).json(escolhas);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one escolhas for the kid
routes.get('/getkidschoice/:estudante', authorization, getKidsChoices, (req, res) => {
    //get escolhas validates return.
    return res.json(res.cardapio);
})

//insert cardapio
routes.post('/register', authorization, async(req, res) => {
    //TO-DO if tests for variables
    try {
        //define o filtro que será usado para localizar se existe o registro
        const filter = {
            dataId: req.body.dataId, 
            estudante: req.body.estudante
        };
        const newcardapio = {
            data: req.body.data,
            dataId: req.body.dataId,
            estudante: req.body.estudante,
            turma: req.body.turma,
            pratos: {
                proteina: req.body.proteina,
                acompanhamentos: req.body.acompanhamentos
            }
        }

        try {
            result = await Pedidos.findOneAndUpdate(filter, newcardapio, {new: true, upsert: true});
            if (!result) {
                return res.status(404).json({ message: "Não encontrou escolhas" })
            }
            res.result = result;
            res.status(201).json(result);
        } catch (err) {
            if (err instanceof mongoose.CastError) {
                return res.status(400).json({ message: "Escolhas não existem" })
            }
            return res.status(500).json({ message: err.message })
        }
  

    } catch (err) {

        res.status(400).json({ message: err.message });
     }
})

routes.patch('/alterastatus/:id', authorization, async(req, res) => {
    try {
        const filter = {
            _id: req.body._id
        }
        const newstatus = {
            status: {
                pratopronto: req.body.status.pratopronto,
                prontoservido: req.body.status.pratoservido
            } 
        }
        result = await Pedidos.findOneAndUpdate(filter, newstatus, {new: true});
            if (!result) {
                return res.status(404).json({ message: "Não encontrou escolhas" })
            }
            res.result = result;
            res.status(201).json(result);

    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "Escolhas não existem" })
        }
        return res.status(500).json({ message: err.message })
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

async function getKidsChoices(req, res, next) {
    let cardapio;
    try {
        cardapio = await Pedidos.find({estudante: req.params.estudante}).sort({data: 1});
        if (!cardapio) {
            return res.status(404).json({ message: "Não encontrou escolhas associados" })
        }
        res.cardapio = cardapio;
    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "Escolhas não existem" })
        }
        return res.status(500).json({ message: err.message })
    }
    next();
}
module.exports = routes