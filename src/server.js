// src/server.js

'use strict'

const path = require('path');           // Node.js path module
const express = require('express');     // Express Framework
const config = require('./config');
const router = require('./routes');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// use router
app.use('/routes', router);

// listen for the server
app.listen(config.port, function() {
    console.log(`${config.appName} is listening on port ${config.port}`);
});



