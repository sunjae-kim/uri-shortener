const express = require('express');
const route = express.Router();
const shortener = require('./shortener');

route.get('/validate-uri', shortener.validateUri);
route.get('/:keyword', shortener.redirect);

module.exports = route;
