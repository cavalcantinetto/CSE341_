require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./functions/passport-config');
const passport = require('passport')
const session = require('express-session');
const path = require('path')


//it will handle the cookies
const cookieParser = require('cookie-parser')
const app = express();
const port = 3000;

//sets cors and others 
app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(express.static('public'));

//nedded to use ejs for frontEnd

app.set('views', path.join(__dirname, 'views'));
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

//passport will handle sessions to keep user data 
const secret = process.env.SECRET_SESSION;
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: false,
    cookie: { secure: true }
}));
app.use(passport.initialize())
app.use(passport.session())

/* List of Routes to be handled by the server*/


//Set a middleware to login user
const loginView = require('./routes/views/index');
app.use('/', loginView)

//Set a middleware to login user
const loginApi = require('./routes/apis/login');
app.use('/login', loginApi)

//Set a middleware to callbackGoogle
const googleApi = require('./routes/apis/google');
app.use('/google', googleApi)

//set swagger
const swaggerRoutes = require('./routes/apis/swagger');
app.use('/api-docs', swaggerRoutes);

//creates a middleware to students
const studentsRoutes = require('./routes/apis/students');
app.use('/students', studentsRoutes);

//creates a middleware to students
const booksRoutes = require('./routes/apis/books');
app.use('/books', booksRoutes);

//creates a middleware to teachers
const teachersRoutes = require('./routes/apis/teachers');
app.use('/teachers', teachersRoutes);

app.use('/views', (req, res) => {
    res.render('index', {
        foo: ['bar', 'foo']
    });
});

app.use('/public/images', express.static(__dirname + '/public/images'));

//defines the port to listen to:
app.listen(port, () => console.log(`server listenning to ${port}`));