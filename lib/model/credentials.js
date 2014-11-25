'use strict';

var mongoose = require('mongoose');

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

    find: function(service, serviceId, done) {
        Credentials.findOne({
            service     : service,
            serviceId   : serviceId
        }).exec(function (err, record) {
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
