// Database code.
var express = require('express');
var app = express();     
var mongoose = require('mongoose');                  



// database schaema  
var ContactSchema = new mongoose.Schema({
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
    password: String,
     savedjobslist: {
        title: [],
        subtitle: []

     },
    appliedjobslist: {
        title: [],
        subtitle: []
    },
    failedjobslist: {
        title: [],
        subtitle: []
    }
});


const Contact = module.exports = mongoose.model('Contact', ContactSchema); 

// const mongoose = require('mongoose');


// const ContactSchema = mongoose.Schema({
   // first_name:{
    //    type: String,
     //   required: true
   // },
   // last_name:{
     //   type: String,
       // required: true
   // },
   // phone:{
     //   type: String,
      //  required: true
    // }
// });

// const Contact = module.exports = mongoose.model('Contact', ContactSchema); 