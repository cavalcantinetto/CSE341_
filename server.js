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
app.use(cors({
     origin: "*"//process.env.ALLOWED_CLIENT
}))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(express.static('public'));

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
const loginApi = require('./routes/apis/login');
app.use('/login', loginApi)

// //Set a middleware to callbackGoogle
// const googleApi = require('./routes/apis/google');
// app.use('/google', googleApi)

//set swagger
const swaggerRoutes = require('./routes/apis/swagger');
app.use('/api-docs', swaggerRoutes);

//creates a middleware to services
const cardapiosRoutes = require('./routes/apis/greatlakes/cardapios');
app.use('/cardapios', cardapiosRoutes);

//creates a middleware to services
const pedidosRoutes = require('./routes/apis/greatlakes/pedidos');
app.use('/pedidos', pedidosRoutes);

//creates a middleware to acompanhamentos
const acompanhamentosRoutes = require('./routes/apis/greatlakes/acompanhamentos');
app.use('/acompanhamentos', acompanhamentosRoutes);

const healthRoutes = require('./routes/apis/greatlakes/healthz');
app.use('/healthz', healthRoutes);


// const insereUsers = require('./routes/apis/greatlakes/insertUsers');
// app.use('/insereusers', insereUsers);

// const insereTurmas = require('./routes/apis/greatlakes/insertUsers');
// app.use('/insereturmas', insereTurmas);

const inserecobranca = require('./routes/apis/greatlakes/inserecobranca');
app.use('/inserecobranca', inserecobranca);


//rota para encaminhar emails via NodeJs
const sendmailRoutes = require('./routes/apis/greatlakes/sendmail');
app.use('/sendmail', sendmailRoutes);

app.use('/public/images', express.static(__dirname + '/public/images'));

//defines the port to listen to:
app.listen(port, () => console.log(`server listenning to ${port}`)); 