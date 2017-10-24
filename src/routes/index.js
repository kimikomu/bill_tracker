// src/routes/index.js

const express = require('express');
const router = express.Router();

// index route
router.get('/', function (req, res) {
    res.render('index')
  }); 

module.exports = router;