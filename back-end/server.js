const express = require('express');
var app      = express();                               
var mongoose = require('mongoose');                  
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 
var cors = require('cors');

// declearing routes
const route = require('./routes/routes');
app.use('api',route);

// connecting to mongodb
mongoose.connect("mongodb://localhost:27017/userdata",);

// checking whether connected with mongodb or not
mongoose.connection.on('connected',() => {
    console.log('connected to db');
});
mongoose.connection.on('error',(err) => {
    if(err) {
        console.log('error is'+ err);
    }
});



app.use(bodyParser.urlencoded({ 'extended':'true' })); 
app.use(bodyParser.json());
app.use(logger('dev')); 
app.use(cors());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// listen (start app with node server.js) 
app.listen(8080 || process.env.PORT);
console.log("App listening on port 8080");