'use strict';

var express     = require('express'),
    passport    = require('passport');

module.exports = express.Router()
    .get('/', function(req, res) {
        res.render('login');
    })

    .post('/', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
