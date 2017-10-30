// src/routes/index.js

'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');

// GET
router.get('/bills', function (req, res) {
  mongoose.model('Bill').find({}, function(err, bills) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json(bills);
  });
}); 


// TODO: Add a POST route to create new bill entries

// TODO: Add a PUT route to update existing bill entries 

// TODO: Add a DELETE route to delete bill entries


module.exports = router;