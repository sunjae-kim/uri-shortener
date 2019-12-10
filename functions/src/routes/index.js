const express = require('express');
const route = express.Router();
const shortener = require('./shortener');

route.get('/validate-url', shortener.validateUri);
route.get('/:path', shortener.redirect);

module.exports = route;
