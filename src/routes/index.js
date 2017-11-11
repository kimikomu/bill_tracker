// src/routes/index.js

'use strict';

const router = require('express').Router();
const path = require('path');
const mongoose = require('mongoose');
const Bill = require('../models/bill.model.js');
const User = require('../models/user.model.js');

const publicPath = path.resolve(__dirname, '../../public');    

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
      username: req.body.username,
      password: req.body.password
    };

    // use schema to insert user into db
    User.create(userData, function(err, user) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
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
