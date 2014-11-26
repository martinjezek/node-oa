'use strict';

var express     = require('express'),
    passport    = require('passport'),
    credentials = require('../lib/model/credentials');

module.exports = express.Router()

    .get('/signup', function(req, res) {
        res.render('signup');
    })

    .get('/login', function(req, res) {
        res.render('login');
    })

    .get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/');
        });
    })

    // email

    .post('/signup', function(req, res) {
        credentials.signup(req, res, {
            successRedirect: '/login',
            failureRedirect: '/signup',
            failureFlash: true
        });
    })

    .post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }))

    // twitter

    .get('/auth/twitter', passport.authenticate('twitter'))

    .get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
