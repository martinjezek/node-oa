'use strict';

var express = require('express');

module.exports = express.Router()
    .get('/', function(req, res) {
        res.send('Hello world!');
    });
