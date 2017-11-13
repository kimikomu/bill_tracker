// src/server.js

'use strict'

const path = require('path');           // Node.js path module
const express = require('express');     // Express Framework
const config = require('./config');
const router = require('./routes');
const mongoose = require('mongoose');
const parser = require('body-parser');
const session = require('express-session');
const app = express();
const publicPath = path.resolve(__dirname, '../public');

// use sessions for tracking logins
app.use(session({
    secret: 'i heart sound design',
    resave: true,
    saveUninitialized: false
}));

app.use(function (req, res, next) {
    res.locals.currentUser = req.session.userId;
    next();
});

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

mongoose.connection.openUri(db, function(err) {
    if(err) {
        console.log('Failed to connect to database');
    } else {
        console.log(`Database connected: ${db}`);
    }
});




