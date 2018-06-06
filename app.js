const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
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

const users = require('./routes/users');



// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => { 
    res.send('Invalid endpoint');
});

// Body Parser Middleware
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
 
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use('/users', users);

// CORS Middleware
app.use(cors());
app.listen(port, () => {
   console.log("Server started on port:", port); 
});

