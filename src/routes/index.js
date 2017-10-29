// src/routes/index.js

'use strict';

const express = require('express');
const bills = require('../../public/data/bills.json');

const router = express.Router();

// index route
router.get('/bills', function (req, res) {
    res.json({bills: bills});
  }); 


// TODO: Add a POST route to create new bill entries

// TODO: Add a PUT route to update existing bill entries 

// TODO: Add a DELETE route to delete bill entries


module.exports = router;