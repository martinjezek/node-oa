'use strict';

var mongoose = require('mongoose'),
    user     = require('./user');

var credentialsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    service: {
        type: String,
        enum: ['email', 'twitter', 'facebook']
    },
    serviceId: {
        type: String
    },
    username: {
        type: String
    },
    token: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    raw: {
        type: String
    }
});

var Credentials = mongoose.model('Credentials', credentialsSchema);

module.exports = {

    model: Credentials,

    signup: function(req, res, options) {
        var self = this;
        if (!req.body) {
            if (options.failureFlash) {
                req.flash('error', 'Bad Request');
            }
            return res.redirect(options.failureRedirect);
        }
        var userData = {
            firstname : req.body.firstname,
            lastname  : req.body.lastname
        };
        // create user
        user.create(userData, function(err, userRecord) {
            if (err) return res.status(500).send(err);
            var credentialsData = {
                userId      : userRecord._id,
                service     : 'email',
                token       : req.body.email,
                secret      : req.body.password
            };
            // create credentials
            self.create(credentialsData, function(err, credentialsRecord) {
                if (err) return res.status(500).send(err);
                if (err) {
                    if (options.failureFlash) {
                        req.flash('error', JSON.stringify(err));
                    }
                    return res.redirect(options.failureRedirect);
                }
                req.flash('success', 'User has been created');
                res.redirect(options.successRedirect);
            });
        });
    },

    create: function(credentials, done) {
        new Credentials({
            userId      : credentials.userId,
            service     : credentials.service,
            serviceId   : credentials.serviceId,
            username    : credentials.username,
            token       : credentials.token,
            secret      : credentials.secret,
            raw         : credentials.raw
        }).save(function (err, record) {
            done(err, record);
        });
    },

    find: function(searchBy, done) {
        Credentials.findOne(searchBy).exec(function (err, record) {
            done(err, record);
        });
    },

    update: function(id, credentials, done) {
        Credentials.findByIdAndUpdate(id, { $set: {
            username    : credentials.username,
            token       : credentials.token,
            secret      : credentials.secret,
            raw         : credentials.raw
        }}, function (err, record) {
            done(err, record);
        });
    }

};
