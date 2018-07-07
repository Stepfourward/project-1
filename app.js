const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var methodOverride = require('method-override');
var session = require('express-session')
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
// Connect To Database
mongoose.connect(config.database);
// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
});

const app = express();
const port = 3000;
//app.use(require('connect').bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const users = require('./routes/users');
app.use('/api',users);
// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => { 
    res.send('Invalid endpoint');
});

// Body Parser Middleware


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
 
app.use(session({ secret: 'this is a cat' }));  
app.use(cookieParser());
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use('/users', users);



app.listen(port, () => {
   console.log("Server started on port:", port); 
});

