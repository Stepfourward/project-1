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

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(logger('dev')); 
app.use(cors());

//modals
var userdata = mongoose.model('userdata', {
    first_name: string,
    last_name: string,
    id: string,
    location: string,
    profile_picture_url: string,
    email_id: string
} );
