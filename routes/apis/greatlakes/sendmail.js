const express = require('express');
const routes = express.Router();
const nodemailer = require('nodemailer');
const bp = require('body-parser');
routes.use(bp.json())
routes.use(bp.urlencoded({ extended: true }))


routes.post('/', async(req, res) => {
    try {
        const emailto = req.body.emailto;
        const message = req.body.message

        if(emailto && message) {
            result = await sendMail(emailto, message);
            console.log(result)
            return res.status(200).json(result);
            
        } else {
            res.status(400).json({message: "Algo deu errado.Entre em contato com a secretaria da escola"})
        }

        async function sendMail(emailto, message) {
            let transporter = nodemailer.createTransport({
                host: "send.one.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                user: "suporte-site@maplebeartaubate.com.br", // generated ethereal user
                pass: "maple2017", // generated ethereal password
                },
            })

            let info = await transporter.sendMail({
                from: "suporte-site@maplebeartaubate.com.br", // sender address
                to: emailto, // list of receivers
                subject: "Suporte-site MBT is sending you a message ✔", // Subject line
                text: message, // plain text body
                html: `<b>${message}</b>`, // html body
            })
            
            console.log("Message sent: %s", info.accepted);
            if (info.accepted) {
                return { message: `E-mail enviado com sucesso para ${info.accepted[0]}.\nVerifique sua caixa de entrada`}
            } else {
                return { message: "Desculpe, houve um erro e o E-mail não foi enviado"}
            }
            

        }
        

    } catch(err) {
        console.log(err)
    }
});

module.exports = routes;