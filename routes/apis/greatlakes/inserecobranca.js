const express = require('express');
const routes = express.Router();
const ServicosPrestados = require('../../../models/cobranca')
const authorization = require('../../../functions/auth');

routes.post('/getdata', async(req, res) => { 
    console.log(req.body)
    try {
        const filter = {
            data: {$gte: req.body.dataIni, $lte: req.body.dataFim}
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
            dataId: req.body.dataId,
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
routes.patch('/alterastatus', async (req, res) => {
    try{
        const filter = {
            _id: req.body._id
        }

        const novostatus = {
            cobrado: req.body.cobrado
        };
        console.log(filter, novostatus )
        const novaCobrancaResult = await ServicosPrestados.findOneAndUpdate(filter, novostatus, {new: true, upsert: false});
            res.status(201).json(novaCobrancaResult);
    } catch (err) {
        console.log(err)
    }
} )

//delete cobrança
routes.delete('/remove', authorization, async(req, res) => {
    try {
        const filter = {
            dataId: req.body.dataId,
            estudante: req.body.estudante

        }
             const result = await ServicosPrestados.findOneAndDelete(filter);
             res.status(200).json(result)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//altera status da cobrança



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