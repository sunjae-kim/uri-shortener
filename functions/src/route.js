const express = require('express');
const { shortsRef, getPath } = require('./database');
const { validateUrl } = require('./service');
const route = express.Router();

route.get('/', (req, res) => {
  return shortsRef.once('value', snapshot => {
    return res.status(200).send(snapshot.val());
  }, error => {
    return res.status(500).send({ message: error });
  });
});

route.get('/:path', (req, res) => {
  return getPath(req.params.path, data => {
    if (data) return res.redirect(data.originalUrl);
    return res.status(404).send({ message: `page not exists : ${req.params.path}` })
  })
});

route.post('/shorten', (req, res) => {
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
    return res.status(500).send({ message: error });
  }
});

module.exports = route;
