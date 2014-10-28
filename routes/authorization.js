'use strict';

var express     = require('express'),
    passport    = require('passport'),
    user        = require('../lib/model/user');

module.exports = express.Router()

    .get('/signup', function(req, res) {
        res.render('signup');
    })

    .post('/signup', function(req, res) {
        user.create(req, res, {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash: true
        });
    })

    .get('/login', function(req, res) {
        res.render('login');
    })

    .post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
