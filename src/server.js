// src/server.js

const express = require('express');
const config = require('./config');

const app = express();

// stand up the server
app.use(function(req, res, next) {
    res.end("The server is standing!");
});

// listen for the server
app.listen(config.port, function() {
    console.log(`${config.appName} is listening on port ${config.port}`);
});
