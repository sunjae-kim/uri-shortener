const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')
const route = require('./src/routes');
const app = express();

app.use(cors())
app.use('/', route);

exports.shortener = functions.https.onRequest(app);
