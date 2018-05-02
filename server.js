import { url } from 'inspector';

var express = require('express');
var app      = express();                               
var mongoose = require('mongoose');                  
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 
var cors = require('cors');

//configuration
mongoose.connect('mongodb://localhost/userdata');

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

//modals
var userdata = mongoose.model('userdata', {
    first_name: string,
    last_name: string,
    id: string,
    location: string,
    profile_picture_url: string,
    email_id: string,
    phone: number,
    job_title: string,
    company: string,
    education: string,
});


//routes
// adding data
app.get('/api/',function(req,res) {
    console.log('adding data');
    
});