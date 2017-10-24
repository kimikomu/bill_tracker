// src/server.js

'use strict'

const path = require('path');           // Node.js path module
const express = require('express');     // Express Framework
const config = require('./config');

const app = express();

app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render('index')
  });   

// listen for the server
app.listen(config.port, function() {
    console.log(`${config.appName} is listening on port ${config.port}`);
});



