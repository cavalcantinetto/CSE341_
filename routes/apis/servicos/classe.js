const express = require('express');
const routes = express.Router();
const Classe = require('../../../models/classes')
const authorization = require('../../../functions/auth');

//get classes
routes.get('/getall', async(req, res) => {
    try {
        const classes = await Classe.find().sort({classeName: 'asc'});
        if (!classes) {
            return res.status(204).json({ message: "No data was found" })
        } else {
            return res.status(200).json(classes);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one book
routes.get('/getone/:id', authorization, getClasse, (req, res) => {
    //get book validates return.
    return res.json(res.classes);
})

//insert book
routes.post('/register', authorization, async(req, res) => {
    //TO-DO if tests for variables
    try {
        const date = new Date().toLocaleDateString()
        const newClasse = new Classe({
            classeName: req.body.classeName,
            teacher: req.body.teacher
        })
        const newClasseresult = await newClasse.save();
        res.status(201).json(newClasseresult);

    } catch (err) {
        console.log('falhou ao gravar dados do book')
        res.status(400).json({ message: err.message });
    }
})

//delete book
routes.delete('/remove/:id', authorization, getClasse, async(req, res) => {
    try {
        await res.classe.remove();
        res.status(200).json({ message: "Classe Removida" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



//this function will get an specific book at database.
async function getClasse(req, res, next) {
    let classe;
    try {
        classe = await Classe.findById(req.params.id);
        if (!classe) {
            return res.status(404).json({ message: "Não encontrou a Classe" })
        }
        res.classe = classe;
    } catch (err) {
        if (err instanceof mongoose.CastError) {
            return res.status(400).json({ message: "Classe não existe" })
        }
        return res.status(500).json({ message: err.message })
    }
    next();
}

module.exports = routes