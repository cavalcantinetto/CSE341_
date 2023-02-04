const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();
const port = 8080;

//sets cors and others 
app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/login');
});

app.post('/login', function(req, res) {
    const username = req.body.username
    const password = req.body.password

    if (password === '1234') {
        res.cookie('pageToken', { username: 'ana', profile: 'teacher' })
        res.redirect('bookspage');
    }
    else {
        res.redirect('/')
    }
});

app.get('/bookspage', function(req, res) {
    const token = req.cookies['pageToken']
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
app.use('/', studentsRoutes);

//creates a middleware to students
const booksRoutes = require('./routes/books');
app.use('/', booksRoutes);

//creates a middleware to teachers
const teachersRoutes = require('./routes/teachers');
app.use('/', teachersRoutes);

//defines the port to listen to:
app.listen(port, () => console.log(`server listenning to ${port}`));