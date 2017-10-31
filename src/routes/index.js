// src/routes/index.js

'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const Bill = require('../models/bill.model.js');

// Read
router.get('/bills', function (req, res, next) {
  Bill.find({}, function(err, bills) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json({bills: bills});
  });
}); 

// Create
router.post('/bills', function(req, res, next) {
  const bill = req.body;
  Bill.create(bill, function(err, bill) {
    if(err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json({'bill': bill, message: 'Bill Created'});
  });
});

// TODO: Add a PUT route to update existing bill entries 

// TODO: Add a DELETE route to delete bill entries

module.exports = router;