require('dotenv').config();
const express = require('express');
const cors = require('cors');

//it will handle the cookies
const cookieParser = require('cookie-parser')
const app = express();
const port = 8080;

//sets cors and others 
app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(express.static('public'));

//nedded to use ejs for frontEnd
app.set('view engine', 'ejs');

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

/* List of Routes to be handled by the server*/

//Set a middleware to login user
const loginView = require('./routes/views/login');
app.use('/login', loginView)

//Set a middleware to login user
const loginApi = require('./routes/apis/login');
app.use('/login', loginApi)

//set swagger
// const swaggerRoutes = require('./routes/apis/swagger');
// app.use('/api-docs', swaggerRoutes);

//creates a middleware to students
const studentsRoutes = require('./routes/apis/students');
app.use('/students', studentsRoutes);

//creates a middleware to students
const booksRoutes = require('./routes/apis/books');
app.use('/books', booksRoutes);

//creates a middleware to teachers
const teachersRoutes = require('./routes/apis/teachers');
app.use('/teachers', teachersRoutes);


//defines the port to listen to:
app.listen(port, () => console.log(`server listenning to ${port}`));

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

// app.get('/bookspage', pagesAuthentication, function(req, res) {
//     const token = req.cookies['accessToken'];
//     if (token)
//         res.render('pages/bookspage');
//     else
//         res.redirect('/');
// });

//Sets a middleware to check if user is already logged (authorized)
// async function pagesAuthentication(req, res, next) {
//     const token = req.cookies['accessToken']

//     if (token == null) return res.redirect('/');

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.redirect('/');
//         next();
//     })
//}