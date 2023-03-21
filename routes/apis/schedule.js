require('dotenv').config();
const express = require('express');
const routes = express.Router();
const Schedule = require('../../models/schedule')
const bp = require('body-parser');
const authorization = require('../../functions/auth');
const mongoose = require('mongoose')

routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))


//get all schedules
routes.get('/getall', authorization, async(req, res) => {
    try {
        const schedule = await Schedule.find().sort({classe: 1, nome: -1, svc: 1}).populate('nome').populate('classe').populate('svc');
        if (!schedule) {
            return res.status(204).json({ message: "No data was found" })
        } else {
            return res.status(200).json(schedule);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one student
routes.get('/getone/:id', authorization, getSchedule, (req, res) => {
    //get schedule validates return.
    return res.json(res.schedule);
})

//insert schedule
routes.post('/register', authorization, async(req, res) => {
    if (!req.body.nome) {
        return res.status(400).json({ errors: "Nome is null" })
    }
    if (!req.body.classe) {
        return res.status(400).json({ errors: "Classe is null" })
    }
    if (!req.body.svc) {
        return res.status(400).json({ errors: "Serviço is null" })
    }
    if (!req.body.qtd) {
        return res.status(400).json({ errors: "Quantidade is null" })
    }
    if (!req.body.dateBegin) {
        return res.status(400).json({ errors: "dateStart is null" })
    }
    if (!req.body.dateEnd) {
        return res.status(400).json({ errors: "dateEnd is null" })
    }
    if (!req.body.chamado) {
        return res.status(400).json({ errors: "Número do Chamado is null" })
    }
    //Saves all data
    const newschedule = new Schedule({
        nome: req.body.nome,
        classe: req.body.classe,
        svc: req.body.svc,
        qtd: req.body.qtd,
        dateBegin: req.body.dateBegin,
        dateEnd: req.body.dateEnd,
        chamado: req.body.chamado
    })

    try {
        const updateSchedule = await newschedule.save();
        if (!updateSchedule) {
            return res.status(500).json({ message: "DataBaseError" });
        }
        return res.status(200).json(updateSchedule);

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//insert schedule
routes.patch('/update/:id', authorization, getSchedule, async(req, res) => {

    try {
        if (req.body.nome) {
            res.schedule.nome = req.body.nome;
        }
        if (req.body.classe) {
            res.schedule.classe = req.body.classe;
        }
        if (req.body.svc) {
            res.schedule.svc = req.body.svc;
        }
        if (req.body.qtd) {
            res.schedule.svc = req.body.qtd;
        }
        if (req.body.dateBegin) {
            res.schedule.dateBegin = req.body.dateBegin;
        }
        if (req.body.dateEnd) {
            res.schedule.datEnd = req.body.dateEnd;
        }
        if (req.body.chamado) {
            res.schedule.chamado = req.body.chamado;
        }
        if (typeof req.body.comeu != 'undefined') {
            res.schedule.comeu = req.body.comeu;
        }
        if (typeof req.body.cobrou != 'undefined') {
            res.schedule.cobrou = req.body.cobrou;
        }
        const updateSchedule = await res.schedule.save();
        if (!updateSchedule) {
            return res.status(404).json({ message: "Invalid Id" });
        }
           return res.status(200).json(updateSchedule);

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

routes.delete('/remove/:id', authorization, getSchedule, async(req, res) => {
    try {
        res.schedule.remove();
        res.status(200).json({ message: "schedule was deleted" })

    } catch {
        res.status(500).json({ message: err.message })
    }
})

async function getSchedule(req, res, next) {
    let schedule;
    try {
        schedule = await Schedule.findById(req.params.id);
        if (schedule == null) {
            return res.status(404).json({ message: "Could not find schedule" })
        }

    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "scheduleId doesn't exist" })
        }
        return res.status(500).json({ message: err.message })
    }
    res.schedule = schedule;
    next();

}


module.exports = routes