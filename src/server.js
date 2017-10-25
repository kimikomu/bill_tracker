// src/server.js

'use strict'

const path = require('path');           // Node.js path module
const express = require('express');     // Express Framework
const config = require('./config');

const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

// use main routes
const mainRoutes = require('./routes');
app.use(mainRoutes);

// listen for the server
app.listen(config.port, function() {
    console.log(`${config.appName} is listening on port ${config.port}`);
});



