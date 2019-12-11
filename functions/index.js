const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const path = require('path');
const route = require('./src/routes');
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use('/', route);

exports.shortener = functions.https.onRequest(app);
