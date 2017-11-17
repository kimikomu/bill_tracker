// src/server.js

'use strict'

const path = require('path');
const express = require('express');
const config = require('./config');
const router = require('./routes');
const mongoose = require('mongoose');
const parser = require('body-parser');
const app = express();
const publicPath = path.resolve(__dirname, '../public');

// access to models
require('./models/bill.model.js');      

// serve static files
app.use(express.static(publicPath));

// parse incoming requests
app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));

// use router
app.use('/', router);

// listen for the server
app.listen(config.port, function() {
    console.log(`${config.appName} is listening on port ${config.port}`);
});

// connect to the database
const db = `mongodb://${config.db.host}/${config.db.dbName}`;

// notify the user
mongoose.connection.openUri(db, function(err) {
    if(err) {
        console.log('Failed to connect to database');
    } else {
        console.log(`Database connected: ${db}`);
    }
});




