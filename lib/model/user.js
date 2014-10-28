'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    }
});

var User = mongoose.model('User', userSchema);

module.exports = {

    model: User,

    create: function(req, res, options) {
        if (!req.body) {
            if (options.failureFlash) {
                req.flash('error', 'Bad Request');
            }
            return res.redirect(options.failureRedirect);
        }
        new User({
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }).save(function (err, record) {
            if (err) {
                if (options.failureFlash) {
                    req.flash('error', JSON.stringify(err));
                }
                return res.redirect(options.failureRedirect);
            }
            req.flash('success', 'User has been created');
            res.redirect('/');
        });
    }

};
