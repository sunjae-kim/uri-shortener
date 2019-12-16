const express = require('express');
const route = express.Router();
const shortener = require('./shortener');

route.post('/validate-short', shortener.validateShort);
route.get('/:keyword', shortener.redirect);

module.exports = route;
