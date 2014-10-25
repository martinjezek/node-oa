'use strict';

var express         = require('express'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy;

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
            if (email === 'asd' && password === '123') {
                return done(null, { id: 1, name: 'Martin' });
            } else {
                return done(null, false, { message: 'Incorrect credentials' });
            }
            // User.findOne({ username: username }, function(err, user) {
            //     if (err) return done(err);
            //         if (!user) return done(null, false, { message: 'Incorrect username.' });
            //         if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password.' });
            //         return done(null, user);
            //     });
        }
    ));

};
