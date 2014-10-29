'use strict';

var express = require('express'),
    flash   = require('connect-flash');

module.exports = function(app) {

    // Flash messages
    app.use(flash());
    app.use(function(req, res, next){
        res.locals.error    = req.flash('error');
        res.locals.success  = req.flash('success');
        res.locals.warning  = req.flash('warning');
        res.locals.info     = req.flash('info');
        next();
    });

};
