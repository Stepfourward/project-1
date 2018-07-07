const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
const User = require('../models/user');
const jobdetail = require('../models/jobs');
const jobList = require('../models/jobList');
const fljobList = require('../models/failedjoblist');
const savedjobsList = require('../models/savedjobslist');
const profiles = require('../models/profileData');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        phone:req.body.phone,
        location:req.body.location,
        title:req.body.title,
        company:req.body.company,
        education:req.body.education
      });
    
      User.addUser(newUser, (err, user) => {
        if(err){
          res.json({success: false, msg:'Failed to register user'});
        } else {
          res.json({success: true, msg:'User registered'});
        }
      });
});

/// Update User
router.put('/update/:id', function(req, res, next) {
  let updatedUser = {};
  updatedUser.name = req.body.name;
  updatedUser.email = req.body.email;
  updatedUser.username = req.body.username;
  updatedUser.phone = req.body.phone;
  updatedUser.location = req.body.location;
  updatedUser.title = req.body.title;
  updatedUser.company = req.body.company;
  updatedUser.education = req.body.education;
console.log('ReqData:::::',req);

var id = req.params.id;
console.log(id);
User.findOne({_id: id}, function(err, foundObject){
  if(err) {
    console.log(err);
    res.status(500).send();
  } else {
    if (!foundObject) {
      res.status(404).send();
    } else {
       if (req.body.title) {
         console.log('choice');
         foundObject.title = req.body.title;
       }
       foundObject.save(function(err, updatedObject){
         if (err) { console.log(err);
          res.status(500).send();
        } else {
          res.send(updatedObject);
        }
       })
    }
  }
})


  let query = {_id:req.params.id};
  console.log(req.params.id);
console.log(query,updatedUser);
  User.update(query, updatedUser, function(err) {
    if(err) {console.log(err);return;}
    else { console.log('HipHip hurry sucess')}
    
  })
  
})


router.put('/user/:id', function(req, res){
  console.log(req.params.id);
	User.findByIdAndUpdate({_id: req.params.id},
	                   {
                      name: req.body.name,
                      email: req.body.email,
                      username: req.body.username,
                      phone:req.body.phone,
                      location:req.body.location,
                      title:req.body.title,
                      company:req.body.company,
                      education:req.body.education
			   }, function(err, docs){
			 	if(err) res.json(err);
				else
				{ 
				   console.log(docs);
				   res.redirect('/user/'+req.params.id);
				 }
			 });
});



// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

//get job details 
router.get('/jobdetail', function(req,res) {
  console.log('fetching jobs');
  jobdetail.find(function(err,jobs) {
    if(err) {
      console.log(err);
    }
    else {
      res.json(jobs);
    }
  });
});


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

//post appliedjoblist
router.post('/appliedjobs', function(req,res) {
  console.log('posting');
  jobList.create({
    companyTitle: req.body.companyTitle,
    jobTitle: req.body.jobTitle,
    location: req.body.location
  },function(err,list) {
    if (err) {
      console.log('err getting list '+ err);
    } else {
      res.json(list);
    }
  }
  );
});
//getting appliedjoblistlist
router.get('/appliedjobs',function(req,res) {
  console.log('getting list');
  jobList.find(function(err,list) {
    if(err) {
      res.send(err);
    } else {
      res.json(list);
    }
  });
});

//getting failed jobs
router.get('/failedjobs',function(req,res) {
  console.log('getting failed job');
  fljobList.find(function(err,list) {
    if(err) {
      res.send(err);
    } else {
      res.json(list);
    }
  });
});

//posting failed jobs
router.post('/failedjobs',function(req,res) {
  console.log('posting failed jobs');
  fljobList.create({
    companyTitle: req.body.companyTitle,
    jobTitle: req.body.jobTitle,
    location: req.body.location
  },function(err,list) {
    if(err) {
      res.send('cannot post job '+ err);
    }
    else {
      res.json(list);
    }
  });
});

//getting saved jobs
router.get('/savedjobslist',function(req,res) {
  console.log('gettin saved jobs');
  savedjobsList.find(function(err,savedlist) {
    if(err) {
      res.send('error in getting saved jobs '+ err);
    } else {
      res.json(savedlist);
    }
  });
});
//posting to saved jobs
router.post('/savedjobslist', function(req,res) {
  console.log('posting saved job');
  savedjobsList.create({
    companyTitle: req.body.companyTitle,
    jobTitle: req.body.jobTitle,
    location: req.body.location
  }, function(err,savedlist) {
    if (err) {
      res.send('enable send the data to DB '+ err);
    }
    else {
      res.json(savedlist);
    }
  });
});

//to check whether email exist or not
router.post('/forgot', function(req,res) {
  User.find({email: req.body.email}, function(err,found) {
    console.log('fiding email');
    if(found.length) {
      return res.json({success: true, msg: 'User found'});
    }
    else if(err) {
      return res.json({success: false, msg: 'User not found'});
    }
    else if(!found) {
      return res.json({success: false, msg: 'User not found'});
    }
  })
})
// password reset 
router.put('/forgotpassword/', function(req,res) {

});

// for profile
router.put('/profile/:id', function(req,res) {
  User.findByIdAndUpdate({_id: req.params.id},
  {
    education: req.body.education,
    expirence: req.body.expirence,
    about: req.body.about,
    profilePic: req.body.profilePic,
    resume: req.body.resume
  }, function(err,profile) {
    if(err) {
      res.send('err in updating profile ' + err);
    } else {
      res.json(profile);
    }
  })
})




 
module.exports = router;
