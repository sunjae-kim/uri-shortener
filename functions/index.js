const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const route = require('./src/routes');
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.use('/', route);

exports.shortener = functions.https.onRequest(app);
