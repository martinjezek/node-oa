'use strict';

var express         = require('express'),
    config          = require('config'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    user            = require('../lib/model/user'),
    credentials     = require('../lib/model/credentials');

module.exports = function(app) {

    // Passport Authorization
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(id, done) {
        done(null, id);
    });

    passport.deserializeUser(function(id, done) {
        user.deserialize(id, function(err, record) {
            if (err) return done(err);
            done(null, record);
        });
    });

    // Local Strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, function(email, password, done) {
            // User
            //     .findOne({ email: email })
            //     .exec(function(err, user) {
            //         if (err) return done(err);
            //         if (!user) return done(null, false, { message: 'Incorrect email' });
            //         if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password' });
            //         return done(null, user);
            //     });
        }
    ));

    // Twitter OAuth
    passport.use(new TwitterStrategy({
            consumerKey: config.get('oauth.twitter.consumerKey'),
            consumerSecret: config.get('oauth.twitter.consumerSecret'),
            callbackURL: '/auth/twitter/callback'
        },
        function(token, secret, profile, done) {
            // find user
            credentials.find('twitter', profile.id, function(err, record) {
                if (err) return done(err);
                if (!record) {
                    var split = profile.displayName.split(' '),
                        userData = {};
                        userData.firstname = split[0] ? split[0] : '';
                        userData.lastname  = split[1] ? split[1] : '';
                    // create user
                    user.create(userData, function(err, userRecord) {
                        if (err) return done(err);
                        var credentialsData = {
                            userId      : userRecord._id,
                            service     : 'twitter',
                            serviceId   : profile.id,
                            username    : profile.username,
                            token       : token,
                            secret      : secret,
                            raw         : profile._raw
                        };
                        // create credentials
                        credentials.create(credentialsData, function(err, credentialsRecord) {
                            if (err) return done(err);
                            return done(null, credentialsRecord.userId);
                        });
                    });
                } else {
                    var credentialsData = {
                        username    : profile.username,
                        token       : token,
                        secret      : secret,
                        raw         : profile._raw
                    };
                    // update credentials
                    credentials.update(record._id, credentialsData, function(err, credentialsRecord) {
                        if (err) return done(err);
                        return done(null, credentialsRecord.userId);
                    });
                }
            });
        }
    ));

};
