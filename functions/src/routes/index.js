const express = require('express');
const route = express.Router();
const shortener = require('./shortener');
const { checkToken } = require('../middleware');

route.get('/', shortener.getList);
route.get('/:path', shortener.toShort);
route.post('/shorten', checkToken, shortener.shorten);
route.delete('/:path', checkToken, shortener.deleteShort);

module.exports = route;
