let bodyParser = require('body-parser')
    // import express
let express = require('express');
let mongoose = require('mongoose');
// fire up the express
let app = express();
let routes = require('./routes');
let expressSession = require('express-session');
let MongoStore = require('connect-mongo')
let cookieParser = require('cookie-parser');
const dotgit = require('dotgitignore')();
var cors = require('cors')
require('dotenv').config()

// require dot-env
require('dotenv').config();

// configurin the middleware
app.use(cors({ origin: 'http://localhost:3000/', optionsSuccessStatus: 200 }));

// connect o databse and create database
mongoose.connect(process.env.DBURL).then((e) => {
    console.log("Connected to database");
});

app.use(cookieParser())

// set up auth
app.set('trust proxy', 1) // trust first proxy
app.use(expressSession({
    secret: 'a secrete',
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.DBURL,
        collectionName: 'sessionStore',
        useUnifiedTopology: true
    }, (err, suc) => {
        if (err) { console.log(err) }
        if (suc) {
            console.log("db SUCESSFULLY CONNECTED")
        }
    }),
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 90
    }
}))

// accept jSON data
app.use(express.json());

// create application/json parser
app.use(bodyParser.urlencoded({ extended: false }))

// middle ware 
app.use('/', routes);

// settin up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})


module.exports = app;