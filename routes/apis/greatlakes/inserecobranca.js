const express = require('express');
const routes = express.Router();
const ServicosPrestados = require('../../../models/cobranca')
const authorization = require('../../../functions/auth');

routes.get('/getdata', authorization, async(req, res) => { 
    try {
        const filter = {
            data: {$gte: req.body.dataInicial, $lte: req.body.dataFinal}
        }
        const cobrancas = await ServicosPrestados.find(filter).sort({estudante: 1});
        if (!cobrancas) {
            return res.status(204).json({ message: "No data was found" })
        } else {
            return res.status(200).json(cobrancas);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


routes.post('/register', authorization,  async(req, res) => { 
    //TO-DO if tests for variables
    try {
        console.log(req.body)
       
        if(req.body.data) {
            req.body.data = new Date(req.body.data)
        } else {
            res.status(400).json({ message: "É necessário informar uma data" });
        }
        const filter = {
            'data': req.body.data,
            'estudante': req.body.estudante
        }

        const novaCobranca = {
            data: req.body.data,
            estudante: req.body.estudante, 
            responsavel: req.body.responsavel,
            turma: req.body.turma, 
            servico: req.body.servico,
            pedidoId: req.body.pedidoId
        }

        try {
            const novaCobrancaResult = await ServicosPrestados.findOneAndUpdate(filter, novaCobranca,  {new: true, upsert: true});
            res.status(201).json(novaCobrancaResult);

        } catch (err) {
            console.log('falhou ao gravar dados do cardapio')
            res.status(400).json({ message: err.message });
        }

    } catch (err) {
        console.log('falhou ao coletar as variáveis para consulta')
        res.status(400).json({ message: err.message });
    }
})

delete cobrança
routes.delete('/remove', authorization, async(req, res) => {
    try {
        const filter = {
            data: req.body.data,
            estudante: req.body.estudante
        }
        const result = await ServicosPrestados.findOneAndDelete(filter);
        res.status(200).json(result)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//this function will get an specific cardapio at database.
// async function getCardapio(req, res, next) {
//     let cardapio;
//     try {
//         cardapio = await ServicosPrestados.findById(req.params.id);
//         if (!cardapio) {
//             return res.status(404).json({ message: "Não encontrou cardápios associados" })
//         }
//         res.cardapio = cardapio;
//     } catch (err) {
//         if (err instanceof mongoose.CastError) {
//             return res.status(400).json({ message: "Cardápios não existem" })
//         }
//         return res.status(500).json({ message: err.message })
//     }
//     next();
// }

module.exports = routes