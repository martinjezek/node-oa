'use strict';

var express         = require('express'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    User            = require('../lib/model/user').model;

module.exports = function(app) {

    // Passport Authorization
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    // Local Strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, function(email, password, done) {
            User
                .findOne({ email: email })
                .exec(function(err, user) {
                    if (err) return done(err);
                    if (!user) return done(null, false, { message: 'Incorrect email' });
                    if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password' });
                    return done(null, user);
                });
        }
    ));

};
