const express = require('express');
const route = express.Router();
const shortener = require('./shortener');

route.get('/:path', shortener.toShort);

module.exports = route;
