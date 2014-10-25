'use strict';

var express         = require('express'),
    config          = require('config'),
    bodyParser      = require('body-parser'),
    session         = require('express-session');

module.exports = function(app) {

    // Port & Config Name
    app.set('port', config.get('http.port'));
    app.set('config', config.get('name'));

    // Body Parser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Session
    app.use(session({ secret: 'captain america', saveUninitialized: true, resave: true }));

    // Template Engine
    app.set('views', './views');
    app.set('view engine', 'jade');

};
