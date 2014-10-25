'use strict';

var express = require('express'),
    app     = express();

// Configuration
require('./config')(app);

// Flash messages
require('./flash')(app);

// Authorization
require('./authorization.js')(app);

// Router
require('./router')(app);

module.exports = app;
