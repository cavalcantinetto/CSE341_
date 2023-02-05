const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const teacherdb = require('./models/teacher')

//it will handle the cookies
const cookieParser = require('cookie-parser')
const app = express();
const port = 8080;
const passport = require('passport');
const initialize = require('./functions/passport-config');
// const bodyParser = require('body-parser');

//sets cors and others 
app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(express.static('public'));

//nedded to use ejs for frontEnd
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/login', { message: '' });
});

app.post('/login', async function(req, res) {
    const teacherEmail = req.body.email;
    const teacherPass = req.body.password;

    if (teacherEmail === '' ) {
        return res.render('pages/login', { message: 'Please fill the email field'});
    }

    //get data using email as a parameter
    teacherData = await teacherdb.findOne({ teacherEmail: teacherEmail }).exec();
    if (teacherData === null) {
        return res.render('pages/login', { message: 'There is no teacher with this e-mail'});
    }

    //compare password with hashed password
    const result = await bcrypt.compare(teacherPass, teacherData.teacherPass);
    if (result === false) {
        return res.render('pages/login', { message: `Incorrect password for ${teacherEmail}`});
    }

    const accessToken = jwt.sign({ teacherName: teacherData.teacherName, teacherEmail: teacherData.teacherEmail },
        process.env.ACCESS_TOKEN_SECRET);
    //saves the token in a secure cookie. Remember to set httpOnly to true
    res.cookie('accessToken', accessToken)
    res.redirect('bookspage');
});

app.get('/bookspage', pagesAuthentication, function(req, res) {
    const token = req.cookies['accessToken'];
    if (token)
        res.render('pages/bookspage');
    else
        res.redirect('/');
});

//set swagger
const swaggerRoutes = require('./routes/swagger');
app.use('/', swaggerRoutes);

//Allow us to use frontEnd React
// app.use(bodyParser.json())
//     .use((req, res, next) => {
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader(
//             'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Z-Key'
//         );
//         res.setHeader('Content-Type', 'application/json');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
//         next();
//     })

//require mongoose
const mongoose = require('./db/connect');
//creates db variable
let db;
//bring dotenv library
require('dotenv').config();

//defines url to connect to DB
const url = process.env.DATABASE_URL;

//make a connection
mongoose.connectDb(url)

//creates a middleware to students
const studentsRoutes = require('./routes/students');
app.use('/students', studentsRoutes);

//creates a middleware to students
const booksRoutes = require('./routes/books');
app.use('/books', booksRoutes);

//creates a middleware to teachers
const teachersRoutes = require('./routes/teachers');
app.use('/teachers', teachersRoutes);

//defines the port to listen to:
app.listen(port, () => console.log(`server listenning to ${port}`));

async function pagesAuthentication(req, res, next) {
    const token = req.cookies['accessToken']

    if (token == null) return res.redirect('/');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.redirect('/');
        next();
    })
}