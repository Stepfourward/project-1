const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

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

// Update User
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
console.log(query,updatedUser);
  User.update(query, updatedUser, function(err) {
    if(err) {console.log(err);return;}
    else { console.log('HipHip hurry sucess')}
    
  })
  // let newUser = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   username: req.body.username,
  //   phone:req.body.phone,
  //   location:req.body.location,
  //   title:req.body.title,
  //   company:req.body.company,
  //   education:req.body.education
  // });
  //var userId = req.body.userId;
})


router.put('/user/:id', function(req, res){
	user.findByIdAndUpdate({_id: req.params.id},
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



// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });

 
module.exports = router;
