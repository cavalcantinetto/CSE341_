const express = require('express');
const routes = express.Router();
const Escolhas = require('../../../models/escolhas');
const authorization = require('../../../functions/auth');
const mongoose = require('mongoose');

//Usa o middleware para filtrar as escolhas de uma criança específica
routes.get('/getkidschoice/:estudante', authorization, getKidsChoices, (req, res) => {
    //get escolhas validates return.
    return res.json(res.cardapio);
})

//rota para consulta por data (vai começar com consulta total mas vou mudar para por data)
routes.get('/getall', authorization, async(req, res) => {
    // const filter {
    //     "data": data
    // }
    const result = await Escolhas.find();
    if (result) {
        console.log(result)
        res.status(200).json(result)
    } else {
        res.status(400).json({message: "Algo deu errado"})
    }
})

//rota resposável por fazer o registro da escolha de um usuário específico.
routes.post('/register', authorization, async(req, res) => {
    //TO-DO if tests for variables
    try {
        //define o filtro que será usado para localizar se existe o registro
        const filter = {
            dataId: req.body.dataId, 
            estudante: req.body.estudante
        };
        if(!req.body.data) {
            return res.status(400).json({ message: "É necessário informar uma data válida" });
        } 
        if(req.body.data == undefined) {
            return res.status(400).json({ message: "É necessário informar uma data válida" });
        } 
        if(req.body.data == null) {
            return res.status(400).json({ message: "É necessário informar uma data válida" });
        } 
        const novaEscolha = {
            data: req.body.data,
            dataId: req.body.dataId,
            estudante: req.body.estudante,
            turma: req.body.turma,
            turno: req.body.turno,
            vencimento: req.body.vencimento,
            responsavel: req.body.responsavel,
            servico: req.body.servico,
            pratos: req.body.pratos
        }
        try {
            result = await Escolhas.findOneAndUpdate(filter, novaEscolha, {new: true, upsert: true});
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

routes.get('/escolhasdodia/:id', authorization, async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: "No data was sent."})
    }
    const filter = {
        "dataId": req.params.id
    }
    console.log(filter)

    try {
        const result = await Escolhas.find(filter).sort({"turno": -1,"turma": 1, "estudante": 1});
        console.log(result)
        if(!result) {
            res.status(400).json({message: "Não exitem escolhas para esse dia."})
        }
    res.status(200).json(result);

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
    
})

routes.get('/cobranca/:dateini&:datefin', authorization, async (req, res) => {
    console.log('entrei no dataini e data fim')
    if(!req.params) {
        return res.status(400).json({message: "No data was sent."})
    }
    const filter = {
        'data': {
            '$gte': req.params.dateini, 
            '$lte': req.params.datefin
          }
    }

    try {
        const result = await Escolhas.find(filter).sort({"estudante": 1, "data": 1});
        console.log(result)
        if(!result) {
            res.status(400).json({message: "Não exitem escolhas para esse dia."})
        }
    res.status(200).json(result);

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
    
})

routes.patch('/alterastatus', authorization, async (req, res) => {
    console.log(req.body)
    try{
        const filter = {
            _id: req.body._id
        }

        const novostatus = {
            cobrado: req.body.cobrado
        };
        console.log(filter, novostatus )
        const novaCobrancaResult = await Escolhas.findOneAndUpdate(filter, novostatus, {new: true, upsert: false});
            res.status(201).json(novaCobrancaResult);
    } catch (err) {
        console.log(err)
    }
} )

async function getKidsChoices(req, res, next) {
    let cardapio;
    let todayISO = new Date(new Date().setUTCHours(0,0,0,0)).toISOString();
    try {
        cardapio = await Escolhas.find({
            estudante: req.params.estudante,
            'data': {
                '$gte': todayISO
              }
            }).sort({data: 1});
        if (!cardapio) {
            return res.status(404).json({ message: "Não encontrou escolhas associados" })
        }
        res.cardapio = {
            'cardapio': cardapio, 
            'data': todayISO
        }
  
    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "Escolhas não existem" })
        }
        return res.status(500).json({ message: err.message })
    }
    next();
}

//delete pedido
routes.delete('/remove/:id', authorization, getPedidos, async(req, res) => {
    try {
        const result = await res.escolha.remove();
        console.log(result)

        res.status(200).json({ message: "Escolha removida com sucesso" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//this function will get an specific escolha at database.
async function getPedidos(req, res, next) {
    let escolha;
    try {
        escolha = await Escolhas.findById(req.params.id);
        if (!escolha) {
            return res.status(404).json({ message: "Não encontrou cardápios associados" })
        }
        res.escolha = escolha;
    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "Cardápios não existem" })
        }
        return res.status(500).json({ message: err.message })
    }
    next();
}

module.exports = routes