const functions = require('firebase-functions');
const express = require('express');
const route = require('./src/routes');
const app = express();

app.use('/', route);

exports.shortenerAsia = functions.region('asia-northeast1').https.onRequest(app);
