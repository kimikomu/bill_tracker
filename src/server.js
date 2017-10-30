// src/server.js

'use strict'

const path = require('path');           // Node.js path module
const express = require('express');     // Express Framework
const config = require('./config');
const router = require('./routes');
const mongoose = require('mongoose');
const app = express();
const publicPath = path.resolve(__dirname, '../public');
require('./models/bill.model.js');      // access to model

// handle static files
app.use(express.static(publicPath));

// use router
app.use('/routes', router);

// listen for the server
app.listen(config.port, function() {
    console.log(`${config.appName} is listening on port ${config.port}`);
});

// connect to the database
const db = `mongodb://${config.db.host}/${config.db.dbName}`;

mongoose.connection.openUri(db, function(err) {
    if(err) {
        console.log('Failed to connect to database');
    } else {
        console.log(`Database connected: ${db}`);
    }
});




