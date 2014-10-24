'use strict';

var express = require('express'),
    config  = require('config');

module.exports = function(app) {

    // Port & Config Name
    app.set('port', config.get('http.port'));
    app.set('config', config.get('name'));

    // Template Engine
    app.set('views', './views');
    app.set('view engine', 'jade');

};
