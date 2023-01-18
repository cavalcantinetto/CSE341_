const express = require('express');
const contacts = require('../models/contacts');
const routes = express.Router();
const Contactdb = require('../models/contacts')
const bp = require('body-parser');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))

//get contacts
routes.get('/', async(req, res) => {
    try {
        console.log("i'm gotta collect all contacts");
        const contacts = await Contactdb.find();
        res.json(contacts);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get one contact
routes.get('/:id', getcontacts, (req, res) => {
    res.json(res.contact);
})

//insert contact
routes.post('/', async(req, res) => {
    const newcontact = new Contactdb({
        "firstName": req.body.firstname,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "favoriteColor": req.body.favoriteColor,
        "birthday": req.body.birthday
    })
    try {
        const newcontactresult = await newcontact.save();
        res.status(201).json(newcontactresult);

    } catch (err) {
        console.log('falhou ao pegar os dados de contato')
        res.status(400).json({ message: err.message });
    }
})

//updat contact
routes.patch('/:id', getcontacts, async(req, res) => {
    if (req.body.firstName != null) {
        res.contact.firstName = req.body.firstName
    }
    if (req.body.lastName != null) {
        res.contact.lastName = req.body.lastName
    }
    if (req.body.email != null) {
        res.contact.email = req.body.email;
    }
    if (req.body.favoriteColor != null) {
        res.contact.favoriteColor = req.body.favoriteColor;
    }
    if (req.body.birthday != null) {
        res.contact.birthday = req.body.birthday;
    }

    try {
        const updatedContact = await res.contact.save();
        res.status(204).json(updatedContact);

    } catch (err) {
        res.status(400).json({ message: err.message })

    }
})

//delete contact
routes.delete('/:id', getcontacts, async(req, res) => {
    try {
        await res.contact.remove();
        res.status(200).json({ message: "contact was deleted" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getcontacts(req, res, next) {
    let contact;
    try {
        contact = await Contactdb.findById(req.params.id);
        if (contact == null) {
            return res.status(404).json({ message: "could not find contact" })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.contact = contact;
    next();

}
module.exports = routes