const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const { shortsRef, getPath } = require('./database');
const { validateUrl } = require('./service');
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
  return shortsRef.once('value', snapshot => {
    return res.status(200).send(snapshot.val());
  }, error => {
    console.error(error);
    return res.status(500).send('Oh no! Error: ' + error);
  });
});

app.get('/:path', (req, res) => {
  return getPath(req.params.path, data => {
    if (data) return res.redirect(data.originalUrl);
    return res.status(404).send({ message: `page not exists : ${req.params.path}` })
  })
});

app.post('/shorten', (req, res) => {
  try {
    const { short } = req.body;
    return getPath(short, async data => {
      if (data) return res.status(409).send({ message: `page already exists : ${short}` });

      const { value, error } = validateUrl(req.body);
      if (error) return res.status(400).send({ message: error.details[0].message, value: error.details });

      await shortsRef.child(short).set(value);
      return res.status(200).send({ message: `sunjae.kim/${short}`, value });
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send('Oh no! Error: ' + error);
  }
});

exports.shortener = functions.https.onRequest(app);
