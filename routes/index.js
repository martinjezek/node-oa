'use strict';

var express = require('express');

module.exports = express.Router()
    .get('/', ensureAuthenticated, function(req, res) {
        res.render('index', { user: req.user });
    });

function ensureAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}
