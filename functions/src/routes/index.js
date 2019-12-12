const express = require('express');
const route = express.Router();
const shortener = require('./shortener');

route.get('/validate-short', shortener.validateShort);
route.get('/:keyword', shortener.redirect);

module.exports = route;
