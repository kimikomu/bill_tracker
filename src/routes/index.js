// src/routes/index.js

'use strict';

const router = require('express').Router();
const path = require('path');
const mongoose = require('mongoose');
const Bill = require('../models/bill.model.js');
const User = require('../models/user.model.js');

const publicPath = path.resolve(__dirname, '../../public');    

// -- TEMP Profile Routes -- //

router.get('/bills', function (req, res, next) {
  Bill.find({}, function(err, bills) {
    if(err) {
      console.log(err);
      return res.status(500).json(err);
    };
    res.json({bills: bills});
  });
});


router.get('/profile', function(req, res, next) {
  if(!req.session.userId) {
    const err = new Error('You are not Logged In');
    err.status = 403;
    return next(err);
  };
  User.findById(req.session.userId)
    .exec(function(error, user) {
      // const username = {username: user.username};
      if(error) {
        return next(error);
      } else {
        res.sendFile(publicPath + '/templates/profile.html');
        // res.json({user: user});        
      };
    });
});


// -- Login Routes -- //

router.get('/login', function(req, res, next) {
  res.sendFile(publicPath + '/templates/login.html');
});

router.post('/login', function(req, res, next) {
  const user = req.body;
  // username and password exist and are authenticated
  if(user.username && user.password) {
    User.authenticate(user.username, user.password, function(error, user) {
      if(error || !user) {
        const err = new Error('Wrong username or password');
        err.status = 401;
        return next(err);
      } else {
        // create session id to store as cookie
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    const err = new Error('Username and password are required');
    err.status = 401;
    return next(err);
  };
});

// -- Register Routes -- //

router.get('/register', function(req, res, next) {
  res.sendFile(publicPath + '/templates/register.html');
});

router.post('/register', function(req, res, next) {
  const user = req.body;
  // all fields required
  if(user.username && user.password && user.confirmPassword) {    
    // confirm that passwords match
    if(user.password !== user.confirmPassword) {
      const err = new Error('Passwords do not match');
      err.status = 400;
      return next(err);
    }; 

    // create user object
    const userData = {
      username: user.username,
      password: user.password
    };

    // use schema to insert user into db
    User.create(userData, function(err, user) {
      if(err) {
        return next(err);
      } else {
        // create session id to store as cookie
        req.session.userId = user._id;        
        return res.redirect('/profile');
      }
    });
  } else {
    const err = new Error('All of fields required');
    err.status = 400;
    return next(err);
  };
});

// -- Bill Routes -- //

router.get('/bills', function (req, res, next) {
  Bill.find({}, function(err, bills) {
    if(err) {
      console.log(err);
      return res.status(500).json(err);
    };
    res.json({bills: bills});
  });
}); 

router.post('/bills', function(req, res, next) {
  const bill = req.body;
  Bill.create(bill, function(err, bill) {
    if(err) {
      console.log(err);
      return res.status(500).json(err);
    };
    res.json({'bill': bill, message: 'Bill Created'});
  });
});

router.put('/bills/:id', function(req, res, next) {
  const id = req.params.id;
  const bill = req.body;
  if(bill && bill._id !== id) {
    return res.status(500).json({err: "Ids do not match"});
  };
  Bill.findByIdAndUpdate(id, bill, {new: true}, function(err, bill) {
    if(err) {
      console.log(err);
      return res.status(500).json(err);
    };
    res.json({'bill': bill, message: 'Bill Updated'});
  });
});

router.delete('/bills/:id', function(req, res, next) {
  const id = req.params.id;
  const bill = req.body;
  // remove bill from database
  Bill.findByIdAndRemove(id).exec().then(
    doc => {
      if(!doc) {
        return res.status(404).end();
      };
      return res.status(204).end();
    }
  );
});

module.exports = router;
