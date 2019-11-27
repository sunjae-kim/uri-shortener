const functions = require('firebase-functions');
const express = require('express');
const route = require('./src/routes');
const app = express();

app.use('/', route);

exports.shortener = functions.https.onRequest(app);
