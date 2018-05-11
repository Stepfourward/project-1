const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');


// retrieving Data
router.get('/contacts',(req,res,next)=>{
 // res.send('Retriving the contact list');
 console.log('contacts page');
Contact.find(function(err, contacts){
 res.json(contacts);
})
});

// to add the content 
router.post('/contact',(req, res, next)=>{
// logic to add contact
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_id: req.body.email_id,
        password: req.body.password
    });
    newContact.save((err, contact)=> {
        if(err) {
            res.json({msg:'faild to add contact'});
        }
        else{
            res.json({msg:'contact added sucessfully'});
        }
     
    });
 
});    
// to delete the content 
router.delete('/contact/:id',(req, res, next) =>{
    // logic to delete contact
    Contact.remove({_id:req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
    })    

module.exports = router;