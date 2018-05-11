// Database code.
var express = require('express');
var app = express();     
var mongoose = require('mongoose');                  



// database schaema  
var userdata = new mongoose.Schema({
    first_name: String,
    last_name: String,
    id: String,
    location: String,
    profile_picture_url: String,
    email_id: String,
    phone: String,
    job_title: String,
    company: String,
    education: String,
    savedjobslist: {
        title: String[],
        subtitle: String[]
    },
    appliedjobslist: {
        title: String[],
        subtitle: String[]
    },
    failedjobslist: {
        title: String[],
        subtitle: String[]
    }
});


const datas = module.exports = mongoose.model('datas',userdata);