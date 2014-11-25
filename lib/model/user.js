'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
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

    create: function(user, done) {
        new User({
            firstname: user.firstname,
            lastname: user.lastname
        }).save(function (err, record) {
            done(err, record);
        });
    },

    deserialize: function(id, done) {
        User.findById(id, function (err, record) {
            done(err, record);
        });
    }

};
