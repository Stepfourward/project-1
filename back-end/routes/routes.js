// Here we will decleare routes
const express = require('express');
const router = express.Router();

const datas = require('../models/userdata');

router.get('/userdata');

// retriving userdata
router.get('/datalist',(req,res,next) => {
    datas.find()
}); 
// add userdata
router.post('/datalist',(req,res,next) => {
    
});



module.exports = router;