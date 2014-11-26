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
            // find credentials
            var searchBy = {
                service : 'email',
                token   : email,
                secret  : password
            };
            credentials.find(searchBy, function(err, credentialsRecord) {
                if (err) return done(err);
                if (!credentialsRecord) return done(null, false, { message: 'Incorrect credentials' });
                return done(null, credentialsRecord.userId);
            });
        }
    ));

    // Twitter OAuth
    passport.use(new TwitterStrategy({
            consumerKey: config.get('oauth.twitter.consumerKey'),
            consumerSecret: config.get('oauth.twitter.consumerSecret'),
            callbackURL: '/auth/twitter/callback'
        },
        function(token, secret, profile, done) {
            // find credentials
            var searchBy = {
                service     : 'twitter',
                serviceId   : profile.id
            };
            credentials.find(searchBy, function(err, record) {
                if (err) return done(err);
                if (!record) {
                    // create user
                    var split = profile.displayName.split(' '),
                        userData = {};
                        userData.firstname = split[0] ? split[0] : '';
                        userData.lastname  = split[1] ? split[1] : '';
                    user.create(userData, function(err, userRecord) {
                        if (err) return done(err);
                        // create credentials
                        var credentialsData = {
                            userId      : userRecord._id,
                            service     : 'twitter',
                            serviceId   : profile.id,
                            username    : profile.username,
                            token       : token,
                            secret      : secret,
                            raw         : profile._raw
                        };
                        credentials.create(credentialsData, function(err, credentialsRecord) {
                            if (err) return done(err);
                            return done(null, credentialsRecord.userId);
                        });
                    });
                } else {
                    // update credentials
                    var credentialsData = {
                        username    : profile.username,
                        token       : token,
                        secret      : secret,
                        raw         : profile._raw
                    };
                    credentials.update(record._id, credentialsData, function(err, credentialsRecord) {
                        if (err) return done(err);
                        return done(null, credentialsRecord.userId);
                    });
                }
            });
        }
    ));

};
