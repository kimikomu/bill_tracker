// src/routes/index.js

const express = require('express');
const router = express.Router();

// index route
router.get('/', function (req, res) {
    res.render('index')
  }); 


// TODO: Add a POST route to create new bill entries

// TODO: Add a PUT route to update existing bill entries 

// TODO: Add a DELETE route to delete bill entries


module.exports = router;