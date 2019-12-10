const { http, https } = require('follow-redirects');
const { getShort } = require('../database');
const { validateData } = require('../service');
const wrapper = require('../common/wrapper');

const redirect = (req, res) => {
  const { path } = req.params;
  return getShort(res, path, data => {
    if (data) return res.redirect(301, data.originalUrl);
    return res.status(404).send({ message: `page not exists : ${path}` });
  });
};

const validateUri = wrapper(async (req, res) => {
  const { value, error } = validateData(req.query);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { short, originalUrl } = value;
  const httpsRegex = /^https:\/\//;
  const isHttps = httpsRegex.test(originalUrl);
  const get = isHttps ? https.get : http.get;
  return get(originalUrl, response => {
    res.status(200).send({
      originalUrl: response.responseUrl,
      short,
    });
  });
});

module.exports = {
  redirect,
  validateUri,
};
