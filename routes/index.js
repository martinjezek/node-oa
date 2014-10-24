'use strict';

var express = require('express');

module.exports = express.Router()
    .get('/', function(req, res) {
        res.render('login');
    })

    .get('/index', function(req, res) {
        res.render('index', { user: { name: 'Martin' }});
    });
