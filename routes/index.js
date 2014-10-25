'use strict';

var express = require('express');

module.exports = express.Router()
    .get('/', function(req, res) {
        if (req.user) {
            res.render('index', { user: req.user });
        } else {
            res.render('login');
        }
    })

    .get('/index', function(req, res) {
        res.render('index', { user: { name: 'Martin' }});
    });
