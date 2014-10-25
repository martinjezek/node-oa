'use strict';

var app         = require('../app'),
    request     = require('supertest'),
    should      = require('should');

describe('index', function() {

    it('should get an APP ready message', function(done) {
        request(app).get('/')
            .end(function(err, res) {
                res.status.should.equal(200);
                done();
            });
    });

});
